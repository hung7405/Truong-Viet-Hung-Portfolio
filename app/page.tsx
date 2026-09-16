"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Download, Github, Cpu, Database, Cloud, Bot, FileSearch, Megaphone } from "lucide-react";
import { profile, projects, experience, education } from "@/lib/data";
import { Reveal, SectionHeading, TechBadge, Pipeline } from "@/components/ui";
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
      <section className="w-full px-6 lg:px-10 xl:px-14">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          <motion.div className="lg:col-span-7" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}>
            <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } } }} className="inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white px-4 py-1.5 text-xs font-mono tracking-[0.14em]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> PORTFOLIO 2026 — HCMC
            </motion.div>

            <motion.h1 variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } } }} className="mt-6 font-black tracking-[-0.04em] leading-[0.88]">
              <span className="block text-[42px] md:text-[58px] lg:text-[68px] text-zinc-900">Truong Viet Hung</span>
              <span className="block text-[42px] md:text-[58px] lg:text-[68px] text-gradient">AI Engineer</span>
            </motion.h1>

            <motion.p variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } } }} className="mt-5 max-w-xl text-[17px] leading-relaxed text-zinc-600">
              Final-year Data Science @ Swinburne × building production AI: multi-agent automation, enterprise RAG and backend systems that survive real latency and fallbacks.
            </motion.p>

            <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } } }} className="mt-7 flex flex-wrap gap-3">
              <Link href="/projects" className="rounded-full bg-zinc-900 text-white px-7 py-3.5 text-sm font-bold inline-flex items-center gap-2 hover:bg-black transition shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)]">
                View systems <ArrowRight size={16} />
              </Link>
              <a href={profile.github} className="rounded-full bg-white border border-zinc-200 px-6 py-3.5 text-sm font-semibold inline-flex items-center gap-2 hover:border-zinc-300 transition shadow-sm text-zinc-800">
                <Github size={16} /> hung7405
              </a>
              <Link href="/cv" className="rounded-full bg-white border border-zinc-200 px-6 py-3.5 text-sm font-semibold inline-flex items-center gap-2 hover:border-zinc-300 transition shadow-sm text-zinc-800">
                <Download size={16} /> CV
              </Link>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5 } } }} className="mt-6 flex flex-wrap gap-2">
              {["Python", "FastAPI", "LangChain", "RAG", "PostgreSQL", "Redis", "Docker", "Playwright"].map((t, i) => (
                <motion.span key={t} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 + i * 0.04 }}>
                  <TechBadge t={t} />
                </motion.span>
              ))}
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6, delay: 0.2 } } }} className="mt-6 grid grid-cols-3 gap-3 max-w-xl">
              {profile.hero_metrics.slice(0, 3).map((m) => (
                <div key={m.label} className="rounded-2xl bg-zinc-50 border border-zinc-200 p-4">
                  <p className="text-[18px] font-black tracking-tight text-zinc-900 font-mono leading-none">{m.value}</p>
                  <p className="text-[11px] font-medium text-zinc-600 mt-1.5 leading-relaxed">{m.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="lg:col-span-5" initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}>
            <ErrorBoundary>
              <Hero3D />
            </ErrorBoundary>
          </motion.div>
        </div>
      </section>

      <section className="w-full px-6 lg:px-10 xl:px-14 mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="hidden lg:block lg:col-span-1" />
        <div className="col-span-2 lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white border border-zinc-200 p-5 flex items-center justify-between shadow-sm">
            <div><p className="font-mono text-xs font-bold tracking-widest text-zinc-500">STATUS</p><p className="text-sm font-bold text-zinc-900 mt-1">Available for collaboration</p></div>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="rounded-2xl bg-zinc-900 text-white p-5 flex items-center justify-between">
            <div><p className="font-mono text-xs tracking-widest text-zinc-400">LOCATION</p><p className="text-sm font-bold mt-1">Ho Chi Minh City</p></div>
            <span className="text-lg">🇻🇳</span>
          </div>
          <div className="rounded-2xl bg-white border border-zinc-200 p-5">
            <p className="font-mono text-xs font-bold tracking-widest text-zinc-500">ENGLISH</p><p className="text-sm font-bold text-zinc-900 mt-1">IELTS 6.5 · DET 130</p>
          </div>
        </div>
      </section>

      <section className="w-full px-6 lg:px-10 xl:px-14 py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] font-bold text-zinc-400">FLAGSHIP — PAYOO</p>
            <h2 className="text-3xl md:text-[40px] font-black tracking-tight text-zinc-900 mt-2">Merchant multi-agent validation</h2>
            <p className="text-zinc-600 mt-3 max-w-2xl">The system that cut assessment from hours to minutes. Bento of impact, architecture and evidence — senior-grade operability.</p>
          </div>
          <Link href="/projects/merchant-multi-agent" className="rounded-full bg-zinc-900 text-white px-5 py-2.5 text-sm font-semibold inline-flex items-center gap-2">Case study <ArrowUpRight size={14} /></Link>
        </div>

        <div className="mt-8 grid lg:grid-cols-12 gap-5">
          <Reveal className="lg:col-span-4 h-full">
            <div className="rounded-[28px] bg-zinc-900 text-white p-8 relative overflow-hidden h-full min-h-[280px]">
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gradient-to-br from-neon/25 via-violet2/18 to-magenta/18 blur-2xl" />
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

      <section className="w-full bg-zinc-900 text-white py-14">
        <div className="w-full px-6 lg:px-10 xl:px-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] tracking-[0.3em] text-zinc-500">SELECTED SYSTEMS</p>
              <h2 className="text-3xl md:text-[40px] font-black tracking-tight mt-2">Projects with receipts</h2>
              <p className="text-zinc-400 mt-2 max-w-xl">Each card is a self-contained layer — distinct stack, metric and architecture.</p>
            </div>
            <Link href="/projects" className="rounded-full bg-white text-zinc-900 px-5 py-2.5 text-sm font-semibold inline-flex items-center gap-2">All projects <ArrowUpRight size={14} /></Link>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.07}>
                <Link href={`/projects/${p.slug}`} className="group rounded-[28px] overflow-hidden bg-white text-zinc-900 block h-full hover:-translate-y-1 transition-transform duration-500">
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.03] transition duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
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

      <section className="w-full px-6 lg:px-10 xl:px-14 py-14">
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
            <h3 className="text-3xl md:text-[42px] font-black tracking-tight mt-3 text-white">Need AI that survives production?</h3>
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
