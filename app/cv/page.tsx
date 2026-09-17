import Link from "next/link";
import PrintButton from "@/components/PrintButton";
import { profile, experience, projects, skills, education } from "@/lib/data";

export const metadata = { title: `CV — ${profile.name}` };

export default function CVPage() {
  return (
    <div className="pt-28 mx-auto max-w-[900px] px-6 lg:px-8 pb-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900">{profile.name}</h1>
          <p className="font-mono text-sm mt-1 text-zinc-900 font-semibold">{profile.role} · {profile.location}</p>
          <p className="text-xs text-zinc-600 mt-2 break-all">{profile.email} · {profile.phone}<br />{profile.github}</p>
        </div>
        <PrintButton />
      </div>
      <div className="mt-6 space-y-4 text-sm">
        <section className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-6">
          <p className="font-mono text-[11px] font-bold tracking-widest text-zinc-500">SUMMARY</p>
          <p className="text-zinc-700 mt-2 leading-relaxed">{profile.tagline}</p>
        </section>
        <section className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-6">
          <p className="font-mono text-[11px] font-bold tracking-widest text-zinc-500">EXPERIENCE</p>
          {experience.map((e) => (
            <div key={e.role} className="mt-3">
              <p className="font-bold text-zinc-900">{e.role} — {e.company} <span className="font-mono text-[11px] text-zinc-500 font-normal">· {e.period}</span></p>
              <ul className="mt-2 space-y-1.5 text-zinc-700">{e.bullets.map((b) => <li key={b}>• {b}</li>)}</ul>
            </div>
          ))}
        </section>
        <section className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-6">
          <p className="font-mono text-[11px] font-bold tracking-widest text-zinc-500">PROJECTS</p>
          {projects.map((p) => (
            <div key={p.slug} className="mt-3">
              <p className="font-bold text-zinc-900">{p.title} <span className="font-mono text-[11px] text-emerald-700 font-normal">· {p.metric}</span></p>
              <p className="text-zinc-600 text-[13px]">{p.description}</p>
              <p className="font-mono text-[11px] text-zinc-500 mt-1">{p.tech.join(" · ")}</p>
            </div>
          ))}
        </section>
        <section className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-6">
          <p className="font-mono text-[11px] font-bold tracking-widest text-zinc-500">EDUCATION</p>
          <p className="font-bold mt-2 text-zinc-900">{education.degree}</p>
          <p className="text-zinc-700 text-[13px]">{education.school} · {education.period}</p>
          <p className="text-zinc-600 text-[13px] mt-1">{education.coursework.join(" · ")} · {education.certs[0]} · {education.languages}</p>
        </section>
        <section className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-6">
          <p className="font-mono text-[11px] font-bold tracking-widest text-zinc-500">SKILLS</p>
          {skills.map((g) => <p key={g.group} className="text-zinc-700 text-[13px] mt-2"><span className="font-semibold text-zinc-900">{g.group}:</span> {g.items.join(", ")}</p>)}
        </section>
      </div>
      <p className="text-center mt-6"><Link href="/" className="text-xs font-semibold text-zinc-900 hover:underline">← Back to portfolio</Link></p>
    </div>
  );
}
