import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

// this middleware refreshes the user's session and must be run
// for any Server Component route that uses `createServerComponentSupabaseClient`
export async function middleware(req: any) {
  const res: any = NextResponse.next();
  //Todo: Fix for getting pathname in the server components, need to be removed in future
  //Reference: https://github.com/vercel/next.js/issues/43704
  //Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-url", req.url);

  const supabase = createMiddlewareSupabaseClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const preloginUrls = [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/thank-you",
  ];

  if (
    !session &&
    !preloginUrls.includes(req.nextUrl.pathname) &&
    !req.nextUrl.pathname.startsWith("/f/") &&
    !req.nextUrl.pathname.startsWith("/thank-you")
  ) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_proxy/|_auth/|_root/|static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};
