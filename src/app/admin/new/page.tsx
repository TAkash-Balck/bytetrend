"use client";
import { useState } from "react";
export default function NewPost(){
  const [title,setTitle]=useState(""); const [brief,setBrief]=useState(""); const [keywords,setKeywords]=useState(""); const [loading,setLoading]=useState(false);
  async function handleGenerate(){ setLoading(true); const res=await fetch("/api/generate",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({title,brief,keywords:keywords.split(',').map(s=>s.trim()).filter(Boolean)})}); const data=await res.json(); setLoading(false); if(data.id) window.location.href=`/admin/posts/${data.id}`; }
  return (<div className="space-y-4"><h1 className="text-2xl font-bold">Generate Draft</h1><input placeholder="Title" className="w-full rounded border p-2" value={title} onChange={e=>setTitle(e.target.value)} /><textarea placeholder="Brief / what to cover" className="w-full rounded border p-2" rows={6} value={brief} onChange={e=>setBrief(e.target.value)} /><input placeholder="Keywords (comma separated)" className="w-full rounded border p-2" value={keywords} onChange={e=>setKeywords(e.target.value)} /><button onClick={handleGenerate} disabled={loading||!title||!brief} className="btn disabled:opacity-50">{loading?"Generating…":"Generate Draft"}</button></div>);
}
