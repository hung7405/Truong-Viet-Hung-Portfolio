import Link from "next/link";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { profile, nav } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 mt-20 bg-zinc-50">
      <div className="mx-auto w-full px-6 lg:px-10 xl:px-14 py-12 grid md:grid-cols-[1.4fr_1fr_1fr] gap-8">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-neon font-bold">TRUONG VIET HUNG</p>
          <p className="font-black text-lg mt-1 text-zinc-900">{profile.name} — {profile.role}</p>
          <p className="text-zinc-600 text-sm mt-2 leading-relaxed">{profile.tagline}</p>
          <div className="flex gap-2.5 mt-4">
            <a href={profile.github} aria-label="GitHub" className="glass p-2.5 rounded-xl hover:border-neon/30 transition text-zinc-700"><Github size={17} /></a>
            <a href={profile.linkedin} aria-label="LinkedIn" className="glass p-2.5 rounded-xl hover:border-neon/30 transition text-zinc-700"><Linkedin size={17} /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className="glass p-2.5 rounded-xl hover:border-neon/30 transition text-zinc-700"><Mail size={17} /></a>
          </div>
        </div>
        <div>
          <p className="font-mono text-xs font-bold tracking-widest text-zinc-500 mb-3">SITEMAP</p>
          <div className="grid grid-cols-2 gap-2 text-sm text-zinc-600">
            {nav.map((n) => <Link key={n.href} href={n.href} className="hover:text-zinc-900 transition">{n.label}</Link>)}
          </div>
        </div>
        <div className="text-sm text-zinc-600">
          <p className="font-mono text-xs font-bold tracking-widest text-zinc-500 mb-3">CONTACT</p>
          <p className="flex items-center gap-2"><MapPin size={14} className="text-neon" />{profile.location}</p>
          <p className="mt-1.5 break-all">{profile.email}</p>
          <p className="mt-1">{profile.phone}</p>
        </div>
      </div>
      <div className="border-t border-zinc-200 py-4 text-center font-mono text-[11px] text-zinc-500">
        © 2026 {profile.name} · Next.js 14 · Tailwind · Deployed on Vercel
      </div>
    </footer>
  );
}
