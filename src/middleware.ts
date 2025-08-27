import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(req: NextRequest){
  const url = new URL(req.url);
  const isAdmin = url.pathname.startsWith("/admin");
  const isLogin = url.pathname.startsWith("/admin/login");
  const isApiLogin = url.pathname.startsWith("/api/admin/login");
  if (isAdmin && !isLogin){
    const ok = req.cookies.get("bt_admin")?.value === "ok";
    if (!ok) return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  if (url.pathname.startsWith("/api") && !isApiLogin && !url.pathname.startsWith("/api/news") && !url.pathname.startsWith("/api/og")){
    const ok = req.cookies.get("bt_admin")?.value === "ok";
    if (!ok) return NextResponse.json({error:"Unauthorized"}, {status:401});
  }
  return NextResponse.next();
}
export const config = { matcher: ["/admin/:path*", "/api/:path*"] };
