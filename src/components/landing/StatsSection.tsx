"use client";

import { motion } from "framer-motion";
import { Award, RefreshCw, Eye } from "lucide-react";

const stats = [
    {
        percentage: "78%",
        label: "Investors prefer founders with strong personal branding",
        description: "Your digital presence acts as a 24/7 validation engine, raising credibility before the first handshake.",
        icon: Award,
        color: "text-gold",
        glow: "from-gold/10 to-transparent",
        bgIcon: "bg-gold/10 text-gold"
    },
    {
        percentage: "45%",
        label: "Higher success with consistent investor follow-ups",
        description: "Automated updates and consistent nurture pipelines dramatically improve conversion rates for commitments.",
        icon: RefreshCw,
        color: "text-gold",
        glow: "from-gold/10 to-transparent",
        bgIcon: "bg-gold/10 text-gold"
    },
    {
        percentage: "93%",
        label: "VCs check founder content before investing",
        description: "Institutional allocators perform deep due diligence on your vision and thought leadership files.",
        icon: Eye,
        color: "text-gold",
        glow: "from-gold/10 to-transparent",
        bgIcon: "bg-gold/10 text-gold"
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

const cardVariants = {
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

export function StatsSection() {
    return (
        <section id="why-us" className="py-28 bg-gradient-to-b from-black to-[#020817] border-t border-gold/10 relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container px-6 mx-auto max-w-7xl relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="inline-block px-3 py-1 bg-gold/5 rounded-full border border-gold/20 text-xxs font-bold uppercase tracking-wider text-gold mb-4"
                    >
                        Fundraising Statistics
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        Why the Best Capital Operators <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold via-gold-light to-gold">
                            Run Different Pipelines
                        </span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-zinc-400 font-light"
                    >
                        Fundraising is a game of trust, consistency, and visibility. The data proves it.
                    </motion.p>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className="relative group p-8 rounded-3xl bg-black/40 border border-white/5 hover:border-gold/30 hover:bg-black/60 transition-all duration-500 flex flex-col justify-between"
                        >
                            {/* Card Glow Effect */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${stat.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none`} />

                            <div>
                                <div className="flex items-center justify-between mb-6 relative z-10">
                                    <div className={`p-3 rounded-2xl ${stat.bgIcon} transition-colors duration-300`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                </div>

                                <h3 className={`text-6xl md:text-7xl font-extrabold tracking-tight ${stat.color} mb-4 relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-white to-gold`}>
                                    {stat.percentage}
                                </h3>

                                <h4 className="text-lg font-semibold text-white mb-2 leading-snug relative z-10 group-hover:text-gold transition-colors duration-300">
                                    {stat.label}
                                </h4>
                            </div>

                            <p className="text-zinc-400 text-sm leading-relaxed mt-4 relative z-10 font-light">
                                {stat.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
