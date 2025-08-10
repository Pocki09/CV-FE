import { NextResponse, type NextRequest } from "next/server";
export function middleware(Request: NextRequest) {
  const token = Request.cookies.get("token")?.value;

  if (token) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/login", Request.url));
  }
}

export const config = {
  matcher: ["/user-manage/:path*", "/company-manage/:path*"],
};
