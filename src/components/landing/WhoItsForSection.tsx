"use client";

import { motion } from "framer-motion";
import { Building2, TrendingUp, Briefcase, Network } from "lucide-react";

const audiences = [
    {
        title: "Companies Raising Capital",
        description: "For high-growth scaleups and mature operators raising Series A/B or project finance who need a streamlined investor funnel.",
        icon: Building2,
        color: "text-gold",
        bgIcon: "bg-gold/10 text-gold"
    },
    {
        title: "Emerging Fund Managers",
        description: "For GPs raising Fund I or II who want to build systematic LP nurture campaigns and establish credibility at scale.",
        icon: TrendingUp,
        color: "text-gold",
        bgIcon: "bg-gold/10 text-gold"
    },
    {
        title: "Professional Deal Makers",
        description: "For investment bankers, syndicators, and private equity professionals managing multi-stakeholder deals.",
        icon: Briefcase,
        color: "text-gold",
        bgIcon: "bg-gold/10 text-gold"
    },
    {
        title: "Capital Advisors & Agencies",
        description: "For placement agents, fractional CFOs, and consultants running capital raise operations for multiple clients.",
        icon: Network,
        color: "text-gold",
        bgIcon: "bg-gold/10 text-gold"
    }
];

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 40 },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] as const
        }
    }
};

export function WhoItsForSection() {
    return (
        <section id="audience" className="py-28 bg-gradient-to-b from-black to-[#020817] border-t border-gold/10 relative overflow-hidden">
            {/* Ambient visual background element */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container px-6 mx-auto max-w-7xl relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="inline-block px-3 py-1 bg-gold/5 rounded-full border border-gold/20 text-xxs font-bold uppercase tracking-wider text-gold mb-4"
                    >
                        Target Audience
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        Built for the Architects <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold via-gold-light to-gold">
                            of Private Capital
                        </span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-zinc-400 font-light"
                    >
                        Whether you are a founder raising your first institutional round or an agency managing dozens of client pipelines.
                    </motion.p>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {audiences.map((audience, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className="p-8 rounded-3xl bg-black/40 border border-white/5 hover:border-gold/30 hover:bg-black/60 transition-all duration-500 flex flex-col justify-between group"
                        >
                            <div>
                                <div className="p-3 w-fit rounded-2xl bg-white/5 mb-6 text-zinc-400 group-hover:bg-gold/10 group-hover:text-gold transition-colors duration-300">
                                    <audience.icon className={`w-6 h-6 ${audience.color}`} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors duration-300">
                                    {audience.title}
                                </h3>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed mt-4 font-light">
                                {audience.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
