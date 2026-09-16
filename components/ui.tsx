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
          <h2 className="text-3xl md:text-5xl font-black mt-2 tracking-tight text-zinc-900">{title}</h2>
          {desc && <p className="text-zinc-600 mt-3 max-w-2xl leading-relaxed">{desc}</p>}
        </div>
        {action}
      </div>
    </Reveal>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-zinc-200 bg-zinc-50 py-6 md:py-7">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-zinc-50 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-zinc-50 to-transparent z-10" />
      <div className="flex gap-10 md:gap-14 w-max animate-marquee whitespace-nowrap font-mono text-sm md:text-base font-semibold tracking-widest uppercase text-zinc-900 [animation-duration:42s] hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 md:gap-14">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white border border-zinc-200 text-neon text-xs shadow-sm">✦</span>
            <span>{t}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function TechBadge({ t }: { t: string }) {
  return <span className="text-[11px] font-mono bg-white border border-zinc-200 rounded-full px-3 py-1 text-zinc-700 shadow-sm">{t}</span>;
}

export function MetricCard({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="glass card-hover rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent" />
        <p className="text-xl md:text-2xl font-black text-gradient font-mono">{value}</p>
        <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">{label}</p>
      </div>
    </Reveal>
  );
}

export function Pipeline({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((s, i) => (
        <span key={s} className="flex items-center gap-2">
          <span className="text-[11px] font-mono glass rounded-xl px-3.5 py-2 border-zinc-200 text-zinc-700">{s}</span>
          {i < steps.length - 1 && <span className="text-neon text-xs">→</span>}
        </span>
      ))}
    </div>
  );
}
