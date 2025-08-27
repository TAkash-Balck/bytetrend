import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/slug";

export async function POST(req: NextRequest){
  const { title, brief, keywords = [] } = await req.json();
  if (!title || !brief) return NextResponse.json({ error:"Missing title/brief" }, { status:400 });

  const html = await generateHTML({ title, brief, keywords });
  const textOnly = html.replace(/<[^>]+>/g, " ").replace(/\s+/g," ").trim();
  const excerpt = textOnly.slice(0,200);
  const metaDesc = textOnly.slice(0,160);
  const slug = await uniqueSlug(slugify(title));

  const created = await prisma.post.create({ data: { title, slug, excerpt, content: html, keywords, status:"DRAFT" }, select:{ id:true } });
  return NextResponse.json({ id: created.id });
}

async function uniqueSlug(base:string){
  let c = base; let i=1;
  while (await prisma.post.findUnique({ where:{ slug:c } })) c = `${base}-${i++}`;
  return c;
}

async function generateHTML({ title, brief, keywords }:{ title:string; brief:string; keywords:string[]; }){
  try {
    const { OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = `Write an original, helpful article in simple HTML. Title: ${title}. Brief: ${brief}. Keywords: ${keywords.join(", ")}. Use h2/h3, lists, steps, FAQs.`;
    const res = await openai.responses.create({ model: process.env.OPENAI_MODEL || "gpt-4o-mini", input: prompt });
    return res.output_text || "<p>(no content)</p>";
  } catch {
    return `<p>Editor note: Add content for ${title}.</p>`;
  }
}
