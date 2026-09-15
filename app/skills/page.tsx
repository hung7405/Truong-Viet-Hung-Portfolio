import { skills, proficiency, education } from "@/lib/data";
import { SectionHeading, Reveal, TechBadge } from "@/components/ui";

export const metadata = { title: "Skills — Truong Viet Hung" };

export default function SkillsPage() {
  return (
    <div className="pt-28 mx-auto max-w-6xl px-4 pb-10">
      <SectionHeading kicker="~/skills" title="Stack from your CV, zero filler"
        desc="Exactly what you listed: Python/SQL/TS, LLMs+RAG+agents, FastAPI+Postgres+Redis, Docker+EC2+Playwright." />
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={i * 0.06}>
            <div className="glass rounded-2xl p-6 h-full">
              <p className="font-mono text-[11px] text-neon uppercase tracking-widest">{g.group}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">{g.items.map((t) => <TechBadge key={t} t={t} />)}</div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div className="glass rounded-2xl p-6 mt-4">
          <p className="font-mono text-[11px] text-zinc-500">PROFICIENCY — calibrated to CV depth</p>
          <div className="mt-4 grid md:grid-cols-2 gap-x-8 gap-y-4">
            {Object.entries(proficiency).map(([k, v]) => (
              <div key={k}>
                <div className="flex justify-between font-mono text-[11px] mb-1.5"><span>{k}</span><span className="text-zinc-500">{v}%</span></div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-neon via-violet2 to-magenta" style={{ width: `${v}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="font-mono text-[11px] text-zinc-600 mt-5">{education.languages} · {education.certs[0]} · Pandas for analysis</p>
        </div>
      </Reveal>
    </div>
  );
}
