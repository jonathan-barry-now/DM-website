"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
    { name: "Why Us", href: "#why-us" },
    { name: "Platform", href: "#features" },
    { name: "Audience", href: "#audience" },
    { name: "Testimonials", href: "#testimonials" }
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
                        ? "bg-black/80 backdrop-blur-md border-b border-gold/10 py-4 shadow-lg shadow-black/40" 
                        : "bg-transparent py-6 border-b border-transparent"
                }`}
            >
                <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
                    {/* Logo */}
                    <a href="#hero" className="flex items-center gap-2 group">
                        <span className="text-xl font-bold tracking-wider text-white">
                            DEAL<span className="text-gold group-hover:text-gold-light transition-colors">MACHINE</span>
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
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
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:block">
                        <a
                            href="#apply"
                            className="inline-flex h-10 items-center justify-center rounded-full border border-gold/40 px-6 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-gold hover:text-black hover:border-gold hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
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
                        className="fixed top-[73px] left-0 right-0 z-40 bg-black/95 backdrop-blur-lg border-b border-gold/10 md:hidden"
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
                                className="mt-4 flex h-12 items-center justify-center rounded-full bg-gold text-black font-bold uppercase tracking-wider transition-all hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
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
