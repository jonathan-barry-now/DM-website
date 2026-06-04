"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
    { name: "Current", href: "#current" },
    { name: "Platform", href: "#platform" },
    { name: "Proof", href: "#proof" },
    { name: "Apply", href: "#apply" }
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled 
                        ? "bg-black/70 backdrop-blur-xl border-b border-white/10 py-4 shadow-lg shadow-black/40" 
                        : "bg-transparent py-6 border-b border-transparent"
                }`}
            >
                <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
                    {/* Logo */}
                    <a href="#hero" className="flex items-center gap-3 group">
                        <img 
                            src="/narwal_logo.png" 
                            alt="Narwhal Logo" 
                            style={{ height: "40px", width: "auto", filter: "invert(1)", mixBlendMode: "screen" }}
                        />
                        <span className="text-xl font-black tracking-wider text-white">
                            DEAL<span className="text-[#f3d46b] transition-colors group-hover:text-[#7effee]">MACHINE</span>
                        </span>
                        <span className="h-1.5 w-1.5 bg-[#7effee] shadow-[0_0_16px_rgba(126,255,238,0.8)]" />
                    </a>
                    {/* Desktop Nav Links */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.href}
                                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group py-2"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#7effee] transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:block">
                        <a
                            href="#apply"
                            className="inline-flex h-10 items-center justify-center rounded-lg border border-[#f3d46b]/45 bg-black/25 px-5 text-xs font-bold uppercase tracking-[0.18em] text-white transition-all hover:border-[#f3d46b] hover:bg-[#f3d46b] hover:text-black"
                        >
                            Apply Now
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-[73px] left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-b border-white/10 md:hidden"
                    >
                        <nav className="flex flex-col p-6 gap-4">
                            {navLinks.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="text-base font-semibold text-zinc-300 hover:text-white py-2 border-b border-white/5 transition-colors"
                            >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="#apply"
                                onClick={() => setMobileOpen(false)}
                                className="mt-4 flex h-12 items-center justify-center rounded-lg bg-[#f3d46b] text-black font-bold uppercase tracking-wider transition-all hover:bg-[#fff1a6]"
                            >
                                Apply Now
                            </a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
