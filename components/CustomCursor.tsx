"use client";
import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const dot = document.createElement("div");
    dot.style.cssText = "position:fixed;width:8px;height:8px;border-radius:50%;background:#22d3ee;pointer-events:none;z-index:100;mix-blend-mode:screen;transition:transform .12s";
    const ring = document.createElement("div");
    ring.style.cssText = "position:fixed;width:32px;height:32px;border-radius:50%;border:1px solid rgba(34,211,238,.6);pointer-events:none;z-index:100;transition:transform .25s, width .25s, height .25s";
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    const move = (e: MouseEvent) => {
      dot.style.transform = `translate(${e.clientX - 4}px,${e.clientY - 4}px)`;
      ring.style.transform = `translate(${e.clientX - 16}px,${e.clientY - 16}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => { window.removeEventListener("mousemove", move); dot.remove(); ring.remove(); };
  }, []);
  return null;
}
