import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import { Reveal, TechBadge, Pipeline } from "@/components/ui";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = projects.find((x) => x.slug === params.slug);
  return {
    title: p ? `${p.title} — Truong Viet Hung` : "Project",
    description: p?.description ?? "Project case study by Truong Viet Hung",
  };
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) notFound();
  return (
    <div className="pt-28 mx-auto max-w-4xl px-4 pb-10">
      <Link href="/projects" className="font-mono text-xs font-semibold text-zinc-900 hover:underline">← ~/projects</Link>
      <Reveal>
        <p className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase mt-4 text-zinc-500">{p.org} · {p.category} · {p.status}</p>
        <h1 className="text-3xl md:text-5xl font-black mt-2 tracking-tight text-zinc-900">{p.title}</h1>
        <p className="text-zinc-600 mt-3 leading-relaxed">{p.description}</p>
        <p className="font-mono text-[11px] text-zinc-500 mt-2">{p.period} · {p.team}</p>
        <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.07] px-5 py-4 font-mono text-sm font-semibold text-emerald-800">
          ◈ KEY RESULT — {p.metric}
        </div>
      </Reveal>
      <div className="relative mt-6 rounded-2xl w-full h-72 overflow-hidden border border-zinc-200 bg-zinc-100">
        <Image src={p.image} alt={p.title} fill sizes="(max-width:768px) 100vw, 896px" className="object-cover" priority={false} />
      </div>
      <div className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-6 mt-6">
        <p className="font-mono text-[11px] font-bold tracking-widest text-zinc-500">ARCHITECTURE</p>
        <div className="mt-3"><Pipeline steps={p.architecture} /></div>
      </div>
      <div className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-6 mt-4">
        <p className="font-mono text-[11px] font-bold tracking-widest text-zinc-500">OVERVIEW</p>
        <p className="text-sm text-zinc-700 mt-2 leading-relaxed">{p.longDescription}</p>
        <p className="font-mono text-[11px] font-bold tracking-widest text-zinc-500 mt-6">ENGINEERING HIGHLIGHTS</p>
        <ul className="mt-2 space-y-2 text-sm text-zinc-700">
          {p.highlights.map((h) => <li key={h} className="flex gap-2"><span className="text-neon font-bold">▸</span><span>{h}</span></li>)}
        </ul>
        <p className="font-mono text-[11px] font-bold tracking-widest text-zinc-500 mt-6">STACK</p>
        <div className="flex flex-wrap gap-1.5 mt-2">{p.tech.map((t) => <TechBadge key={t} t={t} />)}</div>
      </div>
    </div>
  );
}
