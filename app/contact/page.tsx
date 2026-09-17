"use client";
import { useState } from "react";
import { Mail, MapPin, Phone, Send, Github, Linkedin } from "lucide-react";
import { profile } from "@/lib/data";
import { SectionHeading, Reveal } from "@/components/ui";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
    subject || `Hello Hung — collaboration (from ${name || "portfolio"})`
  )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

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
              <div key={c.l} className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-5 flex items-center gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-zinc-900 text-white"><c.icon size={17} /></span>
                <div><p className="font-mono text-[11px] font-bold tracking-widest text-zinc-500">{c.l}</p><p className="font-semibold text-sm text-zinc-900 break-all">{c.v}</p></div>
              </div>
            ))}
            <div className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-5 flex gap-2.5">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-800 bg-zinc-50 border border-zinc-200 flex items-center gap-2 hover:border-zinc-400 transition"><Github size={15} /> hung7405</a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-800 bg-zinc-50 border border-zinc-200 flex items-center gap-2 hover:border-zinc-400 transition"><Linkedin size={15} /> LinkedIn</a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <form className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); window.location.href = mailto; }}>
            <p className="font-mono text-[11px] font-bold tracking-widest text-zinc-500">COMPOSE — OPENS YOUR EMAIL APP (NO BACKEND YET)</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="ct-name" className="font-mono text-[11px] font-semibold text-zinc-600">Your name</label>
                <input id="ct-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" className="mt-1 w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 outline-none focus:border-zinc-900" />
              </div>
              <div>
                <label htmlFor="ct-email" className="font-mono text-[11px] font-semibold text-zinc-600">Email</label>
                <input id="ct-email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" autoComplete="email" className="mt-1 w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 outline-none focus:border-zinc-900" />
              </div>
            </div>
            <div>
              <label htmlFor="ct-subject" className="font-mono text-[11px] font-semibold text-zinc-600">Subject</label>
              <input id="ct-subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject — e.g. RAG pilot / agent automation" className="mt-1 w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 outline-none focus:border-zinc-900" />
            </div>
            <div>
              <label htmlFor="ct-msg" className="font-mono text-[11px] font-semibold text-zinc-600">Message</label>
              <textarea id="ct-msg" required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What system do you want to build? Scale, data sources, timeline…" className="mt-1 w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 outline-none focus:border-zinc-900" />
            </div>
            <button className="w-full rounded-xl bg-zinc-900 text-white font-semibold py-3 text-sm flex items-center justify-center gap-2 hover:bg-black transition">
              <Send size={15} /> Compose Email
            </button>
            <p className="text-[11px] font-mono text-zinc-500 text-center">No server storage — this opens mailto:{profile.email}</p>
          </form>
        </Reveal>
      </div>
    </div>
  );
}
