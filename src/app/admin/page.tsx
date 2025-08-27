import Link from "next/link";
import { prisma } from "@/lib/db";
export default async function AdminHome(){
  const posts = await prisma.post.findMany({ orderBy:{ updatedAt:"desc" }, take:50 });
  return (<div className="space-y-6">
    <h1 className="text-2xl font-bold">Admin</h1>
    <div className="flex gap-3">
      <Link className="btn" href="/admin/posts/new">+ New Post</Link>
      <Link className="btn-secondary px-4 py-2 rounded-2xl" href="/api/seed">Seed 10 Dummy Posts</Link>
    </div>
    <ul className="divide-y">
      {posts.map(p=>(<li key={p.id} className="py-3 flex items-center justify-between"><div><div className="font-medium">{p.title}</div><div className="text-sm text-gray-500">{p.status} · {p.slug}</div></div><Link className="text-blue-600" href={`/admin/posts/${p.id}`}>Edit</Link></li>))}
    </ul>
  </div>);
}
