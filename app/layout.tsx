import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import IntroLoader from "@/components/IntroLoader";

export const metadata: Metadata = {
  metadataBase: new URL("https://truongviethung.dev"),
  title: {
    default: "Truong Viet Hung — AI Engineer",
    template: "%s — Truong Viet Hung",
  },
  description:
    "Truong Viet Hung — AI Engineer. Final-year Data Science @ Swinburne. Multi-agent automation, enterprise RAG, backend systems.",
  openGraph: {
    type: "website",
    title: "Truong Viet Hung — AI Engineer",
    description: "Multi-agent automation, enterprise RAG and backend systems that survive production.",
    siteName: "Truong Viet Hung Portfolio",
  },
  twitter: { card: "summary_large_image", title: "Truong Viet Hung — AI Engineer" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="noise bg-void text-zinc-900 antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200] focus:bg-zinc-900 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">Skip to content</a>
        <IntroLoader />
        <CustomCursor />
        <Navbar />
        <main id="main" className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
