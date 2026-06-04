"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
    {
        quote: "This system brought clarity and structure to our capital raise.",
        author: "Manuel Reyes",
        role: "Marketing Agency Owner",
        initials: "MR",
        avatarBg: "from-gold via-gold-light to-gold text-black"
    },
    {
        quote: "The automated pipeline and secure data room allowed us to manage LP relationships at scale.",
        author: "Presley Morgan",
        role: "E-commerce Founder",
        initials: "PM",
        avatarBg: "from-gold via-gold-light to-gold text-black"
    },
    {
        quote: "I can now coordinate multiple investor relationships without losing track of opportunities.",
        author: "Edwin Carter",
        role: "Local Business Owner",
        initials: "EC",
        avatarBg: "from-gold via-gold-light to-gold text-black"
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
    hidden: { opacity: 0, y: 55 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] as const
        }
    }
};

export function TestimonialsSection() {
    return (
        <section id="testimonials" className="py-28 bg-gradient-to-b from-[#020817] to-black border-t border-gold/10 relative overflow-hidden">
            {/* Soft decorative blur */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container px-6 mx-auto max-w-7xl relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="inline-block px-3 py-1 bg-gold/5 rounded-full border border-gold/20 text-xxs font-bold uppercase tracking-wider text-gold mb-4"
                    >
                        Testimonials
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Trusted by Active <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold via-gold-light to-gold">
                            Capital Operators
                        </span>
                    </h2>
                    <p className="text-zinc-400 font-light">
                        See how real operators are leveraging automated pipelines to secure commitments.
                    </p>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className="relative p-8 rounded-3xl bg-black/40 border border-white/5 hover:border-gold/30 hover:bg-black/60 transition-all duration-500 flex flex-col justify-between group"
                        >
                            <div className="absolute top-6 right-6 text-gold/10 group-hover:text-gold/20 transition-colors duration-300">
                                <Quote className="w-10 h-10 rotate-180" />
                            </div>

                            <p className="text-lg text-zinc-100 italic leading-relaxed mb-8 relative z-10 font-light">
                                &quot;{t.quote}&quot;
                            </p>

                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarBg} flex items-center justify-center font-bold text-sm shadow-md`}>
                                    {t.initials}
                                </div>
                                <div>
                                    <div className="font-semibold text-white group-hover:text-gold transition-colors duration-300">{t.author}</div>
                                    <div className="text-xs text-zinc-500">{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
