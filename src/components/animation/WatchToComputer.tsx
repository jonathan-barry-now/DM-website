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

// 6 Animation frames to simulate the watch exploding and reassembling
const imageUrls = [
  "/Image/act1-watch.png",
  "/Image/explode-1.webp",
  "/Image/explode-2.webp",
  "/Image/explode-3.webp",
  "/Image/explode-4.webp",
  "/Image/act1-watch.png"
];

export function WatchToComputer({ onApplyClick }: WatchToComputerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const bgContainerRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentActIndex, setCurrentActIndex] = useState(0);

  // Preload all animation frames to prevent scroll lag/blinks
  useEffect(() => {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

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
    if (!containerRef.current || !contentWrapperRef.current) return;

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

    // 2. Master GSAP ScrollTrigger Timeline with Pinned Viewport Container (600vh)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 6}`,
        pin: contentWrapperRef.current,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          let activeIndex = 0;
          if (progress < 0.20) {
            activeIndex = 0;
          } else if (progress < 0.80) {
            activeIndex = 1;
          } else if (progress < 0.95) {
            activeIndex = 2;
          } else {
            activeIndex = 3;
          }
          setCurrentActIndex(activeIndex);
        },
      },
    });

    // --- Background Image Controls (Parallax drift on parent) ---
    tl.to(bgContainerRef.current, {
      yPercent: -10,
      ease: "none",
      duration: 5.0,
    }, 0);

    // --- Frame-by-frame Ken Burns Zoom Scales ---
    tl.fromTo(imgRefs.current[0], { scale: 1.0 }, { scale: 1.08, ease: "none", duration: 1.0 }, 0);
    tl.fromTo(imgRefs.current[1], { scale: 1.0 }, { scale: 1.08, ease: "none", duration: 1.0 }, 1.0);
    tl.fromTo(imgRefs.current[2], { scale: 1.0 }, { scale: 1.08, ease: "none", duration: 1.0 }, 2.0);
    tl.fromTo(imgRefs.current[3], { scale: 1.0 }, { scale: 1.08, ease: "none", duration: 1.0 }, 3.0);
    tl.fromTo(imgRefs.current[4], { scale: 1.0 }, { scale: 1.08, ease: "none", duration: 1.0 }, 4.0);
    tl.fromTo(imgRefs.current[5], { scale: 1.0 }, { scale: 1.08, ease: "none", duration: 1.0 }, 5.0);

    // --- Background Image Opacity Crossfades ---
    // Frame 0 to 1 Crossfade (occurs around scroll 20%)
    tl.to(imgRefs.current[0], { opacity: 0, duration: 0.4, ease: "power1.inOut" }, 0.8)
      .to(imgRefs.current[1], { opacity: 1, duration: 0.4, ease: "power1.inOut" }, 0.8);

    // Frame 1 to 2 Crossfade (occurs around scroll 40%)
    tl.to(imgRefs.current[1], { opacity: 0, duration: 0.4, ease: "power1.inOut" }, 1.8)
      .to(imgRefs.current[2], { opacity: 1, duration: 0.4, ease: "power1.inOut" }, 1.8);

    // Frame 2 to 3 Crossfade (occurs around scroll 60%)
    tl.to(imgRefs.current[2], { opacity: 0, duration: 0.4, ease: "power1.inOut" }, 2.8)
      .to(imgRefs.current[3], { opacity: 1, duration: 0.4, ease: "power1.inOut" }, 2.8);

    // Frame 3 to 4 Crossfade (occurs around scroll 80%)
    tl.to(imgRefs.current[3], { opacity: 0, duration: 0.4, ease: "power1.inOut" }, 3.8)
      .to(imgRefs.current[4], { opacity: 1, duration: 0.4, ease: "power1.inOut" }, 3.8);

    // Frame 4 to 5 Crossfade (occurs around scroll 100%)
    tl.to(imgRefs.current[4], { opacity: 0, duration: 0.2, ease: "power1.inOut" }, 4.8)
      .to(imgRefs.current[5], { opacity: 1, duration: 0.2, ease: "power1.inOut" }, 4.8);

    // --- Staggered Text Panel Reveals ---
    // Act I Text Out (around scroll 20%)
    tl.to(".text-act-1", { opacity: 0, y: -40, duration: 0.3, ease: "power1.inOut" }, 0.8);

    // Act II Text In (around scroll 20% to 80%)
    tl.fromTo(".label-act-2", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.0)
      .fromTo(".headline-act-2", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 1.0)
      .fromTo(".sub-act-2", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.3)
      // Act II Text Out
      .to(".text-act-2", { opacity: 0, y: -40, duration: 0.3, ease: "power1.inOut" }, 3.8);

    // Act III Text In (around scroll 80% to 95%)
    tl.fromTo(".label-act-3", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 4.0)
      .fromTo(".headline-act-3", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 4.0)
      .fromTo(".sub-act-3", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 4.3)
      // Act III Text Out
      .to(".text-act-3", { opacity: 0, y: -40, duration: 0.2, ease: "power1.inOut" }, 4.7);

    // Act IV Text In (around scroll 95% to 100%)
    tl.fromTo(".label-act-4", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 4.9)
      .fromTo(".headline-act-4", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 4.9)
      .fromTo(".sub-act-4", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 5.2);

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
      offset = 2.4 * window.innerHeight;
    } else if (index === 2) {
      offset = 5.1 * window.innerHeight;
    } else if (index === 3) {
      offset = 6.0 * window.innerHeight;
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
    <div ref={containerRef} className="relative bg-[#050A14] text-white overflow-hidden min-h-screen">
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

      {/* Pinned Content Wrapper */}
      {!isLoading && (
        <div 
          ref={contentWrapperRef}
          className="w-full h-screen relative flex items-center justify-start overflow-hidden bg-[#050A14] z-10"
        >
          {/* Stack of absolute images */}
          <div 
            ref={bgContainerRef}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[75vh] flex items-center justify-center pointer-events-none z-0"
          >
            {imageUrls.map((url, index) => (
              <div
                key={index}
                ref={(el) => { imgRefs.current[index] = el; }}
                className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('${url}')`,
                  opacity: index === 0 ? 1 : 0
                }}
              />
            ))}
            {/* Dark overlay so text remains readable */}
            <div className="absolute inset-0 bg-[#050A14]/30 z-10 pointer-events-none" />
          </div>

          {/* Text Overlays on the Left side */}
          <div className="container mx-auto px-6 max-w-7xl relative z-10 w-full">
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

                {/* Act IV / CTA Text Panel */}
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
