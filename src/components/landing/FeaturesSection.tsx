"use client";

import { motion } from "framer-motion";
import { Users, ShieldCheck, Tv, CheckCircle2 } from "lucide-react";

const features = [
    {
        title: "Investor CRM & Capital Pipeline",
        description: "Scale your investor relations without losing the personal touch. Tracks commitments from first contact to wire received.",
        icon: Users,
        color: "text-gold",
        bg: "bg-gold/10",
        border: "hover:border-gold/30",
        points: [
            "Stage-Based Capital Tracking",
            "Automated Follow-Up Sequences",
            "Investor Engagement Insights"
        ]
    },
    {
        title: "Secure Automated Data Room",
        description: "Secure, tracked, and frictionless. Control access to your confidential investor materials and decks.",
        icon: ShieldCheck,
        color: "text-gold",
        bg: "bg-gold/10",
        border: "hover:border-gold/30",
        points: [
            "Instant Access Provisioning",
            "Centralized Asset Management",
            "Engagement Tracking"
        ]
    },
    {
        title: "Reputation Building Interview Funnel",
        description: "Build authority and scale your message. Capture investor details through structured interview funnels.",
        icon: Tv,
        color: "text-gold",
        bg: "bg-gold/10",
        border: "hover:border-gold/30",
        points: [
            "Complete Funnel Architecture",
            "Automated Scheduling",
            "Smart Reminder Automations"
        ]
    }
];

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] as const
        }
    }
};

export function FeaturesSection() {
    return (
        <section id="features" className="py-28 bg-gradient-to-b from-[#020817] to-black relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-dark-blue/20 rounded-full blur-3xl pointer-events-none" />

            <div className="container px-6 mx-auto max-w-7xl relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="inline-block px-3 py-1 bg-gold/5 rounded-full border border-gold/20 text-xxs font-bold uppercase tracking-wider text-gold mb-4"
                    >
                        The Platform
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6"
                    >
                        The Architecture for <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold via-gold-light to-gold">
                            High-Yield Capital Operations
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg text-zinc-400 font-light"
                    >
                        Replace fragmented platforms with a single, synchronized hub. Everything you need to capture, engage, and close LP relationships.
                    </motion.p>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid lg:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`group flex flex-col justify-between p-8 rounded-3xl bg-black/40 border border-white/5 transition-all duration-500 ${feature.border}`}
                        >
                            <div>
                                <div className={`h-12 w-12 rounded-2xl ${feature.bg} flex items-center justify-center mb-6`}>
                                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gold transition-colors duration-300">
                                    {feature.title}
                                </h3>

                                <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">
                                    {feature.description}
                                </p>
                            </div>

                            <div className="pt-6 border-t border-white/5 space-y-3">
                                {feature.points.map((point, pIndex) => (
                                    <div key={pIndex} className="flex items-center gap-3">
                                        <CheckCircle2 className={`w-4 h-4 ${feature.color} opacity-85 flex-shrink-0`} />
                                        <span className="text-zinc-200 text-sm font-medium">{point}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
