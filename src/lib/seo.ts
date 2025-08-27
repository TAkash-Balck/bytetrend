export const defaultSEO = {
  title: process.env.SITE_NAME || "ByteTrend",
  description: "Fresh, helpful tech guides and curated news. Human-reviewed.",
  url: process.env.SITE_URL || "http://localhost:3000",
  twitter: process.env.SITE_TWITTER || "@bytetrend",
};
export function postMeta({ title, description, slug, ogImage }:
  { title:string; description?:string; slug:string; ogImage?:string|null; }){
  const url = `${defaultSEO.url}/${slug}`;
  return {
    title: `${title} | ${defaultSEO.title}`,
    description: description || defaultSEO.description,
    openGraph: { title, description, type:"article", url, images: ogImage ? [ogImage] : [] },
    twitter: { card:"summary_large_image", title, description, images: ogImage? [ogImage]:[] },
    alternates: { canonical: url },
  } as const;
}
