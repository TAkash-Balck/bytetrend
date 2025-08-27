import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
export async function GET(){
  const host = process.env.SITE_URL || "http://localhost:3000";
  const posts = await prisma.post.findMany({ where: { status:"PUBLISHED" }, orderBy:{ updatedAt:"desc" } });
  const urls = posts.map(p=>`<url><loc>${host}/${p.slug}</loc><lastmod>${p.updatedAt.toISOString()}</lastmod></url>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new NextResponse(xml, { headers: { "content-type":"application/xml" } });
}
