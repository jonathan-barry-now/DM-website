"use client";

import { motion } from "framer-motion";
import { Shield, Brain, Sparkles, Database, Mic, Mail, ArrowRight } from "lucide-react";

const brainAgents = [
    {
        title: "The Regulatory Agent",
        subtitle: "(Your Compliance Officer)",
        description: "Protects you from risk. Manages A2P 10DLC compliance and enforces the Investor Qualification Pipeline—ensuring no sensitive IP is seen until an NDA is signed.",
        icon: Shield,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        border: "group-hover:border-emerald-500/50"
    },
    {
        title: "The Brand Voice Agent",
        subtitle: "(Your Creative Director)",
        description: "Scales your personality. Ingests your brand kit and past interviews to write emails, landing pages, and social posts that sound exactly like you.",
        icon: Sparkles,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        border: "group-hover:border-purple-500/50"
    },
    {
        title: "The Company Info Agent",
        subtitle: "(Your Lead Analyst)",
        description: "The single source of truth. Powers the 24/7 AI chat widget and answers investor due diligence questions instantly based on your documentation.",
        icon: Brain,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "group-hover:border-blue-500/50"
    }
];

const bodyFeatures = [
    {
        title: "The Intelligent Data Room",
        description: "Institutional-grade security that tracks exactly who views your deck, which slides they study, and for how long.",
        icon: Database
    },
    {
        title: "The Content Engine",
        description: "Turn one interview into a month of content. Automate 'Watch Pages,' investor memos, and LinkedIn assets.",
        icon: Mic
    },
    {
        title: "The Nurture Sequence",
        description: "The fortune is in the follow-up. Automate your monthly investor updates and 12-month nurture campaigns.",
        icon: Mail
    }
];

export function FeaturesSection() {
    return (
        <section className="py-24 bg-black relative">
            <div className="container px-4 mx-auto max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h4 className="text-blue-500 font-semibold tracking-wide uppercase text-sm mb-4">The Solution: One Engine, Three Agents</h4>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6"
                    >
                        You Don’t Need More Tools. <br />
                        You Need a Team That Never Sleeps.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-lg text-zinc-400"
                    >
                        The Deal Machine replaces the chaos of "duct-taped tools" with a vertically integrated ecosystem. We provide the infrastructure; our AI Agents provide the labor.
                    </motion.p>
                </div>

                {/* 1. THE BRAIN */}
                <div className="mb-24">
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-sm">1</span>
                        The Brain: Your AI Agent Workforce
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {brainAgents.map((agent, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`group p-8 rounded-2xl bg-zinc-900/50 border border-white/10 transition-colors ${agent.border}`}
                            >
                                <div className={`h-12 w-12 rounded-lg ${agent.bg} flex items-center justify-center mb-6`}>
                                    <agent.icon className={`w-6 h-6 ${agent.color}`} />
                                </div>

                                <h4 className="text-xl font-bold text-white">{agent.title}</h4>
                                <p className={`text-sm font-medium mb-3 ${agent.color}`}>{agent.subtitle}</p>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    {agent.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 2. THE BODY */}
                <div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-sm">2</span>
                            The Body: The Investor Relations Pipeline
                        </h3>
                        <p className="text-zinc-500 font-mono text-sm">Educate. Qualify. Automate.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {bodyFeatures.map((feature, index) => (
                            <motion.button
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-left group p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/5 hover:border-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-900/10"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 rounded-full bg-white/5 group-hover:bg-blue-500/10 transition-colors">
                                        <feature.icon className="w-5 h-5 text-zinc-400 group-hover:text-blue-400" />
                                    </div>
                                    <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">{feature.title}</h4>
                                </div>
                                <p className="text-zinc-400 text-sm pl-[52px]">
                                    {feature.description}
                                </p>
                            </motion.button>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
