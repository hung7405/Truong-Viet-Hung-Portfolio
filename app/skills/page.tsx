import { skills, proficiency, education } from "@/lib/data";
import { SectionHeading, Reveal, TechBadge } from "@/components/ui";

export const metadata = { title: "Skills — Truong Viet Hung" };

export default function SkillsPage() {
  return (
    <div className="pt-28 mx-auto max-w-[1440px] px-6 lg:px-8 pb-10">
      <SectionHeading kicker="~/skills" title="Stack from your CV, zero filler"
        desc="Exactly what you listed: Python/SQL/TS, LLMs+RAG+agents, FastAPI+Postgres+Redis, Docker+EC2+Playwright." />
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={i * 0.06}>
            <div className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-6 h-full">
              <p className="font-mono text-[11px] font-bold text-zinc-900 uppercase tracking-widest">{g.group}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">{g.items.map((t) => <TechBadge key={t} t={t} />)}</div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-6 mt-4">
          <p className="font-mono text-[11px] font-bold tracking-widest text-zinc-500">PROFICIENCY — calibrated to CV depth</p>
          <div className="mt-4 grid md:grid-cols-2 gap-x-8 gap-y-4">
            {Object.entries(proficiency).map(([k, v]) => (
              <div key={k}>
                <div className="flex justify-between font-mono text-[11px] mb-1.5"><span className="text-zinc-900 font-semibold">{k}</span><span className="text-zinc-500">{v}%</span></div>
                <div className="h-2 rounded-full bg-zinc-100 border border-zinc-200 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-neon via-violet2 to-magenta" style={{ width: `${v}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="font-mono text-[11px] text-zinc-500 mt-5">{education.languages} · {education.certs[0]} · Pandas for analysis</p>
        </div>
      </Reveal>
    </div>
  );
}
