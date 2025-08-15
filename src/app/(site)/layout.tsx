import "@/styles/globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
export default function RootLayout({ children }: { children: React.ReactNode }){
  return (<html lang="en"><body><SiteHeader />{children}<SiteFooter /></body></html>);
}
