import "@/styles/globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { defaultSEO } from "@/lib/seo";

export const metadata = {
  title: defaultSEO.title,
  description: defaultSEO.description,
  metadataBase: new URL(defaultSEO.url),
};

export default function RootLayout({ children }: { children: React.ReactNode }){
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const gsc = process.env.NEXT_PUBLIC_GSC_VERIFICATION;
  return (
    <html lang="en">
      <head>
        {ga && (<>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} />
          <script dangerouslySetInnerHTML={{__html:`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`}}/>
        </>)}
        {gsc && <meta name="google-site-verification" content={gsc} />}
      </head>
      <body className="min-h-screen bg-white text-gray-900">
        <SiteHeader />
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
