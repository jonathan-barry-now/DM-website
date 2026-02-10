"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export function ProblemSection() {
    return (
        <section className="py-24 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
            {/* Subtle background noise/texture */}
            <div className="absolute inset-0 opacity-20 bg-noise mix-blend-overlay pointer-events-none"></div>

            <div className="container px-4 mx-auto max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: The Problem */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block px-3 py-1 bg-white/5 rounded-full border border-white/10 text-xs font-medium text-zinc-400 mb-6">
                            THE PHILOSOPHY: CONVICTION AS A SERVICE
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Investors Bet on the Jockey, <br />
                            <span className="text-blue-500">Not Just the Horse.</span>
                        </h2>
                        <div className="space-y-6 text-zinc-400 text-lg">
                            <p>
                                78% of investors are more likely to invest in companies led by founders with strong personal brands and visible thought leadership.
                            </p>
                            <p>
                                Yet, most founders are raising capital using scattered spreadsheets, messy inboxes, and static pitch decks.
                            </p>
                            <div className="flex gap-4 items-start p-4 bg-red-500/5 border border-red-500/10 rounded-lg">
                                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                                <p className="text-sm text-zinc-300">
                                    <span className="text-red-400 font-semibold block mb-1">The Reality:</span>
                                    It feels risky, unprofessional, and creates massive operational drag.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: The Philosophy */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20" />
                        <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                The Michael Saylor Effect
                            </h3>
                            <p className="text-zinc-400 mb-6 leading-relaxed">
                                Just as Michael Saylor transformed MicroStrategy by evangelizing a movement,
                                you need to turn your company into a lightning rod for capital. This is
                                <span className="text-white font-medium"> Conviction as a Service</span>.
                            </p>

                            <div className="pt-6 border-t border-white/5 space-y-4">
                                <p className="text-zinc-300 leading-relaxed">
                                    The Deal Machine is not just a CRM. It is a 12-month digital engagement system
                                    designed to build trust, strengthen your Cap Table, and elevate your market presence.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
