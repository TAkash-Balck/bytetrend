import { cookies } from "next/headers";
const COOKIE = "bt_admin";
export function setAdminSession(){ cookies().set({name:COOKIE, value:"ok", httpOnly:true, sameSite:"lax", path:"/", secure:true, maxAge:60*60*8}); }
export function clearAdminSession(){ cookies().set({name:COOKIE, value:"", httpOnly:true, sameSite:"lax", path:"/", secure:true, maxAge:0}); }
export function isAuthed(){ return cookies().get(COOKIE)?.value === "ok"; }
export function checkCredentials(u:string,p:string){ return u===process.env.ADMIN_USERNAME && p===process.env.ADMIN_PASSWORD; }
