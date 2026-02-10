"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FooterSection() {
    return (
        <footer className="bg-black py-24 relative overflow-hidden border-t border-white/10">
            <div className="container px-4 mx-auto max-w-4xl text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        "People don't buy tools— <br />
                        <span className="text-blue-500">they buy identity reinforcement."</span>
                    </h2>
                    <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
                        Join the ecosystem of Capital Operators who are outperforming the competition.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16 font-mono text-sm text-zinc-500 uppercase tracking-widest">
                        <span>Educate.</span>
                        <span className="hidden md:inline text-blue-500">•</span>
                        <span>Qualify.</span>
                        <span className="hidden md:inline text-blue-500">•</span>
                        <span>Automate.</span>
                    </div>

                    <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-sm text-zinc-600">
                        <p>Powered by Future House.</p>
                        <p>© {new Date().getFullYear()} The Deal Machine Ecosystem.</p>
                    </div>
                </motion.div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none" />
        </footer>
    );
}
