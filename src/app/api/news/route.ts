import { NextResponse } from "next/server";
const feeds = [
  "https://www.theverge.com/rss/index.xml",
  "https://www.techradar.com/rss",
  "https://feeds.arstechnica.com/arstechnica/index/",
  "https://www.engadget.com/rss.xml"
];
export async function GET(){
  const items:any[] = [];
  try{
    const results = await Promise.allSettled(feeds.map(u=>fetch(u).then(r=>r.text())));
    for (const r of results){
      if (r.status !== "fulfilled") continue;
      const xml = r.value;
      const matches = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/g));
      for (const m of matches.slice(0,10)){
        const block = m[1];
        const title = (block.match(/<title>([\s\S]*?)<\/title>/)?.[1]||"").replace(/<!\[CDATA\[|\]\]>/g,"").trim();
        const link = (block.match(/<link>([\s\S]*?)<\/link>/)?.[1]||"").trim();
        const pub = (block.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]||"").trim();
        if (!title || !link) continue;
        const source = (new URL(link).hostname.replace("www.",""));
        items.push({ title, link, publishedAt: pub, source });
      }
    }
  }catch{}
  const seen = new Set(); const dedup = items.filter(i=>{ if(seen.has(i.link)) return false; seen.add(i.link); return true; });
  return NextResponse.json({ items: dedup.slice(0,40) });
}
