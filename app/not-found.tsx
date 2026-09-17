export default function NotFound() {
  return (
    <div className="pt-32 pb-20 text-center px-6">
      <p className="font-mono text-xs tracking-widest text-zinc-500">404 — NOT FOUND</p>
      <h1 className="text-4xl font-black tracking-tight text-zinc-900 mt-3">Page not in the pipeline</h1>
      <a href="/" className="inline-block mt-6 rounded-full bg-zinc-900 text-white px-6 py-3 text-sm font-semibold">← Back home</a>
    </div>
  );
}
