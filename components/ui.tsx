"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ kicker, title, desc, action }: { kicker: string; title: string; desc?: string; action?: ReactNode }) {
  return (
    <Reveal>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-neon text-xs font-bold tracking-[0.25em] uppercase flex items-center gap-2">
            <span className="inline-block h-px w-8 bg-neon/60" />{kicker}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 tracking-tight">{title}</h2>
          {desc && <p className="text-zinc-400 mt-3 max-w-2xl leading-relaxed">{desc}</p>}
        </div>
        {action}
      </div>
    </Reveal>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-white/10 py-4 bg-white/[0.02]">
      <div className="flex gap-8 w-max animate-marquee whitespace-nowrap text-sm text-zinc-300">
        {row.map((t, i) => <span key={i} className="flex items-center gap-8"><span className="text-neon">✦</span>{t}</span>)}
      </div>
    </div>
  );
}

export function TechBadge({ t }: { t: string }) {
  return <span className="text-[11px] font-mono bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-zinc-300">{t}</span>;
}

export function MetricCard({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="glass card-hover rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/60 to-transparent" />
        <p className="text-xl md:text-2xl font-bold text-gradient font-mono">{value}</p>
        <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">{label}</p>
      </div>
    </Reveal>
  );
}

export function Pipeline({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((s, i) => (
        <span key={s} className="flex items-center gap-2">
          <span className="text-[11px] font-mono glass rounded-lg px-3 py-2 border-neon/20">{s}</span>
          {i < steps.length - 1 && <span className="text-neon text-xs">→</span>}
        </span>
      ))}
    </div>
  );
}
