import { EmptyActionResult } from "@/types/action-result";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis, s } from "@upstash/redis";
import { headers } from "next/headers";

const redis = Redis.fromEnv();

export const limiters = {
  public: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "60 s"),
    prefix: "ratelimit:public",
  }),
  admin: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, "60 s"),
    prefix: "ratelimit:admin",
  }),
  upload: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "60 s"),
    prefix: "ratelimit:upload",
  }),
};

async function getClientIp() {
  const headersList = await headers();
  return (
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown"
  );
}

export async function checkRateLimit(
  kind: keyof typeof limiters,
  identifier?: string,
): Promise<EmptyActionResult> {
  const ip = await getClientIp();
  const key = identifier ? `${ip}:${identifier}` : ip;

  const { success, reset } = await limiters[kind].limit(key);

  if (!success) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((reset - Date.now()) / 1000),
    );
    return {
      success: false,
      error: `Quá nhiều yêu cầu. Vui lòng thử lại sau ${retryAfterSeconds} giây.`,
      data: null,
    };
  }

  return { success: true, error: null, data: null };
}
