"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/data";
import { SectionHeading, Reveal, TechBadge } from "@/components/ui";

const cats = ["all", "Agentic AI · Production", "ML · MLOps", "Backend · AI Product"];

export default function ProjectsPage() {
  const [cat, setCat] = useState("all");
  const list = projects.filter((p) => cat === "all" || p.category === cat);
  return (
    <div className="pt-28 mx-auto max-w-[1440px] px-6 lg:px-8 pb-10">
      <SectionHeading kicker="~/projects" title="Systems, not demos"
        desc="3 production-style systems from Payoo + personal builds. Filter by track." />
      <div className="mt-6 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
            className={`text-xs font-mono rounded-full px-4 py-2 border transition ${cat === c ? "bg-zinc-900 text-white font-semibold border-zinc-900" : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400"}`}>
            {c} {c === "all" && `(${projects.length})`}
          </button>
        ))}
      </div>
      <p className="font-mono text-[11px] text-zinc-500 mt-4">showing {list.length}/{projects.length} systems</p>
      <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.07}>
            <Link href={`/projects/${p.slug}`} className="rounded-2xl overflow-hidden block h-full bg-white border border-zinc-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500">
              <div className="relative h-48 w-full bg-zinc-100">
                <Image src={p.image} alt={p.title} fill sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" className="object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-mono font-bold uppercase bg-white/90 backdrop-blur px-2.5 py-1 rounded-full border border-zinc-200 text-zinc-800">{p.status}</span>
                <span className="absolute bottom-3 left-4 right-4 font-mono text-[11px] font-bold text-white">◈ {p.metric}</span>
              </div>
              <div className="p-5">
                <p className="text-[11px] font-mono text-zinc-500">{p.org} · {p.category}</p>
                <h3 className="font-bold mt-1 leading-snug text-zinc-900">{p.title}</h3>
                <p className="text-[13px] text-zinc-600 mt-2 line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">{p.tech.slice(0, 4).map((t) => <TechBadge key={t} t={t} />)}</div>
                <p className="font-mono text-[11px] text-zinc-500 mt-3">{p.period} · {p.team}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
