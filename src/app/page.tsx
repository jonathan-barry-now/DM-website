"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/landing/Navbar";
import { LeadCaptureModal } from "@/components/landing/LeadCaptureModal";

// Dynamically import the scroll-driven watch-to-computer animation with no SSR
const WatchToComputer = dynamic(
  () => import("@/components/animation/WatchToComputer").then((mod) => mod.WatchToComputer),
  { ssr: false }
);

export default function Home() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-cyan-500/25 selection:text-[#00f0ff]">
      {/* Subtle background noise overlay */}
      <div className="bg-noise pointer-events-none fixed inset-0 z-30 opacity-[0.04] mix-blend-soft-light" />
      
      {/* Navigation Bar */}
      <Navbar onApplyClick={() => setIsApplyModalOpen(true)} />

      {/* Main interactive scroll-driven container */}
      <WatchToComputer onApplyClick={() => setIsApplyModalOpen(true)} />

      {/* Lead Capture Modal Form */}
      <LeadCaptureModal 
        isOpen={isApplyModalOpen} 
        onClose={() => setIsApplyModalOpen(false)} 
      />

      {/* Footer */}
      <footer className="relative z-30 border-t border-zinc-900 bg-black px-6 py-12 text-sm text-zinc-500 font-sans">
        <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img 
              src="/narwal_logo.png" 
              alt="Narwhal Logo" 
              className="h-8 w-8 object-contain filter invert opacity-60" 
              style={{ filter: "invert(1)" }}
            />
            <span className="font-semibold text-white tracking-widest text-xs uppercase font-mono">
              DEAL<span className="text-cyan-400">MACHINE</span>
            </span>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-zinc-400 text-xs italic tracking-wider">
              Swim with the whales. Become a unicorn.
            </p>
            <p className="text-[10px] text-zinc-600 mt-2 font-mono">
              Powered by Future House. © 2026 The Deal Machine Ecosystem.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}