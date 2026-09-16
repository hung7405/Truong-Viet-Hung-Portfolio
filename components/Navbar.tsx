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
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="glass mt-4 rounded-2xl px-5 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-neon via-violet2 to-magenta text-white">
              <Terminal size={16} />
            </span>
            <span className="leading-tight">
              <span className="block font-black text-[15px] tracking-tight text-zinc-900">{profile.name}</span>
              <span className="block text-[11px] font-mono font-semibold tracking-widest uppercase text-zinc-500">{profile.role}</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => (
              <Link key={n.href} href={n.href}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition ${path === n.href ? "bg-zinc-900 text-white" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"}`}>
                {n.label}
              </Link>
            ))}
            <a href={`mailto:${profile.email}`} className="ml-2 rounded-xl bg-zinc-900 text-white px-5 py-2.5 text-sm font-semibold hover:bg-black transition">
              Hire Me
            </a>
          </nav>
          <button className="md:hidden p-2 text-zinc-700" onClick={() => setOpen(!open)} aria-label="menu">{open ? <X size={20}/> : <Menu size={20}/>}</button>
        </div>
        {open && (
          <div className="glass md:hidden mt-2 rounded-2xl p-2">
            {nav.map((n) => <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-zinc-100 text-sm text-zinc-700">{n.label}</Link>)}
          </div>
        )}
      </div>
    </header>
  );
}
