"use client";

export default function PrintButton() {
  return (
    <button onClick={() => window.print()} className="rounded-xl bg-white text-black px-5 py-2.5 text-sm font-semibold hover:bg-neon print:hidden">
      Print / Save PDF
    </button>
  );
}
