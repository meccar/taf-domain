// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { defaultLocale, isValidLocale } from "@/i18n/config";

export async function middleware(request: NextRequest) {
  const { supabase, response } = createServerClientForMiddleware(request);

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

  if (request.nextUrl.pathname.startsWith("/admin")) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user)
      return NextResponse.redirect(new URL("/auth/login", request.url));

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "root_admin") {
      return NextResponse.redirect(new URL("/protected", request.url));
    }

    response.headers.set("x-user-id", user.id);
    response.headers.set("x-user-email", user.email ?? "");
  }

  return response;
}

function createServerClientForMiddleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

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
