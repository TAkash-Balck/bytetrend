import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
export async function POST(req: NextRequest, { params }:{ params:{ id:string }}){
  const { searchParams } = new URL(req.url);
  const publish = searchParams.get("publish");
  const form = await req.formData();
  const method = String(form.get("_method") || "PATCH").toUpperCase();
  if (publish){
    await prisma.post.update({ where:{ id: params.id }, data:{ status:"PUBLISHED", publishedAt: new Date() } });
    return NextResponse.redirect(new URL(`/admin/posts/${params.id}`, req.url));
  }
  if (method !== "PATCH") return NextResponse.json({ error:"Unsupported" }, { status:400 });
  const data:any = {
    title: form.get("title") as string,
    slug: form.get("slug") as string,
    excerpt: (form.get("excerpt") as string) || null,
    coverImage: (form.get("coverImage") as string) || null,
    metaTitle: (form.get("metaTitle") as string) || null,
    metaDesc: (form.get("metaDesc") as string) || null,
    content: form.get("content") as string,
  };
  await prisma.post.update({ where:{ id: params.id }, data });
  return NextResponse.redirect(new URL(`/admin/posts/${params.id}`, req.url));
}
