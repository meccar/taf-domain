import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const { supabase, response } = createServerClientForMiddleware(request);

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
  }

  return response;
}
function createServerClientForMiddleware(request: NextRequest): {
  supabase: any;
  response: any;
} {
  const response = NextResponse.next();

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
