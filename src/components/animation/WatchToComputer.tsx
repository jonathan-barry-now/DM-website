"use client";

import React, { useEffect, useRef, useState } from "react";
import partsData from "@/data/parts-manifest.json";

interface Part {
  id: string;
  cluster: string;
  watchRole: string;
  computerRole: string;
  transition: string;
  visibleInActI: boolean;
  watchPosition: { x: number; y: number; rotate: number };
  computerPosition: { x: number; y: number; rotate: number };
  watchSize: { w: number; h: number };
  computerSize: { w: number; h: number };
  notes: string;
}

const parts = partsData as Part[];

// Connections mapping for Act II dynamic network connector lines
const connections = [
  { from: "gear-center", to: "gear-third" },
  { from: "gear-center", to: "gear-fourth" },
  { from: "gear-center", to: "gear-escape" },
  { from: "gear-center", to: "gear-balance" },
  { from: "gear-third", to: "jewel-1" },
  { from: "gear-fourth", to: "jewel-2" },
  { from: "face-dial", to: "numeral-XII" },
  { from: "face-dial", to: "numeral-III" },
  { from: "face-dial", to: "numeral-VI" },
  { from: "face-dial", to: "numeral-IX" },
  { from: "face-dial", to: "hand-hour" },
  { from: "face-dial", to: "hand-minute" },
  { from: "face-dial", to: "hand-second" },
  { from: "bezel-outer", to: "bezel-inner" },
  { from: "bezel-outer", to: "crystal" },
  { from: "case-outer", to: "case-back" },
  { from: "case-outer", to: "lug-1" },
  { from: "case-outer", to: "lug-2" },
  { from: "case-outer", to: "lug-3" },
  { from: "case-outer", to: "lug-4" }
];

interface WatchToComputerProps {
  onApplyClick?: () => void;
}

