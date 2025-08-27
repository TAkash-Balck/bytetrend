export const revalidate = 3600;
export default async function Page(){
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/news`, { next: { revalidate: 3600 } });
  const data = await res.json().catch(()=>({items:[]}));
  return <main>
    <h1 className="mb-4 text-3xl font-bold">Tech News</h1>
    <ul className="space-y-2">
      {data.items?.map((n:any, i:number)=>(
        <li key={i} className="card">
          <a href={n.link} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:underline">{n.title}</a>
          <div className="text-sm text-gray-600">{n.source} — {n.publishedAt}</div>
        </li>
      ))}
    </ul>
  </main>
}
