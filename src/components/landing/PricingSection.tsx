"use client";

import { motion } from "framer-motion";
import { Check, Star, Settings } from "lucide-react";

export function PricingSection() {
    return (
        <section id="pricing" className="py-24 bg-black relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container px-4 mx-auto max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Choose Your Level of Leverage</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                    {/* OPTION 1: The Accelerator Beta */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col p-8 rounded-3xl bg-zinc-900 border border-blue-500/50 relative overflow-hidden shadow-2xl shadow-blue-900/20 order-1 md:order-1"
                    >
                        {/* Gradient Border Effect */}
                        <div className="absolute inset-0 border-2 border-transparent rounded-3xl bg-gradient-to-b from-blue-500/20 to-transparent pointer-events-none [mask-image:linear-gradient(black,transparent)]" />

                        <div className="mb-6 relative z-10">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="px-3 py-1 bg-blue-500 text-white text-xs font-bold tracking-wider rounded-full uppercase">
                                    Recommended
                                </div>
                                <div className="px-3 py-1 bg-white/10 text-white text-xs font-bold tracking-wider rounded-full uppercase">
                                    Limited Spots
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white">The Accelerator Beta</h3>
                            <p className="text-zinc-400 mt-2">For founders who want the "Done-With-You" experience.</p>
                            <p className="text-sm text-blue-400 mt-2">Join the "Capital Quarter" Cohort</p>
                        </div>

                        <div className="border-t border-white/10 pt-6 mb-6 flex-1 relative z-10">
                            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                What You Get:
                            </h4>
                            <ul className="space-y-4">
                                {[
                                    "Full Deal Machine License (CRM, Agents, Data Room)",
                                    "Strategy Acceleration: Weekly Coaching Calls",
                                    "Beta Pricing: Significant Discount",
                                    "Priority Support: Direct Team Access"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-zinc-200">
                                        <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors relative z-10 shadow-lg shadow-blue-500/25">
                            APPLY FOR THE BETA COHORT
                        </button>
                    </motion.div>


                    {/* OPTION 2: The DIY Snapshot */}
                    <motion.div
                        id="pricing-diy"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 order-2 md:order-2"
                    >
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-white">The DIY Snapshot</h3>
                            <p className="text-zinc-400 mt-2">For the builder who wants control.</p>
                        </div>

                        <div className="text-3xl font-bold text-white mb-6">
                            $1,500 <span className="text-lg font-normal text-zinc-500">/ One-Time</span>
                        </div>

                        <div className="border-t border-white/5 pt-6 mb-6 flex-1">
                            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                                <Settings className="w-4 h-4 text-zinc-400" />
                                What You Get:
                            </h4>
                            <ul className="space-y-4">
                                {[
                                    "Full Tech Stack: GHL Snapshot with Pipelines",
                                    "The Framework: 4-Week Funnel Templates",
                                    "Data Room Architecture",
                                    "Manual Control: You configure agents yourself"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-zinc-300">
                                        <Check className="w-5 h-5 text-zinc-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button className="w-full py-4 rounded-xl bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition-colors">
                            BUY THE SNAPSHOT
                        </button>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
