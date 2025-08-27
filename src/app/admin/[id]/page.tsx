import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
export default async function EditPost({ params }:{ params:{ id:string }}){
  const post = await prisma.post.findUnique({ where: { id: params.id } });
  if (!post) return notFound();
  return (<div className="space-y-4"><h1 className="text-2xl font-bold">Edit Post</h1>
    <form action={`/api/posts/${post.id}`} method="post" className="space-y-3">
      <input name="_method" type="hidden" value="PATCH" />
      <label className="block">Title<input name="title" defaultValue={post.title} className="w-full rounded border p-2" /></label>
      <label className="block">Slug<input name="slug" defaultValue={post.slug} className="w-full rounded border p-2" /></label>
      <label className="block">Excerpt<textarea name="excerpt" defaultValue={post.excerpt ?? ""} className="w-full rounded border p-2" rows={2} /></label>
      <label className="block">Cover Image URL<input name="coverImage" defaultValue={post.coverImage ?? ""} className="w-full rounded border p-2" /></label>
      <label className="block">Meta Title<input name="metaTitle" defaultValue={post.metaTitle ?? ""} className="w-full rounded border p-2" /></label>
      <label className="block">Meta Description<textarea name="metaDesc" defaultValue={post.metaDesc ?? ""} className="w-full rounded border p-2" rows={2} /></label>
      <label className="block">Content (HTML)<textarea name="content" defaultValue={post.content} className="w-full rounded border p-2 font-mono" rows={18} /></label>
      <div className="flex gap-3"><button formaction={`/api/posts/${post.id}?publish=1`} formMethod="post" className="btn">Publish</button><button className="btn-secondary px-4 py-2 rounded-2xl">Save Draft</button></div>
    </form></div>);
}