export function WatchToComputer({ onApplyClick }: WatchToComputerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeAct, setActiveAct] = useState<"I" | "II" | "III">("I");
  const [tickRotation, setTickRotation] = useState(0);

  // References to keep state available in event listeners
  const lastProgressRef = useRef(0);
  const animeTimelineRef = useRef<any>(null);

  // Mechanical ticking second hand simulation during Act I (0 - 33%)
  useEffect(() => {
    const interval = setInterval(() => {
      if (lastProgressRef.current < 0.33) {
        setTickRotation((prev) => prev + 6); // 6 degrees = 1 second mechanical jump
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize anime.js on scroll-linked timeline
  useEffect(() => {
    let active = true;

    async function initAnime() {
      const animeModule = await import("animejs");
      const anime = ((animeModule as any).default || animeModule) as any;
      const { createTimeline } = anime;
      if (!active) return;

      const isMobile = typeof window !== 'undefined' ? window.innerWidth < 1024 : false;
      const explosionScale = isMobile ? 0.45 : 1.0;

      // Centered, viewport-safe, and dynamic explosive positioning helper
      function getExplodedPosition(part: Part, index: number) {
        let x = part.watchPosition.x * (1.2 + 0.6 * explosionScale);
        let y = part.watchPosition.y * (1.2 + 0.6 * explosionScale);
        
        const angle = (index / parts.length) * Math.PI * 2;
        x += Math.cos(angle) * (140 + 120 * explosionScale);
        y += Math.sin(angle) * (140 + 120 * explosionScale);
        
        const seed = part.id.charCodeAt(0) + part.id.charCodeAt(part.id.length - 1);
        const randomX = Math.sin(seed) * (30 + 30 * explosionScale);
        const randomY = Math.cos(seed) * (30 + 30 * explosionScale);
        x += randomX;
        y += randomY;
        
        return { x, y };
      }

      console.log("Diagnostics - DOM Elements Found:", {
        totalParts: parts.length,
        foundCount: parts.filter(p => !!document.querySelector(`#part-wrap-${p.id}`)).length,
        gearCenterFound: !!document.querySelector("#part-wrap-gear-center")
      });

      // Create a master timeline that doesn't autoplay
      const tl = createTimeline({
        autoplay: false,
        easing: "linear",
        duration: 1000 // Timeline represents 0 to 1000 progress units
      });

      // Orchestrate animations for all 26 components
      parts.forEach((part, index) => {
        const wrapperSelector = `#part-wrap-${part.id}`;
        const watchShapeSelector = `#part-wrap-${part.id} .shape-watch`;
        const computerShapeSelector = `#part-wrap-${part.id} .shape-computer`;

        const { x: explodeX, y: explodeY } = getExplodedPosition(part, index);

        // Add coordinate transforms, scaling, and dimensions to timeline (with explicit units where required)
        tl.add(wrapperSelector, {
          translateX: [
            { to: `${part.watchPosition.x}px`, duration: 330 },
            { to: `${explodeX}px`, duration: 120 },
            { to: `${explodeX}px`, duration: 100 },
            { to: `${part.computerPosition.x}px`, duration: 200, easing: "easeOutElastic(1, 0.75)" },
            { to: `${part.computerPosition.x}px`, duration: 250 }
          ],
          translateY: [
            { to: `${part.watchPosition.y}px`, duration: 330 },
            { to: `${explodeY}px`, duration: 120 },
            { to: `${explodeY}px`, duration: 100 },
            { to: `${part.computerPosition.y}px`, duration: 200, easing: "easeOutElastic(1, 0.75)" },
            { to: `${part.computerPosition.y}px`, duration: 250 }
          ],
          width: [
            { to: `${part.watchSize.w}px`, duration: 330 },
            { to: `${part.watchSize.w * 1.15}px`, duration: 120 }, // swell slightly during explode
            { to: `${part.watchSize.w * 1.15}px`, duration: 100 },
            { to: `${part.computerSize.w}px`, duration: 200, easing: "easeOutElastic(1, 0.75)" },
            { to: `${part.computerSize.w}px`, duration: 250 }
          ],
          height: [
            { to: `${part.watchSize.h}px`, duration: 330 },
            { to: `${part.watchSize.h * 1.15}px`, duration: 120 },
            { to: `${part.watchSize.h * 1.15}px`, duration: 100 },
            { to: `${part.computerSize.h}px`, duration: 200, easing: "easeOutElastic(1, 0.75)" },
            { to: `${part.computerSize.h}px`, duration: 250 }
          ],
          rotate: [
            { to: part.watchPosition.rotate, duration: 330 },
            { to: part.watchPosition.rotate + 180 + (index * 12), duration: 120 },
            { to: part.watchPosition.rotate + 180 + (index * 12), duration: 100 },
            { to: part.computerPosition.rotate, duration: 200, easing: "easeOutElastic(1, 0.75)" },
            { to: part.computerPosition.rotate, duration: 250 }
          ],
          scale: [
            { to: 1.0, duration: 330 },
            { to: 1.25, duration: 120 },
            { to: 1.25, duration: 100 },
            { to: 1.0, duration: 200, easing: "easeOutElastic(1, 0.75)" },
            { to: 1.0, duration: 250 }
          ],
          // Animate custom color properties from Gold (#d4af37) to Cyan (#00f0ff)
          "--part-color": [
            { to: "#f3d46b", duration: 450 },
            { to: "#00f0ff", duration: 100 },
            { to: "#00f0ff", duration: 450 }
          ],
          // Keep all parts visible throughout the sequence
          opacity: [
            { to: 1.0, duration: 330 },
            { to: 1.0, duration: 120 },
            { to: 1.0, duration: 100 },
            { to: 1.0, duration: 200 },
            { to: 1.0, duration: 250 }
          ]
        }, 0);

        // Crossfade shape opacities: watch shape vs computer shape (morphed from 450 to 550)
        tl.add(watchShapeSelector, {
          opacity: [
            { to: 1.0, duration: 450 },
            { to: 0.0, duration: 100 },
            { to: 0.0, duration: 450 }
          ]
        }, 0);

        tl.add(computerShapeSelector, {
          opacity: [
            { to: 0.0, duration: 450 },
            { to: 1.0, duration: 100 },
            { to: 1.0, duration: 450 }
          ]
        }, 0);
      });

      // Animate dynamic connector lines (using unitless SVG attributes matched to explosive coordinates)
      connections.forEach((conn, index) => {
        const lineEl = `#conn-line-${index}`;
        const partA = parts.find((p) => p.id === conn.from);
        const partB = parts.find((p) => p.id === conn.to);
        if (!partA || !partB) return;

        const partAIdx = parts.findIndex((p) => p.id === conn.from);
        const partBIdx = parts.findIndex((p) => p.id === conn.to);

        const { x: expAx, y: expAy } = getExplodedPosition(partA, partAIdx);
        const { x: expBx, y: expBy } = getExplodedPosition(partB, partBIdx);

        tl.add(lineEl, {
          x1: [
            { to: partA.watchPosition.x, duration: 330 },
            { to: expAx, duration: 120 },
            { to: expAx, duration: 100 },
            { to: partA.computerPosition.x, duration: 200, easing: "easeOutElastic(1, 0.75)" },
            { to: partA.computerPosition.x, duration: 250 }
          ],
          y1: [
            { to: partA.watchPosition.y, duration: 330 },
            { to: expAy, duration: 120 },
            { to: expAy, duration: 100 },
            { to: partA.computerPosition.y, duration: 200, easing: "easeOutElastic(1, 0.75)" },
            { to: partA.computerPosition.y, duration: 250 }
          ],
          x2: [
            { to: partB.watchPosition.x, duration: 330 },
            { to: expBx, duration: 120 },
            { to: expBx, duration: 100 },
            { to: partB.computerPosition.x, duration: 200, easing: "easeOutElastic(1, 0.75)" },
            { to: partB.computerPosition.x, duration: 250 }
          ],
          y2: [
            { to: partB.watchPosition.y, duration: 330 },
            { to: expBy, duration: 120 },
            { to: expBy, duration: 100 },
            { to: partB.computerPosition.y, duration: 200, easing: "easeOutElastic(1, 0.75)" },
            { to: partB.computerPosition.y, duration: 250 }
          ],
          opacity: [
            { to: 0.0, duration: 330 },
            { to: 0.75, duration: 120 },
            { to: 0.75, duration: 100 },
            { to: 0.25, duration: 200 },
            { to: 0.25, duration: 250 }
          ],
          stroke: [
            { to: "#f3d46b", duration: 450 },
            { to: "#00f0ff", duration: 100 },
            { to: "#00f0ff", duration: 450 }
          ]
        }, 0);
      });

      animeTimelineRef.current = tl;

      // Fire initial sync
      handleScroll();
    }

    // Scroll Handler linking position to anime timeline
    function handleScroll() {
      if (!containerRef.current || !animeTimelineRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;

      // Calculate relative progress (0 to 1)
      let progress = -rect.top / totalHeight;
      progress = Math.max(0, Math.min(1, progress));

      console.log("Scroll Progress Log:", {
        progress,
        seekTime: progress * 1000,
        timelineDuration: animeTimelineRef.current.duration
      });

      setScrollProgress(progress);
      lastProgressRef.current = progress;

      // Update current act identifier
      if (progress < 0.33) {
        setActiveAct("I");
      } else if (progress < 0.66) {
        setActiveAct("II");
      } else {
        setActiveAct("III");
      }

      // Seek anime timeline
      animeTimelineRef.current.seek(progress * 1000);
    }

    initAnime();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      active = false;
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Dynamic Background Opacities for rich color transitions
  const opacityI = Math.max(0, Math.min(1, (0.45 - scrollProgress) / 0.45));
  const opacityII = scrollProgress < 0.5 
    ? Math.max(0, (scrollProgress - 0.2) / 0.3) 
    : Math.max(0, (0.8 - scrollProgress) / 0.3);
  const opacityIII = Math.max(0, Math.min(1, (scrollProgress - 0.55) / 0.45));

  // Generate initial static CSS styles to prevent hydration mismatch / flash and allow anime.js exclusive DOM control
  const initialStylesCss = `
    ${parts.map(part => `
      #part-wrap-${part.id} {
        width: ${part.watchSize.w}px;
        height: ${part.watchSize.h}px;
        transform: translateX(${part.watchPosition.x}px) translateY(${part.watchPosition.y}px) rotate(${part.watchPosition.rotate}deg) scale(1);
        opacity: 1.0;
      }
    `).join('\n')}
    .shape-watch {
      opacity: 1;
    }
    .shape-computer {
      opacity: 0;
    }
    [id^="conn-line-"] {
      opacity: 0;
    }
  `;

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-black">
      <style dangerouslySetInnerHTML={{ __html: initialStylesCss }} />
      {/* Sticky view frame */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Act I Background Layer (Warm Gold/Amber) */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(218,165,32,0.45)_0%,rgba(15,10,5,1)_75%,rgba(0,0,0,1)_100%)] pointer-events-none -z-10"
          style={{ opacity: opacityI, transition: "opacity 0.1s linear" }}
        />
        {/* Act II Background Layer (Deep Purple) */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(107,33,168,0.38)_0%,rgba(8,4,16,1)_75%,rgba(0,0,0,1)_100%)] pointer-events-none -z-10"
          style={{ opacity: opacityII, transition: "opacity 0.1s linear" }}
        />
        {/* Act III Background Layer (Dark Navy/Cyan) */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,186,212,0.42)_0%,rgba(4,12,20,1)_75%,rgba(0,0,0,1)_100%)] pointer-events-none -z-10"
          style={{ opacity: opacityIII, transition: "opacity 0.1s linear" }}
        />

        {/* Animation & Text Split Grid */}
        <div className="container mx-auto px-6 max-w-7xl h-full w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 pointer-events-none">
          {/* Left spacer for scrolling panel text */}
          <div className="hidden lg:block lg:col-span-5 h-full" />

          {/* Right Column: Animation Canvas */}
          <div className="col-span-1 lg:col-span-7 flex items-center justify-center h-full pointer-events-auto">
            <div 
              ref={canvasRef} 
              className="relative w-[500px] h-[500px] sm:w-[580px] sm:h-[580px] flex items-center justify-center scale-80 xs:scale-95 sm:scale-110 md:scale-120 lg:scale-135 xl:scale-145 transition-transform duration-300 ease-out"
            >
              {/* Soft shifting ambient glow behind the watch/quantum computer */}
              <div 
                className="absolute w-[420px] h-[420px] rounded-full blur-[110px] pointer-events-none -z-10 transition-all duration-700 ease-out"
                style={{
                  background: activeAct === "I" 
                    ? "radial-gradient(circle, rgba(243,212,107,0.22) 0%, rgba(180,120,30,0.04) 60%, transparent 100%)"
                    : activeAct === "II"
                    ? "radial-gradient(circle, rgba(168,85,247,0.18) 0%, rgba(107,33,168,0.04) 60%, transparent 100%)"
                    : "radial-gradient(circle, rgba(6,182,212,0.20) 0%, rgba(8,145,178,0.04) 60%, transparent 100%)"
                }}
              />
              
              {/* SVG Connection Lines Layer (uses pixel coordinates aligned relative to center) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
              >
                <g style={{ transform: 'translate(50%, 50%)' }}>
                  {connections.map((_, idx) => (
                    <line
                      key={idx}
                      id={`conn-line-${idx}`}
                      strokeWidth="1.5"
                      strokeDasharray="4,4"
                      opacity="0"
                    />
                  ))}
                </g>
              </svg>

              {/* Render 26 Manifest Parts */}
              {parts.map((part) => (
                <div
                  key={part.id}
                  id={`part-wrap-${part.id}`}
                  className="absolute left-1/2 top-1/2 z-10 select-none pointer-events-none"
                  style={{
                    zIndex: getZIndex(part.id),
                  }}
                >
                  <div
                    className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center"
                    style={{
                      width: "100%",
                      height: "100%"
                    }}
                  >
                    {/* Watch State Shape - scales dynamically as parent wrapper updates */}
                    <div
                      className="shape-watch absolute inset-0 flex items-center justify-center"
                      style={{
                        color: "var(--part-color, #f3d46b)",
                        transform: part.id === "hand-second" && activeAct === "I" ? `rotate(${tickRotation}deg)` : undefined
                      }}
                    >
                      {getWatchSvg(part.id)}
                    </div>

                    {/* Quantum Computer State Shape - scales dynamically as parent wrapper updates */}
                    <div
                      className="shape-computer absolute inset-0 flex items-center justify-center"
                      style={{
                        color: "var(--part-color, #00f0ff)"
                      }}
                    >
                      {getComputerSvg(part.id)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Text Panels Overlay (fades in and out relative to scroll positions) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="container mx-auto px-6 max-w-7xl h-full grid grid-cols-1 lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-start pt-[15vh]">
            
            {/* Act I Text Card */}
            <div className="min-h-screen flex flex-col justify-start pt-[10vh] pointer-events-auto">
              <div className="bg-black/60 border border-[#f3d46b]/20 p-8 rounded-2xl backdrop-blur-md shadow-xl shadow-black/80 transition-all duration-500 hover:border-[#f3d46b]/40">
                <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#f3d46b] font-bold">Act I — The Heritage</span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight leading-tight font-sans">
                  Now is the time to <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f3d46b] via-[#fff1a6] to-[#f3d46b]">
                    harness AI for your raise
                  </span>
                </h1>
                <p className="text-[#f3d46b] text-sm font-semibold tracking-wider uppercase mt-4 font-mono">
                  Old-world discipline. Next-generation execution.
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed mt-4 font-sans font-light">
                  Timeless precision meets absolute velocity. The gold antique movement represents the classic, relational mechanics of capital raising. Fully assembled, ticking with purpose.
                </p>
                <div className="mt-6 h-1 w-20 bg-gradient-to-r from-[#f3d46b] to-transparent rounded" />
              </div>
            </div>

            {/* Act II Text Card */}
            <div className="min-h-screen flex flex-col justify-start pt-[10vh] pointer-events-auto">
              <div className="bg-black/60 border border-purple-500/20 p-8 rounded-2xl backdrop-blur-md shadow-xl shadow-black/80 transition-all duration-500 hover:border-purple-500/40">
                <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-purple-400 font-bold">Act II — The Disassembly</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-4 tracking-tight leading-tight font-sans">
                  Deconstruct the Capital Stack
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed mt-4 font-sans font-light">
                  Timeless structures shatter into functional components. The old manual processes explode to isolate raw relationship signals, secure access nodes, and authority builders.
                </p>
                
                {/* Features beats */}
                <div className="mt-6 space-y-4">
                  <div className="flex gap-3 items-start">
                    <span className="h-5 w-5 rounded-full border border-purple-500/30 flex items-center justify-center text-[10px] font-mono text-purple-300 bg-purple-950/20 mt-0.5">01</span>
                    <div>
                      <h4 className="text-sm font-bold text-white font-sans">Investor CRM & Capital Pipeline</h4>
                      <p className="text-xs text-zinc-500 font-sans">Every relationship and signal visualised in flow.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="h-5 w-5 rounded-full border border-purple-500/30 flex items-center justify-center text-[10px] font-mono text-purple-300 bg-purple-950/20 mt-0.5">02</span>
                    <div>
                      <h4 className="text-sm font-bold text-white font-sans">Secure Automated Data Room</h4>
                      <p className="text-xs text-zinc-500 font-sans">Tracked document vaults and instant allocator analytics.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="h-5 w-5 rounded-full border border-purple-500/30 flex items-center justify-center text-[10px] font-mono text-purple-300 bg-purple-950/20 mt-0.5">03</span>
                    <div>
                      <h4 className="text-sm font-bold text-white font-sans">Reputation Interview Funnel</h4>
                      <p className="text-xs text-zinc-500 font-sans">Founder authority loops that compound trust systematically.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Act III Text Card */}
            <div className="min-h-screen flex flex-col justify-start pt-[10vh] pb-[15vh] pointer-events-auto">
              <div className="bg-black/60 border border-cyan-500/20 p-8 rounded-2xl backdrop-blur-md shadow-xl shadow-black/80 transition-all duration-500 hover:border-cyan-500/40">
                <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#00f0ff] font-bold">Act III — The Synthesis</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-4 tracking-tight leading-tight font-sans">
                  The Quantum Engine Assembles
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed mt-4 font-sans font-light">
                  Those same components reassemble into a high-density, cryogenic quantum computer stack. Your raise is now powered by automated, interconnected momentum.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mt-6 py-4 border-y border-cyan-950/40 text-center bg-cyan-950/10 rounded-xl px-2 font-mono">
                  <div>
                    <div className="text-lg sm:text-xl font-black text-white">200+</div>
                    <div className="text-[8px] uppercase tracking-wider text-zinc-500 font-bold mt-1">Partners</div>
                  </div>
                  <div className="border-x border-cyan-950/40">
                    <div className="text-lg sm:text-xl font-black text-[#00f0ff]">$100M+</div>
                    <div className="text-[8px] uppercase tracking-wider text-zinc-500 font-bold mt-1">Raised</div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-black text-white">20+</div>
                    <div className="text-[8px] uppercase tracking-wider text-zinc-500 font-bold mt-1">Cities</div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-8">
                  <button
                    onClick={onApplyClick}
                    className="w-full group flex items-center justify-center gap-2 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-[#00f0ff] px-6 text-xs font-black uppercase tracking-[0.15em] text-black transition-all hover:scale-102 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] font-sans cursor-pointer"
                  >
                    Apply to Become a Founding Partner
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// Z-index levels for a clean layered layout in the pocket watch state
function getZIndex(id: string) {
  switch (id) {
    case "case-back":
      return 1;
    case "gear-center":
    case "gear-third":
    case "gear-fourth":
    case "gear-escape":
    case "gear-balance":
    case "mainspring":
    case "jewel-1":
    case "jewel-2":
      return 2;
    case "face-dial":
      return 3;
    case "numeral-XII":
    case "numeral-III":
    case "numeral-VI":
    case "numeral-IX":
      return 4;
    case "hand-hour":
    case "hand-minute":
    case "hand-second":
      return 5;
    case "bezel-inner":
    case "bezel-outer":
    case "crystal":
    case "case-outer":
    case "crown":
    case "lug-1":
    case "lug-2":
    case "lug-3":
    case "lug-4":
      return 6;
    default:
      return 10;
  }
}

// Vector Graphics Definitions for the 26 parts in Watch state
function getWatchSvg(id: string) {
  switch (id) {
    case "gear-center":
      return (
        <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="60" cy="60" r="25" strokeDasharray="3,3" fill="currentColor" fillOpacity="0.05" />
          <circle cx="60" cy="60" r="45" fill="currentColor" fillOpacity="0.08" />
          <line x1="60" y1="15" x2="60" y2="105" />
          <line x1="15" y1="60" x2="105" y2="60" />
          <line x1="28" y1="28" x2="92" y2="92" />
          <line x1="28" y1="92" x2="92" y2="28" />
          <circle cx="60" cy="60" r="50" strokeDasharray="4,4" strokeWidth="3" />
          <circle cx="60" cy="60" r="14" fill="currentColor" />
          <circle cx="60" cy="60" r="6" fill="#000" />
        </svg>
      );
    case "gear-third":
    case "gear-fourth":
    case "gear-escape":
    case "gear-balance":
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="50" cy="50" r="20" fill="currentColor" fillOpacity="0.08" />
          <line x1="50" y1="10" x2="50" y2="90" />
          <line x1="10" y1="50" x2="90" y2="50" />
          <line x1="22" y1="22" x2="78" y2="78" />
          <line x1="22" y1="78" x2="78" y2="22" />
          <circle cx="50" cy="50" r="38" strokeDasharray="3,3" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="8" fill="currentColor" />
          <circle cx="50" cy="50" r="4" fill="#000" />
        </svg>
      );
    case "mainspring":
      return (
        <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="60" cy="60" r="50" fill="currentColor" fillOpacity="0.05" strokeWidth="1.5" />
          <path d="M60 60c15 0 20-15 5-22s-25 5-20 20 30 25 38 0-20-42-45-30-30 45 0 55 55 10 55-45" />
          <circle cx="60" cy="60" r="10" fill="currentColor" />
        </svg>
      );
    case "jewel-1":
    case "jewel-2":
      return (
        <svg className="w-full h-full" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" fill="#f43f5e" opacity="0.95" />
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      );
    case "face-dial":
      return (
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="200" cy="200" r="190" strokeWidth="3" fill="currentColor" fillOpacity="0.03" />
          <circle cx="200" cy="200" r="180" strokeDasharray="2,4" />
          <circle cx="200" cy="200" r="176" fill="currentColor" fillOpacity="0.01" />
          <circle cx="200" cy="200" r="130" strokeOpacity="0.3" />
          <circle cx="200" cy="200" r="90" strokeOpacity="0.3" strokeDasharray="1,4" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 200 + Math.cos(angle) * 165;
            const y1 = 200 + Math.sin(angle) * 165;
            const x2 = 200 + Math.cos(angle) * 175;
            const y2 = 200 + Math.sin(angle) * 175;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={i % 3 === 0 ? 3 : 1.5} />;
          })}
        </svg>
      );
    case "numeral-XII":
      return (
        <svg className="w-full h-full" viewBox="0 0 80 40">
          <text x="40" y="24" dominantBaseline="middle" textAnchor="middle" fill="currentColor" className="font-serif font-black text-2xl select-none">XII</text>
        </svg>
      );
    case "numeral-III":
      return (
        <svg className="w-full h-full" viewBox="0 0 80 40">
          <text x="40" y="24" dominantBaseline="middle" textAnchor="middle" fill="currentColor" className="font-serif font-black text-2xl select-none">III</text>
        </svg>
      );
    case "numeral-VI":
      return (
        <svg className="w-full h-full" viewBox="0 0 80 40">
          <text x="40" y="24" dominantBaseline="middle" textAnchor="middle" fill="currentColor" className="font-serif font-black text-2xl select-none">VI</text>
        </svg>
      );
    case "numeral-IX":
      return (
        <svg className="w-full h-full" viewBox="0 0 80 40">
          <text x="40" y="24" dominantBaseline="middle" textAnchor="middle" fill="currentColor" className="font-serif font-black text-2xl select-none">IX</text>
        </svg>
      );
    case "hand-hour":
      return (
        <svg className="w-full h-full" viewBox="0 0 50 300" fill="none" stroke="currentColor" strokeWidth="2">
          {/* Pivots in the exact center (25, 150) and points upward */}
          <path d="M25 150 L25 80 C25 80, 15 75, 25 55 C35 75, 25 80, 25 80" fill="currentColor" />
          <circle cx="25" cy="150" r="8" fill="currentColor" />
        </svg>
      );
    case "hand-minute":
      return (
        <svg className="w-full h-full" viewBox="0 0 50 300" fill="none" stroke="currentColor" strokeWidth="2">
          {/* Pivots in the exact center (25, 150) and points upward */}
          <path d="M25 150 L25 30 L21 40 M25 30 L29 40" strokeWidth="3" strokeLinecap="round" />
          <circle cx="25" cy="150" r="8" fill="currentColor" />
        </svg>
      );
    case "hand-second":
      return (
        <svg className="w-full h-full" viewBox="0 0 50 300" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Pivots in the exact center (25, 150) and points upward, with counterweight pointing down */}
          <line x1="25" y1="180" x2="25" y2="10" strokeWidth="1.5" />
          <circle cx="25" cy="150" r="4" fill="currentColor" />
        </svg>
      );
    case "bezel-outer":
      return (
        <svg className="w-full h-full" viewBox="0 0 420 420" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="210" cy="210" r="205" strokeWidth="4" fill="currentColor" fillOpacity="0.03" />
          <circle cx="210" cy="210" r="198" strokeDasharray="3,3" />
        </svg>
      );
    case "bezel-inner":
      return (
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="200" cy="200" r="190" fill="currentColor" fillOpacity="0.02" />
        </svg>
      );
    case "crystal":
      return (
        <svg className="w-full h-full opacity-35" viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="200" cy="200" r="185" fill="currentColor" fillOpacity="0.06" />
          <path d="M80 80 L320 320" strokeWidth="2" strokeOpacity="0.25" />
          <path d="M110 80 L320 290" strokeWidth="1.5" strokeOpacity="0.15" />
        </svg>
      );
    case "crown":
      return (
        <svg className="w-full h-full" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="25" y="10" width="30" height="40" rx="4" fill="currentColor" fillOpacity="0.25" />
          <line x1="25" y1="20" x2="55" y2="20" />
          <line x1="25" y1="30" x2="55" y2="30" />
          <line x1="25" y1="40" x2="55" y2="40" />
          {/* Hanger bow */}
          <path d="M15 30 A25 25 0 0 1 65 30" strokeWidth="3" fill="currentColor" fillOpacity="0.05" />
        </svg>
      );
    case "case-outer":
      return (
        <svg className="w-full h-full" viewBox="0 0 450 450" fill="none" stroke="currentColor" strokeWidth="3.5">
          <circle cx="225" cy="225" r="220" fill="currentColor" fillOpacity="0.02" />
          <circle cx="225" cy="225" r="215" strokeOpacity="0.5" strokeWidth="1" />
        </svg>
      );
    case "case-back":
      return (
        <svg className="w-full h-full opacity-90" viewBox="0 0 450 450" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="225" cy="225" r="218" fill="currentColor" fillOpacity="0.08" />
          <path d="M30 225h390M225 30v390" strokeWidth="0.5" strokeDasharray="5,5" opacity="0.3" />
        </svg>
      );
    case "lug-1":
    case "lug-2":
    case "lug-3":
    case "lug-4":
      return (
        <svg className="w-full h-full" viewBox="0 0 60 100" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M10 10 C10 60, 30 80, 50 90" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

// Vector Graphics Definitions for the 26 parts in Quantum Computer state
function getComputerSvg(id: string) {
  switch (id) {
    case "gear-center":
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="15" y="15" width="70" height="70" rx="6" fill="currentColor" fillOpacity="0.1" />
          <rect x="35" y="35" width="30" height="30" fill="currentColor" fillOpacity="0.25" />
          <path d="M35 15V5M65 15V5M35 85v10M65 85v10M15 35H5M15 65H5M85 35h10M85 65h10" strokeLinecap="round" strokeWidth="3" />
        </svg>
      );
    case "gear-third":
    case "gear-fourth":
    case "gear-escape":
    case "gear-balance":
      return (
        <svg className="w-full h-full" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="20" y="20" width="40" height="40" rx="4" fill="currentColor" fillOpacity="0.15" />
          <circle cx="40" cy="40" r="6" />
          <path d="M40 5v15M40 60v15M5 40h15M60 40h15" />
        </svg>
      );
    case "mainspring":
      return (
        <svg className="w-full h-full" viewBox="0 0 40 300" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 0 C10 50, 30 100, 10 150 C10 200, 30 250, 10 300" strokeWidth="3" strokeLinecap="round" />
          <path d="M20 0 C20 50, 40 100, 20 150 C20 200, 40 250, 20 300" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <path d="M30 0 C30 50, 10 100, 30 150 C30 200, 10 250, 30 300" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      );
    case "jewel-1":
    case "jewel-2":
      return (
        <svg className="w-full h-full" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="6" fill="#00f0ff" />
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" className="animate-ping" style={{ animationDuration: "2s" }} />
        </svg>
      );
    case "face-dial":
      return (
        <svg className="w-full h-full" viewBox="0 0 220 20" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="0" y="2" width="220" height="16" rx="4" fill="currentColor" fillOpacity="0.15" />
          <line x1="10" y1="18" x2="210" y2="18" strokeWidth="3" />
        </svg>
      );
    case "numeral-XII":
      return (
        <svg className="w-full h-full" viewBox="0 0 60 25">
          <rect x="2" y="2" width="56" height="21" rx="4" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5" />
          <text x="30" y="14" dominantBaseline="middle" textAnchor="middle" fill="currentColor" className="font-mono font-bold text-[9px] select-none">[Q.12]</text>
        </svg>
      );
    case "numeral-III":
      return (
        <svg className="w-full h-full" viewBox="0 0 60 25">
          <rect x="2" y="2" width="56" height="21" rx="4" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5" />
          <text x="30" y="14" dominantBaseline="middle" textAnchor="middle" fill="currentColor" className="font-mono font-bold text-[9px] select-none">[Q.03]</text>
        </svg>
      );
    case "numeral-VI":
      return (
        <svg className="w-full h-full" viewBox="0 0 60 25">
          <rect x="2" y="2" width="56" height="21" rx="4" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5" />
          <text x="30" y="14" dominantBaseline="middle" textAnchor="middle" fill="currentColor" className="font-mono font-bold text-[9px] select-none">[Q.06]</text>
        </svg>
      );
    case "numeral-IX":
      return (
        <svg className="w-full h-full" viewBox="0 0 60 25">
          <rect x="2" y="2" width="56" height="21" rx="4" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5" />
          <text x="30" y="14" dominantBaseline="middle" textAnchor="middle" fill="currentColor" className="font-mono font-bold text-[9px] select-none">[Q.09]</text>
        </svg>
      );
    case "hand-hour":
    case "hand-minute":
      return (
        <svg className="w-full h-full" viewBox="0 0 20 80" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="10" y1="0" x2="10" y2="80" strokeWidth="3" />
          <circle cx="10" cy="20" r="4.5" fill="currentColor" />
          <circle cx="10" cy="60" r="4.5" fill="currentColor" />
        </svg>
      );
    case "hand-second":
      return (
        <svg className="w-full h-full" viewBox="0 0 16 180" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="8" y1="0" x2="8" y2="180" strokeWidth="3" />
          <path d="M3 170 L8 180 L13 170" fill="currentColor" />
          <circle cx="8" cy="90" r="5" fill="currentColor" />
        </svg>
      );
    case "bezel-outer":
      return (
        <svg className="w-full h-full" viewBox="0 0 280 20" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="0" y="3" width="280" height="14" rx="4" fill="currentColor" fillOpacity="0.18" />
          <line x1="0" y1="10" x2="280" y2="10" />
        </svg>
      );
    case "bezel-inner":
      return (
        <svg className="w-full h-full" viewBox="0 0 260 16" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="0" y="2" width="260" height="12" rx="3" fill="currentColor" fillOpacity="0.1" />
        </svg>
      );
    case "crystal":
      return (
        <svg className="w-full h-full" viewBox="0 0 240 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="0" y="2" width="240" height="12" rx="3" fill="currentColor" fillOpacity="0.1" />
        </svg>
      );
    case "crown":
      return (
        <svg className="w-full h-full" viewBox="0 0 40 60" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="15" width="30" height="30" rx="3" fill="currentColor" fillOpacity="0.05" />
          <path d="M20 15V0M10 30h20" strokeWidth="2" />
          <circle cx="20" cy="5" r="3" fill="currentColor" />
        </svg>
      );
    case "case-outer":
      return (
        <svg className="w-full h-full" viewBox="0 0 180 140" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="4" width="172" height="132" rx="6" fill="currentColor" fillOpacity="0.05" />
          <line x1="45" y1="4" x2="45" y2="136" strokeDasharray="3,3" opacity="0.3" />
          <line x1="90" y1="4" x2="90" y2="136" strokeDasharray="3,3" opacity="0.3" />
          <line x1="135" y1="4" x2="135" y2="136" strokeDasharray="3,3" opacity="0.3" />
        </svg>
      );
    case "case-back":
      return (
        <svg className="w-full h-full" viewBox="0 0 320 20" fill="none" stroke="currentColor" strokeWidth="3">
          <rect x="0" y="2" width="320" height="16" rx="4" fill="currentColor" />
        </svg>
      );
    case "lug-1":
    case "lug-2":
      return (
        <svg className="w-full h-full" viewBox="0 0 10 200" fill="none" stroke="currentColor" strokeWidth="3">
          <line x1="5" y1="0" x2="5" y2="200" />
          <rect x="1" y="20" width="8" height="15" fill="currentColor" />
          <rect x="1" y="160" width="8" height="15" fill="currentColor" />
        </svg>
      );
    case "lug-3":
    case "lug-4":
      return (
        <svg className="w-full h-full" viewBox="0 0 10 140" fill="none" stroke="currentColor" strokeWidth="3">
          <line x1="5" y1="0" x2="5" y2="140" />
          <rect x="1" y="15" width="8" height="12" fill="currentColor" />
          <rect x="1" y="110" width="8" height="12" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}
