import { profile, education, experience } from "@/lib/data";
import { SectionHeading, Reveal, TechBadge } from "@/components/ui";

export const metadata = { title: "About — Truong Viet Hung" };

export default function About() {
  return (
    <div className="pt-28 mx-auto max-w-6xl px-4 pb-10">
      <SectionHeading kicker="$ whoami" title="Production-oriented AI engineer"
        desc={profile.tagline} />
      <div className="mt-8 grid lg:grid-cols-5 gap-4">
        <Reveal>
          <div className="glass rounded-2xl p-6 lg:col-span-3 h-full">
            <p className="font-mono text-[11px] text-zinc-500">SUMMARY</p>
            <p className="text-sm text-zinc-300 mt-3 leading-relaxed">
              Final-year Data Science student @ {education.school} and AI Engineer Intern @ Payoo (Apr 2026 — Present).
              I build applied AI across <span className="text-white font-semibold">multi-agent automation</span>, <span className="text-white font-semibold">enterprise RAG</span> and <span className="text-white font-semibold">backend systems</span> —
              with Python/FastAPI, retrieval systems, PostgreSQL/Redis, Playwright automation and Docker. My merchant due-diligence
              workflow cut assessment time from <span className="font-mono text-neon">~2–3h → ~15–20min</span>.
            </p>
            <p className="font-mono text-[11px] text-zinc-500 mt-6">NOW @ PAYOO</p>
            <ul className="mt-2 space-y-2 text-sm text-zinc-300">
              {experience[0].bullets.map((b) => <li key={b} className="flex gap-2"><span className="text-neon">▸</span><span>{b}</span></li>)}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="glass rounded-2xl p-6 lg:col-span-2 h-full">
            <p className="font-mono text-[11px] text-zinc-500">EDUCATION</p>
            <p className="font-bold mt-2">{education.degree}</p>
            <p className="text-sm text-neon">{education.school}</p>
            <p className="text-xs font-mono text-zinc-500 mt-1">{education.period}</p>
            <p className="font-mono text-[11px] text-zinc-500 mt-5">COURSEWORK</p>
            <div className="flex flex-wrap gap-1.5 mt-2">{education.coursework.map((c) => <TechBadge key={c} t={c} />)}</div>
            <p className="font-mono text-[11px] text-zinc-500 mt-5">LANGUAGES · CERTS</p>
            <p className="text-xs text-zinc-300 mt-2">{education.languages}</p>
            <p className="text-xs text-zinc-300 mt-1">{education.certs[0]}</p>
          </div>
        </Reveal>
      </div>
      <Reveal>
        <div className="glass rounded-2xl p-6 mt-4">
          <p className="font-mono text-[11px] text-zinc-500">ENGINEERING PRINCIPLES</p>
          <div className="grid md:grid-cols-3 gap-3 mt-3 text-sm">
            {[["Async-first", "ARQ queues, session tracking, fallbacks — agents must not hang."], ["Grounded generation", "Every claim traceable to retrieved sources."], ["Operability", "Docker Compose → EC2, logs, scan history, TTL holds."], ["Evidence > vibes", "Cross-check across heterogeneous sources."], ["Latency budgets", "Parallel agents, HNSW indexes, caching."], ["Clean interfaces", "FastAPI modules, typed schemas, versioned artifacts."]].map(([t, d]) => (
              <div key={t} className="bg-white/[0.03] border border-white/10 rounded-xl p-4"><p className="font-semibold text-[13px]">{t}</p><p className="text-xs text-zinc-400 mt-1 leading-relaxed">{d}</p></div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
