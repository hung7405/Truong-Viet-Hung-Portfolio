import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import IntroLoader from "@/components/IntroLoader";

export const metadata: Metadata = {
  title: "Truong Viet Hung — AI Engineer @ Payoo",
  description:
    "Final-year Data Science @ Swinburne × AI Engineer Intern @ Payoo. Multi-agent automation, enterprise RAG, backend systems. 2–3h → 15–20min merchant due-diligence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="noise bg-void text-zinc-100 antialiased">
        <IntroLoader />
        <CustomCursor />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
