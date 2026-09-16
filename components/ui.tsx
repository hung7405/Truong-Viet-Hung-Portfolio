"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
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
    <div className="overflow-x-auto -mx-1 px-1 pb-1">
      <div className="flex items-center gap-2 min-w-max">
        {steps.map((s, i) => (
          <span key={s} className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-mono bg-white border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-700 shadow-sm whitespace-nowrap leading-tight text-center max-w-[160px]">{s}</span>
            {i < steps.length - 1 && <span className="text-neon text-sm shrink-0">→</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
