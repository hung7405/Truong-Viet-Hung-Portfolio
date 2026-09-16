import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import IntroLoader from "@/components/IntroLoader";

export const metadata: Metadata = {
  title: "Truong Viet Hung — AI Engineer",
  description:
    "Truong Viet Hung — AI Engineer. Final-year Data Science @ Swinburne. Multi-agent automation, enterprise RAG, backend systems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="noise bg-void text-zinc-900 antialiased">
        <IntroLoader />
        <CustomCursor />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
