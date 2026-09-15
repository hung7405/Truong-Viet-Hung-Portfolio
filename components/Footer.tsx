import Link from "next/link";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { profile, nav } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20 bg-white/[0.01]">
      <div className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-[1.4fr_1fr_1fr] gap-8">
        <div>
          <p className="font-mono text-xs text-neon">$ whoami</p>
          <p className="font-bold text-lg mt-1">{profile.name} — {profile.role}</p>
          <p className="text-zinc-400 text-sm mt-2 leading-relaxed">{profile.tagline}</p>
          <div className="flex gap-2.5 mt-4">
            <a href={profile.github} aria-label="GitHub" className="glass p-2.5 rounded-lg hover:text-neon hover:border-neon/40 transition"><Github size={17} /></a>
            <a href={profile.linkedin} aria-label="LinkedIn" className="glass p-2.5 rounded-lg hover:text-neon hover:border-neon/40 transition"><Linkedin size={17} /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className="glass p-2.5 rounded-lg hover:text-neon hover:border-neon/40 transition"><Mail size={17} /></a>
          </div>
        </div>
        <div>
          <p className="font-mono text-xs text-zinc-500 mb-3">~/sitemap</p>
          <div className="grid grid-cols-2 gap-2 text-sm text-zinc-400">
            {nav.map((n) => <Link key={n.href} href={n.href} className="hover:text-neon transition">{n.label}</Link>)}
          </div>
        </div>
        <div className="text-sm text-zinc-400">
          <p className="font-mono text-xs text-zinc-500 mb-3">~/contact</p>
          <p className="flex items-center gap-2"><MapPin size={14} className="text-neon" />{profile.location}</p>
          <p className="mt-1.5 break-all">{profile.email}</p>
          <p className="mt-1">{profile.phone}</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center font-mono text-[11px] text-zinc-500">
        © 2026 {profile.name} · Next.js 14 · Tailwind · R3F · Deployed on Vercel
      </div>
    </footer>
  );
}
