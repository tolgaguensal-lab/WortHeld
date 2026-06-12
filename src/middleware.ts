import { NextResponse } from "next/server";

export default function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/learn/:path*", "/exercise/:path*", "/review/:path*", "/profile/:path*", "/settings/:path*", "/admin/:path*"],
};
