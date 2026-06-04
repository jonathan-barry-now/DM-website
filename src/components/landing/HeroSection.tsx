"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Zap, Sparkles, Layers, Shield, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the 3D Canvas component to prevent server-side rendering issues
const UnderwaterScene = dynamic(
    () => import("./UnderwaterScene"),
    { ssr: false }
);

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Bind scroll progress to this container (height will be 300vh for multi-stage depth scroll)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Panel 1 Transitions (Surface - 0% to 28% scroll progress)
    const opacity1 = useTransform(scrollYProgress, [0, 0.22, 0.28], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.22, 0.28], [0, 0, -45]);
    const scale1 = useTransform(scrollYProgress, [0, 0.22], [1, 0.95]);

    // Panel 2 Transitions (Mid-depth - 35% to 65% scroll progress)
    const opacity2 = useTransform(scrollYProgress, [0.28, 0.35, 0.58, 0.65], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.28, 0.35, 0.58, 0.65], [45, 0, 0, -45]);
    const scale2 = useTransform(scrollYProgress, [0.35, 0.58], [0.95, 1]);

    // Panel 3 Transitions (Abyss - 72% to 100% scroll progress)
    const opacity3 = useTransform(scrollYProgress, [0.65, 0.75, 0.95], [0, 1, 1]);
    const y3 = useTransform(scrollYProgress, [0.65, 0.75, 0.95], [45, 0, 0]);

    // Scroll Down Indicator animation
    const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15, 0.9], [0.8, 0, 0]);

    return (
        <div ref={containerRef} className="relative h-[300vh] bg-slate-950 text-white selection:bg-gold/30">
            {/* Immersive 3D Volumetric Scene Background */}
            <UnderwaterScene />

            {/* Scroll Indicator */}
            <motion.div 
                style={{ opacity: scrollIndicatorOpacity }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-30 pointer-events-none"
            >
                <span className="text-[10px] uppercase font-mono tracking-widest text-gold font-bold">Scroll to Dive</span>
                <ChevronDown className="w-4 h-4 text-gold animate-bounce" />
            </motion.div>

            {/* Sticky Container representing the camera viewport view */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center px-4">
                
                {/* Surface / Panel 1: Welcome & Headline */}
                <motion.div
                    style={{ opacity: opacity1, y: y1, scale: scale1, pointerEvents: useTransform(scrollYProgress, p => p > 0.28 ? "none" : "auto") }}
                    className="absolute max-w-4xl mx-auto text-center space-y-8 px-6"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/60 border border-gold/20 text-[10px] font-bold uppercase tracking-wider text-gold backdrop-blur-md">
                        <Sparkles className="w-3.5 h-3.5 animate-pulse" /> The Infrastructure for Capital Operators
                    </div>

                    <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold via-amber-200 to-gold drop-shadow-[0_0_25px_rgba(212,175,55,0.3)]">
                            The Fortune is in <br className="hidden md:block" /> the Follow Up
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-300 leading-relaxed font-light backdrop-blur-[2px]">
                        Replace scattered spreadsheets, fragmented data rooms, and inconsistent follow-ups with a clean, automated system designed to raise capital with precision and credibility.
                    </p>
                </motion.div>


                {/* Mid-Water / Panel 2: Product & Value Prop */}
                <motion.div
                    style={{ opacity: opacity2, y: y2, scale: scale2, pointerEvents: useTransform(scrollYProgress, p => (p < 0.28 || p > 0.65) ? "none" : "auto") }}
                    className="absolute max-w-4xl mx-auto text-center space-y-8 px-6"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/60 border border-blue-500/20 text-[10px] font-bold uppercase tracking-wider text-blue-400 backdrop-blur-md">
                        <Layers className="w-3.5 h-3.5" /> High-Fidelity Pipelines
                    </div>

                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                        Precision CRM for Private Equity
                    </h2>

                    <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-300 leading-relaxed font-light">
                        Designed to align with the visual and tactical requirements of elite operators. DealMachine automates investor follow-ups and unifies data rooms so you can close deals with absolute velocity.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 max-w-3xl mx-auto">
                        <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl text-left backdrop-blur-md">
                            <h4 className="text-sm font-bold text-gold flex items-center gap-1.5 mb-1.5">
                                <Zap className="w-4 h-4" /> Fluid Deal Pipeline
                            </h4>
                            <p className="text-xs text-slate-400">Cash flows smoothly through automated stages from outreach to closing.</p>
                        </div>
                        <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl text-left backdrop-blur-md">
                            <h4 className="text-sm font-bold text-gold flex items-center gap-1.5 mb-1.5">
                                <Sparkles className="w-4 h-4" /> Deep Analytics
                            </h4>
                            <p className="text-xs text-slate-400">Complete transparency into investor actions, document downloads, and click-tracking.</p>
                        </div>
                        <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl text-left backdrop-blur-md">
                            <h4 className="text-sm font-bold text-gold flex items-center gap-1.5 mb-1.5">
                                <Shield className="w-4 h-4" /> Secure Data Rooms
                            </h4>
                            <p className="text-xs text-slate-400">Cold-water document vaults. Protect private offerings with military-grade privacy.</p>
                        </div>
                    </div>
                </motion.div>


                {/* Abyss / Panel 3: Stats & Calls to Action */}
                <motion.div
                    style={{ opacity: opacity3, y: y3, pointerEvents: useTransform(scrollYProgress, p => p < 0.65 ? "none" : "auto") }}
                    className="absolute max-w-4xl mx-auto text-center space-y-8 px-6"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/60 border border-gold/20 text-[10px] font-bold uppercase tracking-wider text-gold backdrop-blur-md">
                        <Sparkles className="w-3.5 h-3.5" /> Founding Cohort Opening
                    </div>

                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                        Unlock the Flow of Capital
                    </h2>

                    <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-300 leading-relaxed font-light">
                        Our partners have raised over $100M using our automated investor relations pipeline. Secure your spot in the founding partner program today.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 md:gap-4 max-w-2xl mx-auto py-6 border-y border-gold/10 bg-slate-950/60 backdrop-blur-md rounded-xl px-4">
                        <div className="text-center">
                            <div className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">200+</div>
                            <div className="text-[9px] md:text-xs text-slate-400 uppercase tracking-widest mt-1 font-semibold">Partners</div>
                        </div>
                        <div className="text-center border-x border-gold/10">
                            <div className="text-2xl md:text-4xl font-extrabold text-gold tracking-tight">$100M+</div>
                            <div className="text-[9px] md:text-xs text-slate-400 uppercase tracking-widest mt-1 font-semibold">Raised</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">20+</div>
                            <div className="text-[9px] md:text-xs text-slate-400 uppercase tracking-widest mt-1 font-semibold">Cities</div>
                        </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                        <a
                            href="#apply"
                            className="group relative flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold via-amber-500 to-gold px-8 text-sm font-bold uppercase tracking-wider text-black transition-all hover:scale-102 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                        >
                            <Zap className="h-4 w-4 fill-current" />
                            Apply as a Founding Partner
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                        <a
                            href="#apply"
                            className="flex h-12 items-center justify-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-8 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-gold/10 hover:border-gold/60"
                        >
                            Get DIY Snapshot
                        </a>
                    </div>
                </motion.div>

            </div>

            {/* Bottom transition border into next section */}
            <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </div>
    );
}
