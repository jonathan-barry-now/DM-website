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
      <Navbar />

      {/* Main interactive scroll-driven container */}
      <WatchToComputer onApplyClick={() => setIsApplyModalOpen(true)} />

      {/* Strategy CTA Section */}
      <section className="relative z-30 py-24 bg-[#050505] border-t border-zinc-900 overflow-hidden flex items-center justify-center">
        {/* Glow effects */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none -z-10" 
          style={{ background: "radial-gradient(circle, rgba(243,212,107,0.06) 0%, transparent 70%)" }}
        />
        
        <div className="container mx-auto px-6 max-w-4xl text-center space-y-6">
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#f3d46b] font-bold">
            Interactive IR Roadmap
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-sans">
            Ready to scale your capital pipeline?
          </h2>
          <p className="max-w-xl mx-auto text-zinc-400 text-sm font-light leading-relaxed font-sans">
            Generate an interactive, high-density 12-month Investor Relations and narrative campaign strategy calibrated specifically for your organization's traction, stage, and goals.
          </p>
          <div className="pt-4">
            <button
              onClick={() => setIsApplyModalOpen(true)}
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#f3d46b] bg-black/40 px-8 text-xs font-bold uppercase tracking-[0.18em] text-[#f3d46b] transition-all hover:bg-[#f3d46b] hover:text-black hover:shadow-[0_0_25px_rgba(243,212,107,0.25)] cursor-pointer font-sans"
            >
              Get Your Free 12 Month Strategy
            </button>
          </div>
        </div>
      </section>

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