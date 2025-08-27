import { prisma } from "@/lib/db";
import PostCard from "@/components/post-card";
import Link from "next/link";
import { Ad } from "@/components/ads";

export default async function HomePage(){
  const posts = await prisma.post.findMany({ where: { status:"PUBLISHED" }, orderBy:{ publishedAt:"desc" }, take:12 });
  return (
    <div className="space-y-8">
      <Ad slot="header" />
      <section className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Latest Articles</h1>
        <Link href="/news" className="text-sm">Tech News →</Link>
      </section>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {posts.map((p)=>(<PostCard key={p.id} post={p} />))}
      </div>
      <section className="mt-8 rounded-2xl border p-4">
        <h2 className="mb-3 text-xl font-semibold">What’s New in Tech</h2>
        <p className="text-sm text-gray-600">Fresh headlines update daily. We only show title & source, linking to originals.</p>
        <NewsList />
      </section>
    </div>
  );
}

async function NewsList(){
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/news`, { next: { revalidate: 3600 } });
  const data = await res.json().catch(()=>({items:[]}));
  return (
    <ul className="mt-4 space-y-2">
      {data.items?.slice(0,8).map((n:any, idx:number)=>(
        <li key={idx} className="text-sm">
          <a href={n.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{n.title}</a>
          <span className="text-gray-500"> — {n.source}</span>
        </li>
      ))}
    </ul>
  );
}
