export default function Page(){
  return <main className="prose">
    <h1>Contact</h1>
    <p>Send us your feedback or partnership ideas.</p>
    <form method="post" action="/api/contact" className="space-y-3 not-prose">
      <input name="name" required placeholder="Your name" className="w-full rounded border p-2" />
      <input type="email" name="email" required placeholder="Your email" className="w-full rounded border p-2" />
      <textarea name="message" required placeholder="Message" rows={6} className="w-full rounded border p-2" />
      <button className="btn">Send</button>
    </form>
  </main>
}
