"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Terminal } from "lucide-react";
import { nav, profile } from "@/lib/data";

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="glass mt-4 rounded-2xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-neon via-violet2 to-magenta text-void">
              <Terminal size={15} />
            </span>
            <span className="leading-tight">
              <span className="block font-bold text-sm">{profile.name}</span>
              <span className="block text-[10px] font-mono text-neon">{profile.role} @ Payoo</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => (
              <Link key={n.href} href={n.href}
                className={`px-3 py-2 rounded-lg text-sm transition ${path === n.href ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}>
                {n.label}
              </Link>
            ))}
            <a href={`mailto:${profile.email}`} className="ml-2 rounded-xl bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-neon transition">
              Hire Me
            </a>
          </nav>
          <button className="md:hidden p-1" onClick={() => setOpen(!open)} aria-label="menu">{open ? <X size={20}/> : <Menu size={20}/>}</button>
        </div>
        {open && (
          <div className="glass md:hidden mt-2 rounded-2xl p-2">
            {nav.map((n) => <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-white/5 text-sm">{n.label}</Link>)}
          </div>
        )}
      </div>
    </header>
  );
}
