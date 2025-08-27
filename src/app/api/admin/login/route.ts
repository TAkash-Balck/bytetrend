import { NextRequest, NextResponse } from "next/server";
import { checkCredentials, setAdminSession, clearAdminSession } from "@/lib/auth";
export async function POST(req: NextRequest){
  const { u, p } = await req.json();
  if (!checkCredentials(u, p)) return NextResponse.json({ error:"Invalid" }, { status:401 });
  setAdminSession(); return NextResponse.json({ ok:true });
}
export async function DELETE(){ clearAdminSession(); return NextResponse.json({ ok:true }); }
