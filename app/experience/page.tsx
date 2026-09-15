import { experience } from "@/lib/data";
import { SectionHeading, Reveal, TechBadge } from "@/components/ui";

export const metadata = { title: "Experience — Truong Viet Hung" };

export default function ExperiencePage() {
  const e = experience[0];
  return (
    <div className="pt-28 mx-auto max-w-4xl px-4 pb-10">
      <SectionHeading kicker="~/experience" title="Payoo — AI Engineer Intern"
        desc="Apr 2026 — Present · Ho Chi Minh City. No freelance filler — one real internship, three real initiatives." />
      <div className="mt-8">
        <Reveal>
          <div className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/70 to-transparent" />
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-xl">{e.role}</h3>
              <span className="text-[10px] font-mono font-bold bg-emerald-400/15 text-emerald-300 px-2.5 py-1 rounded-full">● Current</span>
            </div>
            <p className="text-sm text-neon mt-1 font-mono">{e.company} · {e.location}</p>
            <p className="font-mono text-[11px] text-zinc-500 mt-1">{e.period}</p>
            <p className="text-sm text-zinc-300 mt-4 leading-relaxed">{e.summary}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-300">
              {e.bullets.map((b) => <li key={b} className="flex gap-2"><span className="text-neon mt-0.5">▸</span><span>{b}</span></li>)}
            </ul>
            <div className="flex flex-wrap gap-1.5 mt-5">{e.tech.map((t) => <TechBadge key={t} t={t} />)}</div>
          </div>
        </Reveal>
        <div className="mt-4 grid md:grid-cols-3 gap-4">
          {[
            ["01 · Merchant agents", "2–3h → 15–20min. Parallel evidence + async ARQ + fallbacks."],
            ["02 · Confluence RAG", "Ingestion, chunking, embeddings, retrieval, grounded answers."],
            ["03 · SME acquisition", "FB Ads + LangChain content agents + lead automation."],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.07}>
              <div className="glass card-hover rounded-2xl p-5">
                <p className="font-mono text-xs text-neon">{t}</p>
                <p className="text-[13px] text-zinc-300 mt-2 leading-relaxed">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
