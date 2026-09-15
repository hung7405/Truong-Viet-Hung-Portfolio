import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import { Reveal, TechBadge, Pipeline } from "@/components/ui";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = projects.find((x) => x.slug === params.slug);
  return { title: p ? `${p.title} — Truong Viet Hung` : "Project" };
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) notFound();
  return (
    <div className="pt-28 mx-auto max-w-4xl px-4 pb-10">
      <Link href="/projects" className="font-mono text-xs text-neon hover:underline">← ~/projects</Link>
      <Reveal>
        <p className="text-neon font-mono text-[11px] font-bold tracking-[0.2em] uppercase mt-4">{p.org} · {p.category} · {p.status}</p>
        <h1 className="text-3xl md:text-5xl font-bold mt-2 tracking-tight">{p.title}</h1>
        <p className="text-zinc-400 mt-3 leading-relaxed">{p.description}</p>
        <p className="font-mono text-[11px] text-zinc-500 mt-2">{p.period} · {p.team}</p>
        <div className="mt-4 rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.06] px-5 py-4 font-mono text-sm text-emerald-300">
          ◈ KEY RESULT — {p.metric}
        </div>
      </Reveal>
      <img src={p.image} alt={p.title} className="mt-6 rounded-2xl w-full h-72 object-cover border border-white/10" />
      <div className="glass rounded-2xl p-6 mt-6">
        <p className="font-mono text-[11px] text-zinc-500">ARCHITECTURE</p>
        <div className="mt-3"><Pipeline steps={p.architecture} /></div>
      </div>
      <div className="glass rounded-2xl p-6 mt-4">
        <p className="font-mono text-[11px] text-zinc-500">OVERVIEW</p>
        <p className="text-sm text-zinc-300 mt-2 leading-relaxed">{p.longDescription}</p>
        <p className="font-mono text-[11px] text-zinc-500 mt-6">ENGINEERING HIGHLIGHTS</p>
        <ul className="mt-2 space-y-2 text-sm text-zinc-300">
          {p.highlights.map((h) => <li key={h} className="flex gap-2"><span className="text-neon">▸</span><span>{h}</span></li>)}
        </ul>
        <p className="font-mono text-[11px] text-zinc-500 mt-6">STACK</p>
        <div className="flex flex-wrap gap-1.5 mt-2">{p.tech.map((t) => <TechBadge key={t} t={t} />)}</div>
      </div>
    </div>
  );
}
