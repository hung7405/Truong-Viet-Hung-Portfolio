"use client";
import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dot = document.createElement("div");
    dot.style.cssText = "position:fixed;top:0;left:0;width:8px;height:8px;border-radius:50%;background:#09090b;pointer-events:none;z-index:90;transition:transform .12s";
    const ring = document.createElement("div");
    ring.style.cssText = "position:fixed;top:0;left:0;width:32px;height:32px;border-radius:50%;border:1px solid rgba(9,9,11,.35);pointer-events:none;z-index:90;transition:transform .25s, width .25s, height .25s";
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    const move = (e: MouseEvent) => {
      dot.style.transform = `translate(${e.clientX - 4}px,${e.clientY - 4}px)`;
      ring.style.transform = `translate(${e.clientX - 16}px,${e.clientY - 16}px)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => { window.removeEventListener("mousemove", move); dot.remove(); ring.remove(); };
  }, []);
  return null;
}
