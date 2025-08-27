import Link from "next/link";
import type { Post } from "@prisma/client";
export default function PostCard({ post }: { post: Post }){
  return (
    <article className="card">
      {post.coverImage && <img src={post.coverImage} alt={post.title} className="mb-3 h-40 w-full rounded-xl object-cover" />}
      <h2 className="text-xl font-semibold"><Link href={`/${post.slug}`}>{post.title}</Link></h2>
      {post.excerpt && <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>}
    </article>
  );
}
