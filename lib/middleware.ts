import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { defaultLocale, isValidLocale } from "@/i18n/config";
import { buildCsp } from "@/lib/security/csp";
import {
  pickEdgePolicy,
  checkEdgeRateLimit,
  getEdgeClientIp,
  EdgeLimitResult,
} from "./security/rate-limit";

const isProd = process.env.NODE_ENV === "production";
// Set CSP_REPORT_ONLY=true to log violations without blocking anything.
const CSP_HEADER =
  process.env.CSP_REPORT_ONLY === "true"
    ? "content-security-policy-report-only"
    : "content-security-policy";

export async function middleware(request: NextRequest) {
  // 1. Reject malformed URLs early (null bytes, absurd length).
  if (
    /%00|\0/.test(request.nextUrl.pathname + request.nextUrl.search) ||
    request.url.length > 4096
  ) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  // 2. Rate limit per IP.
  const policy = pickEdgePolicy(request.method, request.nextUrl.pathname);
  const limit = await checkEdgeRateLimit(getEdgeClientIp(request), policy);
  if (!limit.success) {
    const retryAfter = Math.max(
      1,
      Math.ceil((limit.reset - Date.now()) / 1000),
    );
    const tooMany = new NextResponse("Too Many Requests", {
      status: 429,
      headers: { "Retry-After": String(retryAfter) },
    });
    return applySecurityHeaders(tooMany, null, limit);
  }

  // 3. CSP nonce: Next.js reads it from the request header and applies it
  //    to its own scripts automatically.
  const nonce = btoa(crypto.randomUUID());
  const csp = buildCsp(nonce, !isProd);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set(CSP_HEADER, csp);

  const { supabase, response } = createServerClientForMiddleware(
    request,
    requestHeaders,
  );

  // 4. Locale cookie (unchanged).
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (!cookieLocale || !isValidLocale(cookieLocale)) {
    const preferred = request.headers
      .get("accept-language")
      ?.split(",")[0]
      ?.split("-")[0];
    const locale = isValidLocale(preferred) ? preferred : defaultLocale;
    response.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  // 5. Admin gate (unchanged logic).
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return applySecurityHeaders(
        NextResponse.redirect(new URL("/auth/login", request.url)),
        csp,
        limit,
      );
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "root_admin") {
      return applySecurityHeaders(
        NextResponse.redirect(new URL("/protected", request.url)),
        csp,
        limit,
      );
    }

    response.headers.set("x-user-id", user.id);
    response.headers.set("x-user-email", user.email ?? "");
    response.headers.set("Cache-Control", "no-store");
  }

  return applySecurityHeaders(response, csp, limit);
}

function applySecurityHeaders(
  response: NextResponse,
  csp: string | null,
  limit: EdgeLimitResult,
): NextResponse {
  if (csp) response.headers.set(CSP_HEADER, csp);
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()",
  );
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  if (isProd) {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains",
    );
  }
  response.headers.set("X-RateLimit-Limit", String(limit.limit));
  response.headers.set("X-RateLimit-Remaining", String(limit.remaining));
  return response;
}

function createServerClientForMiddleware(
  request: NextRequest,
  requestHeaders: Headers,
) {
  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set({ name, value, ...options });
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  return { supabase, response };
}

// Skip static assets: no need to rate limit or add a CSP to images/fonts.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)",
  ],
};
