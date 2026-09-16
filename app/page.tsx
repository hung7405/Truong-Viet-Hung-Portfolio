"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Download, Github, Cpu, Database, Cloud, Bot, FileSearch, Megaphone, Sparkles } from "lucide-react";
import { profile, projects, experience, education } from "@/lib/data";
import { Reveal, SectionHeading, MetricCard, TechBadge, Pipeline } from "@/components/ui";
import ErrorBoundary from "@/components/ErrorBoundary";
import Hero3D from "@/components/Hero3D";

const initiatives = [
  { icon: Bot, t: "Multi-agent merchant intelligence", d: "Parallel agents for website · registry · social · trust. Async FastAPI + Redis/ARQ." },
  { icon: FileSearch, t: "Enterprise Confluence RAG", d: "Ingestion → chunking → embeddings → vector retrieval → grounded generation." },
  { icon: Megaphone, t: "SME acquisition automation", d: "Facebook Ads + LangChain content agents + automated lead collection." },
];

export default function Home() {
  return (
    <div className="pt-24">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-zinc-50" />
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, #06b6d4 0%, transparent 50%), radial-gradient(circle at 80% 60%, #7c3aed 0%, transparent 45%), radial-gradient(circle at 50% 90%, #e879f9 0%, transparent 40%)" }} />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] opacity-30 blur-[1px]">
              <ErrorBoundary><Hero3D /></ErrorBoundary>
            </div>
          </div>
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#fcfcfc] to-transparent" />
        </div>

        <div className="relative w-full px-6 lg:px-10 xl:px-14 py-16 md:py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="inline-flex items-center gap-2 rounded-full bg-white border border-zinc-200 shadow-sm px-4 py-1.5 text-xs font-mono tracking-widest text-zinc-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> PORTFOLIO 2026 — HCMC — OPEN TO COLLABORATION
          </motion.div>

          <motion.h1 className="mt-8 font-black tracking-[-0.04em] leading-[0.9]" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>
            <span className="block text-5xl md:text-7xl lg:text-[84px] text-zinc-900">Truong Viet Hung</span>
            <span className="block text-5xl md:text-7xl lg:text-[84px] text-gradient">AI Engineer</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }} className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-zinc-600 text-pretty">
            Final-year Data Science @ Swinburne × building production AI: multi-agent automation, enterprise RAG and backend systems that survive real latency and fallbacks.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }} className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/projects" className="rounded-full bg-zinc-900 text-white px-7 py-3.5 text-sm font-semibold inline-flex items-center gap-2 hover:bg-black transition shadow-lg">
              View systems <ArrowRight size={16} />
            </Link>
            <a href={profile.github} className="rounded-full bg-white border border-zinc-200 px-6 py-3.5 text-sm font-semibold inline-flex items-center gap-2 hover:border-zinc-300 transition shadow-sm text-zinc-800">
              <Github size={16} /> hung7405
            </a>
            <Link href="/cv" className="rounded-full bg-white border border-zinc-200 px-6 py-3.5 text-sm font-semibold inline-flex items-center gap-2 hover:border-zinc-300 transition shadow-sm text-zinc-800">
              <Download size={16} /> CV
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65, duration: 0.6 }} className="mt-8 flex flex-wrap justify-center gap-2">
            {["Python", "FastAPI", "LangChain", "RAG", "PostgreSQL", "Redis", "Docker", "Playwright"].map((t, i) => (
              <motion.span key={t} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.05 }}><TechBadge t={t} /></motion.span>
            ))}
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-6 font-mono text-[11px] tracking-widest text-zinc-400 flex items-center justify-center gap-2">
            <Sparkles size={12} className="text-neon" /> Trusted craft — 3 systems · 3 initiatives · 1 internship
          </motion.p>
        </div>
      </section>

      <section className="w-full px-6 lg:px-10 xl:px-14 -mt-6">
        <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4" initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
          {profile.hero_metrics.map((m) => (
            <motion.div key={m.label} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } } }}>
              <div className="rounded-[24px] bg-white border border-zinc-200 p-6 shadow-[0_8px_40px_-16px_rgba(0,0,0,0.08)] h-full">
                <p className="text-2xl md:text-[28px] font-black tracking-tight text-gradient font-mono leading-none">{m.value}</p>
                <p className="text-xs font-medium text-zinc-600 mt-2 leading-relaxed">{m.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="w-full px-6 lg:px-10 xl:px-14 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] font-bold text-zinc-400">FLAGSHIP — PAYOO</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 mt-2">Merchant multi-agent validation</h2>
            <p className="text-zinc-600 mt-3 max-w-2xl">The system that cut assessment from hours to minutes. Bento of impact, architecture and evidence — senior-grade operability.</p>
          </div>
          <Link href="/projects/merchant-multi-agent" className="rounded-full bg-zinc-900 text-white px-5 py-2.5 text-sm font-semibold inline-flex items-center gap-2">Case study <ArrowUpRight size={14} /></Link>
        </div>

        <div className="mt-8 grid lg:grid-cols-12 gap-5">
          <Reveal className="lg:col-span-4 h-full">
            <div className="rounded-[28px] bg-zinc-900 text-white p-8 relative overflow-hidden h-full">
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gradient-to-br from-neon/30 via-violet2/20 to-magenta/20 blur-2xl" />
              <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-400">IMPACT</p>
              <p className="text-5xl font-black mt-3 tracking-tight">~8×</p>
              <p className="text-sm text-zinc-300 mt-2">2–3 hours → 15–20 minutes per merchant via parallel evidence agents + cross-checks.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["4 parallel agents", "Async ARQ", "Fallback-safe"].map((t) => <span key={t} className="text-xs bg-white/10 border border-white/10 rounded-full px-3 py-1.5">{t}</span>)}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-8 h-full">
            <div className="rounded-[28px] bg-white border border-zinc-200 p-7 md:p-8 shadow-sm h-full">
              <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-500">SYSTEM ARCHITECTURE</p>
              <div className="mt-4"><Pipeline steps={projects[0].architecture} /></div>
              <div className="mt-6 grid sm:grid-cols-3 gap-4">
                {[
                  ["Website agent", "Playwright crawl + LLM extraction"],
                  ["Registry + Social", "Search APIs + verification"],
                  ["Trust synthesis", "Grounded report + score"],
                ].map(([t, d]) => (
                  <div key={t} className="rounded-2xl bg-zinc-50 border border-zinc-200 p-5">
                    <p className="font-bold text-[13px] text-zinc-900">{t}</p><p className="text-xs text-zinc-600 mt-1">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-5 grid md:grid-cols-3 gap-5">
          {initiatives.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.07}>
              <div className="rounded-[24px] bg-white border border-zinc-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <c.icon size={20} className="text-neon" />
                <p className="font-bold text-sm mt-4 text-zinc-900">{c.t}</p>
                <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-zinc-900 text-white py-14 md:py-18">
        <div className="w-full px-6 lg:px-10 xl:px-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] tracking-[0.3em] text-zinc-500">SELECTED SYSTEMS</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mt-2">Projects with receipts</h2>
              <p className="text-zinc-400 mt-2 max-w-xl">Like Layers templates — each card is a self-contained layer with its own stack and motion.</p>
            </div>
            <Link href="/projects" className="rounded-full bg-white text-zinc-900 px-5 py-2.5 text-sm font-semibold inline-flex items-center gap-2">All projects <ArrowUpRight size={14} /></Link>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.07}>
                <Link href={`/projects/${p.slug}`} className="group rounded-[28px] overflow-hidden bg-white text-zinc-900 block h-full hover:-translate-y-1 transition-transform duration-500 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]">
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.03] transition duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    <span className="absolute top-4 left-4 text-[10px] font-mono font-bold uppercase bg-white/90 backdrop-blur px-2.5 py-1 rounded-full border border-zinc-200">{p.status}</span>
                    <span className="absolute bottom-4 left-4 right-4 font-mono text-[11px] font-bold text-white">◈ {p.metric}</span>
                  </div>
                  <div className="p-6">
                    <p className="text-[11px] font-mono tracking-widest text-zinc-500">{p.org} · {p.category}</p>
                    <h3 className="font-black mt-1 leading-snug text-[17px]">{p.title}</h3>
                    <p className="text-[13px] text-zinc-600 mt-2 line-clamp-2 leading-relaxed">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">{p.tech.slice(0, 4).map((t) => <span key={t} className="text-[11px] font-mono bg-zinc-50 border border-zinc-200 rounded-full px-2.5 py-1 text-zinc-700">{t}</span>)}</div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-6 lg:px-10 xl:px-14 py-16">
        <SectionHeading kicker="Production stack" title="Backend-grade AI engineering" action={<Link href="/skills" className="text-sm font-semibold text-zinc-900 hover:underline inline-flex items-center gap-1">Full matrix <ArrowUpRight size={14} /></Link>} />
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {[
            { icon: Cpu, t: "AI / Retrieval", d: "LLMs, RAG, agents, LangChain, embeddings, pgvector/HNSW, grounded generation." },
            { icon: Database, t: "Backend / Data", d: "FastAPI, REST, WebSockets, PostgreSQL, Redis/ARQ, SQLAlchemy, NestJS, Socket.IO." },
            { icon: Cloud, t: "Automation / Cloud", d: "Playwright, Docker Compose, AWS EC2, Git, Linux — ship + operate." },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.07}>
              <div className="rounded-[24px] bg-white border border-zinc-200 p-7 shadow-sm relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
                <c.icon className="text-neon" size={22} />
                <h3 className="font-black mt-4 text-zinc-900">{c.t}</h3>
                <p className="text-[13px] text-zinc-600 mt-2 leading-relaxed">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="rounded-[24px] bg-zinc-50 border border-zinc-200 p-7 mt-6 grid md:grid-cols-[1.2fr_1.4fr] gap-6 items-center">
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 font-bold">EDUCATION</p>
              <p className="font-black mt-2 text-zinc-900">{education.degree}</p>
              <p className="text-sm text-zinc-700">{education.school}</p>
              <p className="text-xs font-mono text-zinc-500 mt-1">{education.period}</p>
              <p className="text-xs text-zinc-600 mt-2">{education.languages} · {education.certs[0]}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {education.coursework.map((c) => <TechBadge key={c} t={c} />)}
              <span className="text-xs text-zinc-500 px-2 py-1.5">+ {experience[0].company} internship → <Link href="/experience" className="text-zinc-900 font-semibold underline">journey</Link></span>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="w-full px-6 lg:px-10 xl:px-14 pb-10">
        <Reveal>
          <div className="rounded-[32px] bg-zinc-900 p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-br from-neon/20 via-violet2/15 to-magenta/15 blur-2xl" />
            <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-magenta/15 via-violet2/10 to-neon/10 blur-2xl" />
            <p className="font-mono text-xs tracking-[0.2em] text-zinc-400">CONTACT</p>
            <h3 className="text-3xl md:text-5xl font-black tracking-tight mt-3 text-white">Need AI that survives production?</h3>
            <p className="text-zinc-400 mt-3">Agents, RAG, FastAPI backends — designed for latency, fallbacks & operability.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href={`mailto:${profile.email}`} className="rounded-full bg-white text-zinc-900 px-7 py-3.5 text-sm font-bold hover:bg-zinc-100 transition">Get In Touch</a>
              <Link href="/projects/merchant-multi-agent" className="rounded-full bg-white/10 border border-white/10 text-white px-7 py-3.5 text-sm font-semibold hover:bg-white/15 transition">Read flagship case study</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
