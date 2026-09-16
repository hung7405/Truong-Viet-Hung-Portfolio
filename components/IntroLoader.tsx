"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroLoader() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("intro-seen");
    if (hasSeen) { setShow(false); return; }
    const t1 = setInterval(() => setProgress((p) => (p >= 100 ? 100 : p + 1)), 34);
    const t2 = setTimeout(() => { setShow(false); sessionStorage.setItem("intro-seen", "1"); }, 3200);
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
          className="fixed inset-0 z-[100] grid place-items-center bg-white px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="orb h-96 w-96 bg-neon/15 -top-20 -left-20" />
            <div className="orb h-80 w-80 bg-violet2/12 top-1/3 right-0" />
            <div className="orb h-64 w-64 bg-magenta/10 bottom-0 left-1/3" />
          </div>

          <motion.div className="relative text-center" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <p className="font-mono text-[11px] tracking-[0.4em] text-zinc-400">PORTFOLIO 2026</p>
            <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-tight text-zinc-900">Truong Viet Hung</h1>
            <p className="mt-3 text-xl md:text-3xl font-bold tracking-tight text-gradient">AI Engineer</p>
            <p className="font-mono text-xs text-zinc-500 mt-4">building intelligent systems</p>

            <div className="mt-10 mx-auto max-w-sm">
              <div className="flex justify-between font-mono text-[11px] text-zinc-500 mb-2">
                <span>loading</span><span>{progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-zinc-100 border border-zinc-200 overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-neon via-violet2 to-magenta" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
