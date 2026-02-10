"use client";

import { motion } from "framer-motion";
import { Compass } from "lucide-react";

export function StrategySection() {
    return (
        <section className="py-24 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
            <div className="container px-4 mx-auto max-w-5xl text-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="inline-flex items-center justify-center p-3 mb-6 bg-blue-500/10 rounded-xl text-blue-400">
                        <Compass className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Don't Just Buy Software. <br />
                        <span className="text-blue-500">Build a Strategy.</span>
                    </h2>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        Software alone doesn't raise capital—strategy does. That is why The Deal Machine is anchored by <span className="text-white font-medium">The Capital Quarter</span>.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden"
                >
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        <div className="flex-1 text-left">
                            <h3 className="text-2xl font-bold text-white mb-4">The Capital Strategy Session</h3>
                            <p className="text-zinc-400 mb-6">
                                Every Equinox and Solstice, we host a live strategy session to help you map your fundraising roadmap for the next 3 months.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-zinc-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    Map your fundraising roadmap
                                </li>
                                <li className="flex items-center gap-2 text-zinc-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    Design the narrative
                                </li>
                                <li className="flex items-center gap-2 text-zinc-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    Execute with The Deal Machine
                                </li>
                            </ul>
                        </div>

                        <div className="w-full md:w-1/3 aspect-square bg-white/5 rounded-2xl flex items-center justify-center border border-white/5">
                            {/* Placeholder for visuals or calendar graphic */}
                            <div className="text-center">
                                <div className="text-4xl font-bold text-white mb-2">Q3</div>
                                <div className="text-xs text-zinc-500 uppercase tracking-widest">Capital Quarter</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
