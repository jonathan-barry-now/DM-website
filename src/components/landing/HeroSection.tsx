"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroSection() {
    return (
        <section id="hero" className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-black px-4 pt-28 pb-16 text-center">
            {/* Ambient Background Glows - Gold and Dark Blue */}
            <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-dark-blue rounded-full filter blur-3xl opacity-30 animate-blob" />
            <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
            <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-dark-blue/40 rounded-full filter blur-3xl opacity-20" />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)]" />

            <div className="relative z-10 max-w-5xl mx-auto space-y-10">
                {/* Gold Pill Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-gold/20 text-xs font-semibold uppercase tracking-wider text-zinc-300 backdrop-blur-sm shadow-[0_0_15px_rgba(212,175,55,0.05)]"
                >
                    <span className="flex h-2.5 w-2.5 rounded-full bg-gold animate-pulse"></span>
                    The Infrastructure for Capital Operators
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl md:text-7xl font-bold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
                >
                    Build an Institutional-Grade <br className="hidden md:block" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold via-gold-light to-gold">
                        Investment Pipeline
                    </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-3xl mx-auto text-lg md:text-xl text-zinc-400 leading-relaxed font-light"
                >
                    Replace scattered spreadsheets, fragmented data rooms, and inconsistent follow-ups with a clean, automated system designed to raise capital with precision and credibility.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                >
                    <a
                        href="#apply"
                        className="group relative flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold via-amber-500 to-gold px-8 text-sm font-bold uppercase tracking-wider text-black transition-all hover:scale-102 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                    >
                        <Zap className="h-4 w-4 fill-current" />
                        Apply to Become a Founding Partner
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                    <a
                        href="#apply"
                        className="flex h-12 items-center justify-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-8 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-gold/10 hover:border-gold/60"
                    >
                        Get the DIY Snapshot
                    </a>
                </motion.div>

                {/* Stats Dashboard */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-3 gap-4 max-w-3xl mx-auto pt-16 border-t border-gold/10"
                >
                    <div className="text-center">
                        <div className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">200+</div>
                        <div className="text-xxs md:text-xs text-zinc-500 uppercase tracking-widest mt-2 font-semibold">Partners</div>
                    </div>
                    <div className="text-center border-x border-gold/10">
                        <div className="text-3xl md:text-5xl font-extrabold text-gold tracking-tight">$100M+</div>
                        <div className="text-xxs md:text-xs text-zinc-500 uppercase tracking-widest mt-2 font-semibold">Raised</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">20+</div>
                        <div className="text-xxs md:text-xs text-zinc-500 uppercase tracking-widest mt-2 font-semibold">Cities</div>
                    </div>
                </motion.div>
            </div>

            {/* Cinematic bottom edge glow */}
            <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            <div className="absolute bottom-0 w-full h-[80px] bg-gradient-to-t from-gold/5 to-transparent blur-xl" />

        </section>
    );
}
