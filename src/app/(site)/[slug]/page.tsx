import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { postMeta } from "@/lib/seo";

export async function generateMetadata({ params }:{ params:{ slug:string }}){
  const post = await prisma.post.findUnique({ where: { slug: params.slug } });
  if (!post || post.status !== "PUBLISHED") return {};
  return postMeta({ title: post.title, description: post.metaDesc || post.excerpt || undefined, slug: post.slug, ogImage: post.ogImage || post.coverImage || undefined });
}

export default async function PostPage({ params }:{ params:{ slug:string }}){
  const post = await prisma.post.findUnique({ where: { slug: params.slug } });
  if (!post || post.status !== "PUBLISHED") return notFound();
  return (
    <article className="prose max-w-none">
      <header className="mb-6">
        <h1>{post.title}</h1>
        {post.coverImage && <img src={post.coverImage} alt={post.title} className="w-full rounded-xl" />}
        {post.excerpt && <p className="text-gray-600">{post.excerpt}</p>}
      </header>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
