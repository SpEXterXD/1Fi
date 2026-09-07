import { NextRequest, NextResponse } from "next/server";

// Shop sections moved from query params (?tab=…) to real routes.
// Redirect legacy links and drop the query string entirely.
export function middleware(request: NextRequest) {
  const tab = request.nextUrl.searchParams.get("tab");
  if (!tab) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.search = "";

  if (tab === "marketplace") {
    url.pathname = "/";
  } else if (tab === "top-brands" || tab === "nearby-stores") {
    url.pathname = `/${tab}`;
  } else {
    return NextResponse.next();
  }

  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/",
};
