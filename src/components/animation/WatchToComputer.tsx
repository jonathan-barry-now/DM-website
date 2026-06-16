"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface WatchToComputerProps {
  onApplyClick?: () => void;
}

export function WatchToComputer({ onApplyClick }: WatchToComputerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const bgContainerRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentActIndex, setCurrentActIndex] = useState(0);

  // Loading Screen simulation
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 4;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
        }, 600);
      }
      setLoadingProgress(progress);
    }, 60);

    return () => clearInterval(interval);
  }, []);

  // GSAP Scroll Trigger & Parallax integration
  useEffect(() => {
    if (isLoading) return;
    if (!containerRef.current) return;

    // 1. Lenis Smooth Scroll Initialization synchronized via GSAP Ticker
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Use GSAP ticker to drive Lenis raf loop
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Sync ScrollTrigger on scroll
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // 2. Master GSAP ScrollTrigger Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;
          let activeIndex = 0;
          if (progress < 0.28) {
            activeIndex = 0;
          } else if (progress < 0.58) {
            activeIndex = 1;
          } else if (progress < 0.82) {
            activeIndex = 2;
          } else {
            activeIndex = 3;
          }
          setCurrentActIndex(activeIndex);
        },
      },
    });

    // --- Background Image Controls (Parallax translateY + Ken Burns scale) ---
    // Act I: yPercent -10 to 10 (0.5x scroll movement) & scale 1.0 to 1.08
    tl.fromTo(img1Ref.current, 
      { scale: 1.0, yPercent: -10 }, 
      { scale: 1.08, yPercent: 10, ease: "none", duration: 1.5 }, 
      0
    );
    
    // Act II: yPercent -10 to 10 & scale 1.0 to 1.08
    tl.fromTo(img2Ref.current, 
      { scale: 1.0, yPercent: -10 }, 
      { scale: 1.08, yPercent: 10, ease: "none", duration: 1.5 }, 
      1.5
    );
    
    // Act III: yPercent -10 to 10 & scale 1.0 to 1.08
    tl.fromTo(img3Ref.current, 
      { scale: 1.0, yPercent: -10 }, 
      { scale: 1.08, yPercent: 10, ease: "none", duration: 1.5 }, 
      3.0
    );

    // --- Background Crossfades ---
    // Act I to Act II crossfade
    tl.to(img1Ref.current, { opacity: 0, duration: 0.8, ease: "power1.inOut" }, 0.4)
      .to(img2Ref.current, { opacity: 1, duration: 0.8, ease: "power1.inOut" }, 0.4);

    // Act II to Act III crossfade
    tl.to(img2Ref.current, { opacity: 0, duration: 0.8, ease: "power1.inOut" }, 1.9)
      .to(img3Ref.current, { opacity: 1, duration: 0.8, ease: "power1.inOut" }, 1.9);

    // Act III to CTA background fade out
    tl.to(img3Ref.current, { opacity: 0, duration: 0.8, ease: "power1.inOut" }, 3.4);

    // --- Text Reveals & Fades ---
    // Act I Text Out
    tl.to(".text-act-1", { opacity: 0, y: -40, duration: 0.6, ease: "power1.inOut" }, 0.4);

    // Act II Text In
    tl.fromTo(".label-act-2", { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.9)
      .fromTo(".headline-act-2", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.9)
      .fromTo(".sub-act-2", { opacity: 0 }, { opacity: 1, duration: 0.4 }, 1.2)
      // Act II Text Out
      .to(".text-act-2", { opacity: 0, y: -40, duration: 0.6, ease: "power1.inOut" }, 1.9);

    // Act III Text In
    tl.fromTo(".label-act-3", { opacity: 0 }, { opacity: 1, duration: 0.4 }, 2.4)
      .fromTo(".headline-act-3", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 2.4)
      .fromTo(".sub-act-3", { opacity: 0 }, { opacity: 1, duration: 0.4 }, 2.7)
      // Act III Text Out
      .to(".text-act-3", { opacity: 0, y: -40, duration: 0.6, ease: "power1.inOut" }, 3.4);

    // Act IV Text In
    tl.fromTo(".label-act-4", { opacity: 0 }, { opacity: 1, duration: 0.4 }, 3.9)
      .fromTo(".headline-act-4", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 3.9)
      .fromTo(".sub-act-4", { opacity: 0 }, { opacity: 1, duration: 0.4 }, 4.2);

    // 3. Intro animation for Act I text when page first loads
    const introTl = gsap.timeline();
    introTl.fromTo(".label-act-1", { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.2 })
           .fromTo(".headline-act-1", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.2)
           .fromTo(".sub-act-1", { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.5);

    // 4. Force a ScrollTrigger calculation refresh to ensure coordinates align
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      clearTimeout(refreshTimeout);
    };
  }, [isLoading]);

  // Jump scroll to Act trigger index based on accurate container metrics
  const scrollToAct = (index: number) => {
    if (!lenisRef.current || !containerRef.current) return;

    const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
    let offset = 0;
    if (index === 1) {
      offset = 1.2 * window.innerHeight;
    } else if (index === 2) {
      offset = 2.3 * window.innerHeight;
    } else if (index === 3) {
      offset = 3.5 * window.innerHeight;
    }

    lenisRef.current.scrollTo(containerTop + offset, { 
      duration: 1.2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
    });
  };

  const handleNextClick = () => {
    if (currentActIndex === 3) {
      scrollToAct(0);
    } else {
      scrollToAct(currentActIndex + 1);
    }
  };

  return (
    <div className="relative bg-black text-white overflow-hidden min-h-screen">
      {/* Loading Calibrator Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-700 pointer-events-auto select-none">
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Spinning/pulsing loader visual */}
            <div className="absolute inset-0 rounded-full border border-[#f3d46b]/20 animate-ping duration-1000"></div>
            <div className="absolute inset-2 rounded-full border border-t-[#f3d46b] border-l-[#f3d46b] animate-spin" style={{ animationDuration: "1.5s" }}></div>
            <div className="absolute inset-4 rounded-full border border-b-[#f3d46b]/30 animate-spin" style={{ animationDuration: "3s" }}></div>
            <div className="font-mono text-[10px] text-[#f3d46b] font-bold tracking-[0.2em]">{loadingProgress}%</div>
          </div>
          <div className="mt-8 space-y-2 text-center">
            <span className="text-[#f3d46b] font-mono text-[11px] font-bold tracking-[0.3em] uppercase block">
              CALIBRATING THE MACHINE...
            </span>
            <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-widest block">
              Initializing WebGL and core narrative arrays
            </span>
          </div>
        </div>
      )}

      {/* Floating Act "NEXT" Navigation Bar */}
      {!isLoading && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-zinc-950/80 border border-zinc-800/80 px-6 py-3 rounded-full backdrop-blur-md shadow-2xl flex items-center gap-6 pointer-events-auto">
          <div className="flex items-center gap-2">
            {["I", "II", "III", "CTA"].map((act, index) => (
              <button
                key={act}
                onClick={() => scrollToAct(index)}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all border ${
                  currentActIndex === index
                    ? "bg-[#f3d46b] text-black border-[#f3d46b]"
                    : "text-zinc-500 hover:text-white border-zinc-800"
                }`}
              >
                {act}
              </button>
            ))}
          </div>
          <div className="h-4 w-[1px] bg-zinc-800" />
          <button
            onClick={handleNextClick}
            className="text-[10px] uppercase font-mono font-extrabold tracking-widest text-[#f3d46b] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            {currentActIndex === 3 ? "TOP" : "NEXT"}
            <span className="text-xs">→</span>
          </button>
        </div>
      )}

      {/* Cinematic Background Images Container */}
      {!isLoading && (
        <div 
          ref={bgContainerRef}
          className="fixed inset-0 w-full h-screen z-0 overflow-hidden pointer-events-none bg-black"
        >
          {/* Act 1 Image */}
          <div 
            ref={img1Ref}
            className="absolute w-full h-[130%] -top-[15%] bg-cover bg-center"
            style={{ 
              backgroundImage: "url('/Image/act1-watch.png')",
              opacity: 1,
              backgroundRepeat: "no-repeat"
            }}
          />
          
          {/* Act 2 Image */}
          <div 
            ref={img2Ref}
            className="absolute w-full h-[130%] -top-[15%] bg-cover bg-center"
            style={{ 
              backgroundImage: "url('/Image/act3-goldwatch.jpg')",
              opacity: 0,
              backgroundRepeat: "no-repeat"
            }}
          />
          
          {/* Act 3 Image */}
          <div 
            ref={img3Ref}
            className="absolute w-full h-[130%] -top-[15%] bg-cover bg-center"
            style={{ 
              backgroundImage: "url('/Image/act2-chip3d.jpg')",
              opacity: 0,
              backgroundRepeat: "no-repeat"
            }}
          />

          {/* Dark overlay so text remains readable */}
          <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
        </div>
      )}

      {/* 5 Scroll Height Sections to drive timeline trigger points */}
      {!isLoading && (
        <div ref={containerRef} className="relative z-10 w-full h-[450vh] pointer-events-none">
          
          {/* Act I Section trigger */}
          <div className="w-full h-screen flex items-center justify-start max-w-7xl mx-auto px-6" />
          
          {/* Act II Section trigger */}
          <div className="w-full h-screen flex items-center justify-start max-w-7xl mx-auto px-6" />

          {/* Act III Section trigger */}
          <div className="w-full h-screen flex items-center justify-start max-w-7xl mx-auto px-6" />

          {/* CTA Section trigger */}
          <div className="w-full h-screen flex items-center justify-center max-w-7xl mx-auto px-6" />
        </div>
      )}

      {/* Fixed Layout Cinematic Text Reveals */}
      {!isLoading && (
        <div className="fixed inset-0 w-full h-screen z-10 pointer-events-none flex items-center justify-start">
          <div className="container mx-auto px-6 max-w-7xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center w-full">
              
              {/* Left Column: text details */}
              <div className="col-span-1 lg:col-span-6 flex flex-col justify-center text-left space-y-6 relative h-[400px]">
                
                {/* Act I Text Panel */}
                <div className="absolute text-act-1 opacity-100 max-w-md pointer-events-auto space-y-4">
                  <span className="label-act-1 opacity-0 text-[10px] uppercase font-mono tracking-[0.25em] text-[#f3d46b] font-bold block">
                    Act I — The Heritage
                  </span>
                  <h1 className="headline-act-1 opacity-0 text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight uppercase font-sans">
                    Now is the time to <br />
                    <span className="text-[#f3d46b]">harness AI</span> for your raise
                  </h1>
                  <p className="sub-act-1 opacity-0 text-zinc-400 text-sm font-light leading-relaxed">
                    Old-world discipline meets next-generation execution. The gold antique watch movement represents the classic relational mechanics of capital raising, fully assembled and ticking.
                  </p>
                </div>

                {/* Act II Text Panel */}
                <div className="absolute text-act-2 opacity-100 max-w-md pointer-events-auto space-y-4">
                  <span className="label-act-2 opacity-0 text-[10px] uppercase font-mono tracking-[0.25em] text-[#f3d46b] font-bold block">
                    Act II — The Disassembly
                  </span>
                  <h2 className="headline-act-2 opacity-0 text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight uppercase font-sans">
                    Deconstruct the <br />
                    <span className="text-[#f3d46b]">Capital Stack</span>
                  </h2>
                  <p className="sub-act-2 opacity-0 text-zinc-400 text-sm font-light leading-relaxed">
                    Timeless structures shatter into functional components. Manual workflows explode to isolate raw relationship signals, secure access nodes, and authority builders.
                  </p>
                </div>

                {/* Act III Text Panel */}
                <div className="absolute text-act-3 opacity-100 max-w-md pointer-events-auto space-y-4">
                  <span className="label-act-3 opacity-0 text-[10px] uppercase font-mono tracking-[0.25em] text-[#f3d46b] font-bold block">
                    Act III — The Synthesis
                  </span>
                  <h2 className="headline-act-3 opacity-0 text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight uppercase font-sans">
                    The Quantum <br />
                    <span className="text-[#f3d46b]">Engine Assembles</span>
                  </h2>
                  <p className="sub-act-3 opacity-0 text-zinc-400 text-sm font-light leading-relaxed">
                    Those same components reassemble into a high-density, cryogenic quantum computer stack. Your raise is now powered by automated, interconnected momentum.
                  </p>
                </div>

                {/* Act IV / CTA Text Panel (Centered layout override when active) */}
                <div className="absolute text-act-4 opacity-100 w-full max-w-xl left-1/2 -translate-x-1/2 text-center pointer-events-auto space-y-6">
                  <span className="label-act-4 opacity-0 text-[10px] uppercase font-mono tracking-[0.25em] text-[#f3d46b] font-bold block">
                    Act IV — Infinite Scaling
                  </span>
                  <h2 className="headline-act-4 opacity-0 text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight uppercase font-sans">
                    CALIBRATE YOUR <br />
                    <span className="text-[#f3d46b]">CAPITAL PIPELINE</span>
                  </h2>
                  <p className="sub-act-4 opacity-0 text-zinc-400 text-sm font-light leading-relaxed max-w-md mx-auto">
                    Generate an interactive, high-density 12-month Investor Relations and narrative campaign strategy calibrated for your traction, stage, and goals.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={onApplyClick}
                      className="inline-flex h-14 items-center justify-center rounded-xl bg-gradient-to-r from-[#f3d46b] to-[#fff1a6] px-10 text-xs font-black uppercase tracking-[0.2em] text-black transition-all hover:scale-105 hover:shadow-[0_0_35px_rgba(243,212,107,0.4)] cursor-pointer font-sans"
                    >
                      Get Your Free 12 Month Strategy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
