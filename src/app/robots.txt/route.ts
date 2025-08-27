import { NextResponse } from "next/server";
export function GET(){
  const host = process.env.SITE_URL || "http://localhost:3000";
  return new NextResponse(`User-agent: *\nAllow: /\nSitemap: ${host}/sitemap.xml`, { headers: { "content-type":"text/plain" } });
}
