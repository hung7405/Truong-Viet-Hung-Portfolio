"use client";
import { useState } from "react";
import { Mail, MapPin, Phone, Send, Github, Linkedin } from "lucide-react";
import { profile } from "@/lib/data";
import { SectionHeading, Reveal } from "@/components/ui";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="pt-28 mx-auto max-w-[1440px] px-6 lg:px-8 pb-10">
      <SectionHeading kicker="~/contact" title="Let's ship production AI"
        desc="AI Engineer Intern @ Payoo · HCMC. Fastest via email — replies within 24h." />
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <Reveal>
          <div className="space-y-3">
            {[
              { icon: MapPin, l: "location", v: profile.location },
              { icon: Mail, l: "email", v: profile.email },
              { icon: Phone, l: "phone", v: profile.phone },
            ].map((c) => (
              <div key={c.l} className="glass rounded-2xl p-5 flex items-center gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-neon to-violet2 text-void"><c.icon size={17} /></span>
                <div><p className="font-mono text-[11px] text-zinc-500">{c.l}</p><p className="font-semibold text-sm break-all">{c.v}</p></div>
              </div>
            ))}
            <div className="glass rounded-2xl p-5 flex gap-2.5">
              <a href={profile.github} className="glass px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 hover:border-neon/40"><Github size={15} /> hung7405</a>
              <a href={profile.linkedin} className="glass px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 hover:border-neon/40"><Linkedin size={15} /> LinkedIn</a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <form className="glass rounded-2xl p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            {sent ? (
              <div className="text-center py-10">
                <p className="text-4xl">◈</p>
                <p className="font-bold mt-3">Message staged!</p>
                <p className="text-sm text-zinc-400 mt-2">Demo form — email me directly for fastest reply.</p>
                <a href={`mailto:${profile.email}?subject=Hello Hung — collaboration`} className="inline-block mt-4 rounded-xl bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-neon">Open Email App</a>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <input required placeholder="Your name" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-neon/60" />
                  <input required type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-neon/60" />
                </div>
                <input placeholder="Subject — e.g. RAG pilot / agent automation" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-neon/60" />
                <textarea required rows={5} placeholder="What system do you want to build? Scale, data sources, timeline…" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-neon/60" />
                <button className="w-full rounded-xl bg-white text-black font-semibold py-3 text-sm flex items-center justify-center gap-2 hover:bg-neon transition">
                  <Send size={15} /> Send Message
                </button>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </div>
  );
}
