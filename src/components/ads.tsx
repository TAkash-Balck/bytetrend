export function Ad({ slot = "in-article" }: { slot?: "header" | "in-article" | "sidebar" }){
  if (process.env.NEXT_PUBLIC_ADSENSE !== "on") return null;
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  if (!client) return null;
  return <div data-adsense-slot={slot} className="my-4 w-full min-h-[90px] border text-xs text-gray-500 flex items-center justify-center rounded-xl">Ad Slot: {slot}</div>;
}
