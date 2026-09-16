"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Download, Github, Cpu, Database, Cloud, Bot, FileSearch, Megaphone } from "lucide-react";
import { profile, projects, experience, education } from "@/lib/data";
import { Reveal, SectionHeading, Marquee, MetricCard, TechBadge, Pipeline } from "@/components/ui";
import ErrorBoundary from "@/components/ErrorBoundary";
import Hero3D from "@/components/Hero3D";

const initiatives = [
  { icon: Bot, t: "Multi-agent merchant intelligence", d: "Parallel agents for website · registry · social · trust. Async FastAPI + Redis/ARQ." },
  { icon: FileSearch, t: "Enterprise Confluence RAG", d: "Ingestion → chunking → embeddings → vector retrieval → grounded generation." },
  { icon: Megaphone, t: "SME acquisition automation", d: "Facebook Ads + LangChain content agents + automated lead collection." },
];

const heroParent = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
const heroItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};
const badgeItem = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Home() {
  return (
    <div className="pt-24">
      <section className="relative mx-auto max-w-[1440px] px-6 lg:px-8 pb-10 overflow-hidden">
        <motion.div className="orb h-72 w-72 bg-neon/40 -top-10 -left-10" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} />
        <motion.div className="orb h-80 w-80 bg-violet2/40 top-20 right-0" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} />
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <motion.div variants={heroParent} initial="hidden" animate="show">
            <motion.div variants={badgeItem}>
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono text-neon">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> {profile.availability}
              </span>
            </motion.div>

            <motion.h1 variants={heroItem} className="mt-5 text-4xl md:text-6xl font-bold leading-[1.04] tracking-tight">
              <span className="block overflow-hidden">
                <motion.span className="block" initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}>
                  {profile.name}
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span className="block text-gradient" initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 0.7, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}>
                  {profile.role} @ Payoo
                </motion.span>
              </span>
            </motion.h1>

            <motion.p variants={heroItem} className="mt-4 text-zinc-600 leading-relaxed">
              {profile.tagline}
            </motion.p>

            <motion.p variants={heroItem} className="mt-3 font-mono text-xs text-zinc-500">
              <span className="text-emerald-400">▸</span> python · fastapi · rag · agents · postgres/redis · docker
            </motion.p>

            <motion.div variants={heroItem} className="mt-6 flex flex-wrap gap-3">
              <Link href="/projects" className="rounded-xl bg-white text-black px-5 py-3 text-sm font-semibold flex items-center gap-2 hover:bg-neon transition">
                View systems <ArrowRight size={16} />
              </Link>
              <a href={profile.github} className="glass rounded-xl px-5 py-3 text-sm font-semibold flex items-center gap-2 hover:border-neon/50 transition">
                <Github size={16} /> hung7405
              </a>
              <Link href="/cv" className="glass rounded-xl px-5 py-3 text-sm font-semibold flex items-center gap-2 hover:border-neon/50 transition">
                <Download size={16} /> CV
              </Link>
            </motion.div>

            <motion.div variants={heroItem} className="mt-5 flex flex-wrap gap-1.5">
              {["Python", "FastAPI", "LangChain", "RAG", "PostgreSQL", "Redis", "Docker", "Playwright"].map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, delay: 0.75 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TechBadge t={t} />
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}>
            <div className="glass rounded-3xl overflow-hidden relative">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/70 to-transparent" />
              <ErrorBoundary>
                <Hero3D />
              </ErrorBoundary>
              <div className="flex items-center justify-between px-5 py-3 border-t border-zinc-200 font-mono text-[11px] text-zinc-500">
                <span>● agent.mesh — live</span>
                <span>60fps · webgl</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4" initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}>
          {profile.hero_metrics.map((m) => (
            <motion.div
              key={m.label}
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } } }}
            >
              <div className="glass card-hover rounded-2xl p-5 relative overflow-hidden h-full">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/60 to-transparent" />
                <p className="text-xl md:text-2xl font-bold text-gradient font-mono">{m.value}</p>
                <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">{m.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Marquee items={["Agentic AI", "Enterprise RAG", "FastAPI", "pgvector/HNSW", "Playwright automation", "PostgreSQL + Redis", "Docker + AWS EC2", "LangChain"]} />

      <section className="mx-auto max-w-[1440px] px-6 lg:px-8 py-16">
        <SectionHeading
          kicker="Flagship · Payoo"
          title="Merchant multi-agent validation"
          desc="Production-oriented workflow that cut merchant assessment from hours to minutes. Bento: impact, architecture, evidence."
          action={<Link href="/projects/merchant-multi-agent" className="text-sm text-neon hover:underline flex items-center gap-1">Case study <ArrowUpRight size={15} /></Link>}
        />
        <div className="mt-8 grid lg:grid-cols-3 gap-4">
          <Reveal>
            <div className="glass rounded-2xl p-6 h-full relative overflow-hidden">
              <div className="orb h-40 w-40 bg-neon/30 -top-10 -right-10" />
              <p className="font-mono text-[11px] text-zinc-500">IMPACT</p>
              <p className="text-4xl font-bold text-gradient mt-2 font-mono">~8× faster</p>
              <p className="text-sm text-zinc-600 mt-2">2–3 hours → 15–20 minutes per merchant via parallel evidence agents + structured cross-checks.</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["4 parallel agents", "Async ARQ", "Fallback-safe"].map((t) => <TechBadge key={t} t={t} />)}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="glass rounded-2xl p-6 h-full lg:col-span-2">
              <p className="font-mono text-[11px] text-zinc-500">SYSTEM ARCHITECTURE</p>
              <div className="mt-3">
                <Pipeline steps={projects[0].architecture} />
              </div>
              <div className="mt-5 grid sm:grid-cols-3 gap-3 text-sm">
                {[
                  ["Website agent", "Playwright crawl + LLM extraction"],
                  ["Registry + Social", "Search APIs + verification"],
                  ["Trust synthesis", "Grounded report + score"],
                ].map(([t, d]) => (
                  <div key={t} className="bg-white border border-zinc-200 shadow-sm rounded-xl p-4">
                    <p className="font-semibold text-[13px]">{t}</p>
                    <p className="text-xs text-zinc-600 mt-1">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <div className="mt-4 grid md:grid-cols-3 gap-4">
          {initiatives.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.07}>
              <div className="glass card-hover rounded-2xl p-5">
                <c.icon size={20} className="text-neon" />
                <p className="font-semibold text-sm mt-3">{c.t}</p>
                <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 lg:px-8 py-6">
        <SectionHeading
          kicker="Selected systems"
          title="Projects with receipts"
          desc="Each system: problem → architecture → engineering. No todo-apps."
          action={<Link href="/projects" className="text-sm text-neon hover:underline flex items-center gap-1">All projects <ArrowUpRight size={15} /></Link>}
        />
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.07}>
              <Link href={`/projects/${p.slug}`} className="glass card-hover rounded-2xl overflow-hidden block h-full">
                <div className="relative">
                  <img src={p.image} alt={p.title} className="h-44 w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-mono font-bold uppercase bg-black/60 backdrop-blur px-2.5 py-1 rounded-full border border-neon/30 text-neon">{p.status}</span>
                  <span className="absolute bottom-3 left-4 right-4 font-mono text-[11px] text-emerald-300">◈ {p.metric}</span>
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">{p.org} · {p.category}</p>
                  <h3 className="font-bold mt-1 leading-snug">{p.title}</h3>
                  <p className="text-[13px] text-zinc-600 mt-2 line-clamp-2 leading-relaxed">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">{p.tech.slice(0, 4).map((t) => <TechBadge key={t} t={t} />)}</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 lg:px-8 py-16">
        <SectionHeading kicker="Production stack" title="Backend-grade AI engineering" action={<Link href="/skills" className="text-sm text-neon hover:underline flex items-center gap-1">Full matrix <ArrowUpRight size={15} /></Link>} />
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            { icon: Cpu, t: "AI / Retrieval", d: "LLMs, RAG, agents, LangChain, embeddings, pgvector/HNSW, grounded generation." },
            { icon: Database, t: "Backend / Data", d: "FastAPI, REST, WebSockets, PostgreSQL, Redis/ARQ, SQLAlchemy, NestJS, Socket.IO." },
            { icon: Cloud, t: "Automation / Cloud", d: "Playwright, Docker Compose, AWS EC2, Git, Linux — ship + operate." },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.07}>
              <div className="glass card-hover rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-magenta/60 to-transparent" />
                <c.icon className="text-neon" size={22} />
                <h3 className="font-bold mt-3">{c.t}</h3>
                <p className="text-[13px] text-zinc-600 mt-2 leading-relaxed">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="glass rounded-2xl p-6 mt-4 grid md:grid-cols-[1fr_1.4fr] gap-6 items-center">
            <div>
              <p className="font-mono text-[11px] text-zinc-500">EDUCATION</p>
              <p className="font-bold mt-1">{education.degree}</p>
              <p className="text-sm text-neon">{education.school}</p>
              <p className="text-xs text-zinc-500 mt-1 font-mono">{education.period}</p>
              <p className="text-xs text-zinc-600 mt-2">{education.languages} · {education.certs[0]}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {education.coursework.map((c) => <TechBadge key={c} t={c} />)}
              <span className="text-xs text-zinc-500 px-2 py-1">+ {experience[0].company} internship → <Link href="/experience" className="text-neon hover:underline">journey</Link></span>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 lg:px-8 pb-4">
        <Reveal>
          <div className="glass rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="orb h-56 w-56 bg-neon/30 -top-10 left-1/4" />
            <div className="orb h-56 w-56 bg-magenta/25 bottom-0 right-1/4" />
            <p className="font-mono text-xs text-neon">~/hire</p>
            <h3 className="text-2xl md:text-4xl font-bold mt-2">Need AI that survives production?</h3>
            <p className="text-zinc-600 mt-2 text-sm md:text-base">Agents, RAG, FastAPI backends — designed for latency, fallbacks & operability.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href={`mailto:${profile.email}`} className="rounded-xl bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-neon transition">
                Get In Touch
              </a>
              <Link href="/projects/merchant-multi-agent" className="glass rounded-xl px-6 py-3 text-sm font-semibold hover:border-neon/50 transition">
                Read flagship case study
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
