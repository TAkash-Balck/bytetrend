import Link from "next/link";
export default function SiteHeader(){
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <img src="/logo.svg" alt="ByteTrend" className="h-6 w-auto" />
          <span>ByteTrend</span>
        </Link>
        <nav className="flex gap-4 text-sm text-gray-700">
          <Link href="/news">News</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy-policy">Privacy</Link>
        </nav>
      </div>
    </header>
  );
}
