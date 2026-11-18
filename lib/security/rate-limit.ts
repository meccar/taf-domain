import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export type EdgePolicy = { name: string; limit: number; windowSec: number };

export type EdgeLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  /** Unix ms when the window resets */
  reset: number;
};

export const EDGE_POLICIES = {
  // Login, sign-up, contact form: slow down brute force and spam
  strict: { name: "strict", limit: 5, windowSec: 600 },
  // Any other state-changing request (POST/PUT/PATCH/DELETE, server actions)
  write: { name: "write", limit: 20, windowSec: 60 },
  // Page views. Generous: Next.js prefetches links, offices share one IP.
  read: { name: "read", limit: 300, windowSec: 60 },
} as const satisfies Record<string, EdgePolicy>;

// Paths where a POST is sensitive. Server actions post to the page URL,
// so the form pages themselves are listed too.
const STRICT_PATHS = [
  "/api/contact",
  "/contact",
  "/auth/login",
  "/auth/sign-up",
  "/auth/forgot-password",
];

export function pickEdgePolicy(method: string, pathname: string): EdgePolicy {
  const m = method.toUpperCase();
  if (m === "GET" || m === "HEAD" || m === "OPTIONS") return EDGE_POLICIES.read;
  return STRICT_PATHS.some((p) => pathname.startsWith(p))
    ? EDGE_POLICIES.strict
    : EDGE_POLICIES.write;
}

/**
 * Client IP. On Vercel and most proxies the first x-forwarded-for entry is
 * the real client. If you run behind a proxy you do not control, this header
 * can be spoofed; configure the proxy to overwrite it.
 */
export function getEdgeClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

// ---- Upstash (shared across all serverless instances) --------------------

const limiters = new Map<string, Ratelimit>();
let redis: Redis | null | undefined;

function getRedis(): Redis | null {
  if (redis !== undefined) return redis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  redis = url && token ? new Redis({ url, token }) : null;
  if (!redis && process.env.NODE_ENV === "production") {
    console.warn(
      "[edge-rate-limit] UPSTASH_REDIS_REST_URL/TOKEN missing: using per-instance memory, which is NOT effective on serverless.",
    );
  }
  return redis;
}

function getLimiter(policy: EdgePolicy): Ratelimit | null {
  const client = getRedis();
  if (!client) return null;
  let limiter = limiters.get(policy.name);
  if (!limiter) {
    limiter = new Ratelimit({
      redis: client,
      limiter: Ratelimit.slidingWindow(policy.limit, `${policy.windowSec} s`),
      prefix: "taf:edge-rl",
      analytics: false,
    });
    limiters.set(policy.name, limiter);
  }
  return limiter;
}

// ---- In-memory fallback (local dev only) ---------------------------------

const memory = new Map<string, { count: number; resetAt: number }>();

function memoryLimit(key: string, policy: EdgePolicy): EdgeLimitResult {
  const now = Date.now();
  const entry = memory.get(key);
  if (!entry || entry.resetAt <= now) {
    memory.set(key, { count: 1, resetAt: now + policy.windowSec * 1000 });
    if (memory.size > 10_000) {
      for (const [k, v] of memory) if (v.resetAt <= now) memory.delete(k);
    }
    return {
      success: true,
      limit: policy.limit,
      remaining: policy.limit - 1,
      reset: now + policy.windowSec * 1000,
    };
  }
  entry.count += 1;
  return {
    success: entry.count <= policy.limit,
    limit: policy.limit,
    remaining: Math.max(0, policy.limit - entry.count),
    reset: entry.resetAt,
  };
}

export async function checkEdgeRateLimit(
  ip: string,
  policy: EdgePolicy,
): Promise<EdgeLimitResult> {
  const key = `${policy.name}:${ip}`;
  const limiter = getLimiter(policy);
  if (!limiter) return memoryLimit(key, policy);

  try {
    const r = await limiter.limit(key);
    return {
      success: r.success,
      limit: r.limit,
      remaining: r.remaining,
      reset: r.reset,
    };
  } catch (error) {
    // Fail open: a Redis outage must not take the whole site down.
    console.error("[edge-rate-limit] Upstash error, allowing request", error);
    return {
      success: true,
      limit: policy.limit,
      remaining: policy.limit,
      reset: Date.now(),
    };
  }
}
