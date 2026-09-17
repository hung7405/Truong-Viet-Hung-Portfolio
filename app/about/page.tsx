import { profile, education, experience } from "@/lib/data";
import { SectionHeading, Reveal, TechBadge } from "@/components/ui";

export const metadata = { title: "About — Truong Viet Hung" };

export default function About() {
  return (
    <div className="pt-28 mx-auto max-w-[1440px] px-6 lg:px-8 pb-10">
      <SectionHeading kicker="$ whoami" title="Production-oriented AI engineer"
        desc={profile.tagline} />
      <div className="mt-8 grid lg:grid-cols-5 gap-4">
        <Reveal className="lg:col-span-3">
          <div className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-6 h-full">
            <p className="font-mono text-[11px] font-bold tracking-widest text-zinc-500">SUMMARY</p>
            <p className="text-sm text-zinc-600 mt-3 leading-relaxed">
              Final-year Data Science student @ {education.school} and AI Engineer Intern @ Payoo (Apr 2026 — Present).
              I build applied AI across <span className="text-zinc-900 font-semibold">multi-agent automation</span>, <span className="text-zinc-900 font-semibold">enterprise RAG</span> and <span className="text-zinc-900 font-semibold">backend systems</span> —
              with Python/FastAPI, retrieval systems, PostgreSQL/Redis, Playwright automation and Docker. My merchant due-diligence
              workflow cut assessment time from <span className="font-mono font-bold text-zinc-900">~2–3h → ~15–20min</span>.
            </p>
            <p className="font-mono text-[11px] font-bold tracking-widest text-zinc-500 mt-6">NOW @ PAYOO</p>
            <ul className="mt-2 space-y-2 text-sm text-zinc-700">
              {experience[0].bullets.map((b) => <li key={b} className="flex gap-2"><span className="text-neon font-bold">▸</span><span>{b}</span></li>)}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-2">
          <div className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-6 h-full">
            <p className="font-mono text-[11px] font-bold tracking-widest text-zinc-500">EDUCATION</p>
            <p className="font-bold mt-2 text-zinc-900">{education.degree}</p>
            <p className="text-sm text-zinc-700">{education.school}</p>
            <p className="text-xs font-mono text-zinc-500 mt-1">{education.period}</p>
            <p className="font-mono text-[11px] font-bold tracking-widest text-zinc-500 mt-5">COURSEWORK</p>
            <div className="flex flex-wrap gap-1.5 mt-2">{education.coursework.map((c) => <TechBadge key={c} t={c} />)}</div>
            <p className="font-mono text-[11px] font-bold tracking-widest text-zinc-500 mt-5">LANGUAGES · CERTS</p>
            <p className="text-xs text-zinc-700 mt-2">{education.languages}</p>
            <p className="text-xs text-zinc-700 mt-1">{education.certs[0]}</p>
          </div>
        </Reveal>
      </div>
      <Reveal>
        <div className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-6 mt-4">
          <p className="font-mono text-[11px] font-bold tracking-widest text-zinc-500">ENGINEERING PRINCIPLES</p>
          <div className="grid md:grid-cols-3 gap-3 mt-3 text-sm">
            {[["Async-first", "ARQ queues, session tracking, fallbacks — agents must not hang."], ["Grounded generation", "Every claim traceable to retrieved sources."], ["Operability", "Docker Compose → EC2, logs, scan history, TTL holds."], ["Evidence > vibes", "Cross-check across heterogeneous sources."], ["Latency budgets", "Parallel agents, HNSW indexes, caching."], ["Clean interfaces", "FastAPI modules, typed schemas, versioned artifacts."]].map(([t, d]) => (
              <div key={t} className="bg-zinc-50 border border-zinc-200 rounded-xl p-4"><p className="font-semibold text-[13px] text-zinc-900">{t}</p><p className="text-xs text-zinc-600 mt-1 leading-relaxed">{d}</p></div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
