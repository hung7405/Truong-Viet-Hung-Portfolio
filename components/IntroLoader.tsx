"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroLoader() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("intro-seen");
    if (hasSeen) { setShow(false); return; }
    const t1 = setInterval(() => setProgress((p) => (p >= 100 ? 100 : p + 2)), 22);
    const t2 = setTimeout(() => { setShow(false); sessionStorage.setItem("intro-seen", "1"); }, 1800);
    return () => { clearInterval(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (show) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-void px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="orb h-96 w-96 bg-neon/25 -top-20 -left-20" />
            <div className="orb h-80 w-80 bg-violet2/20 top-1/3 right-0" />
            <div className="orb h-64 w-64 bg-magenta/15 bottom-0 left-1/3" />
          </div>

          <motion.div className="relative text-center" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-mono text-[11px] tracking-[0.35em] text-neon">TRUONG VIET HUNG</p>
            <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
              AI Engineer <span className="text-gradient">@ Payoo</span>
            </h1>
            <p className="font-mono text-xs text-zinc-500 mt-3">initializing systems — multi-agent · rag · backend</p>

            <div className="mt-8 mx-auto max-w-sm">
              <div className="flex justify-between font-mono text-[11px] text-zinc-500 mb-2">
                <span>loading</span><span>{progress}%</span>
              </div>
              <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-neon via-violet2 to-magenta" style={{ width: `${progress}%` }} transition={{ ease: "linear" }} />
              </div>
              <p className="font-mono text-[10px] text-zinc-600 mt-3">Swinburne · HCMC · 2–3h → 15–20min</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
