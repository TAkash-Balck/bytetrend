"use client";
import { useState } from "react";
export default function LoginPage(){
  const [u,setU]=useState(""); const [p,setP]=useState(""); const [err,setErr]=useState("");
  async function onSubmit(e:any){ e.preventDefault(); setErr(""); const res=await fetch("/api/admin/login",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({u,p})}); if(res.ok) window.location.href="/admin"; else setErr("Invalid credentials"); }
  return (<main className="max-w-sm mx-auto"><h1 className="mb-4 text-2xl font-bold">Admin Login</h1><form onSubmit={onSubmit} className="space-y-3"><input className="w-full rounded border p-2" placeholder="Username" value={u} onChange={e=>setU(e.target.value)} /><input className="w-full rounded border p-2" placeholder="Password" type="password" value={p} onChange={e=>setP(e.target.value)} />{err&&<div className="text-red-600 text-sm">{err}</div>}<button className="btn w-full">Login</button></form></main>);}
