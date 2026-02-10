"use client";

import { motion } from "framer-motion";

const steps = [
    {
        number: "01",
        title: "Intake & Qualification",
        description: "Automated forms and AI chatbots vet potential investors before they ever reach your calendar.",
        color: "bg-blue-500"
    },
    {
        number: "02",
        title: "The Nurture Sequence",
        description: "A 12-month digital engagement system that keeps you top-of-mind. Automate your monthly updates, event invitations, and follow-ups.",
        color: "bg-purple-500"
    },
    {
        number: "03",
        title: "The Close",
        description: "Manage NDAs, contracts, and soft commits directly within the dashboard.",
        color: "bg-emerald-500"
    }
];

export function PipelineSection() {
    return (
        <section className="py-24 bg-zinc-950 border-y border-white/5 relative">
            <div className="container px-4 mx-auto max-w-6xl">
                <div className="mb-16 md:text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">From "Hello" to "Wire Received"</h2>
                    <p className="text-lg text-zinc-400">
                        We replace chaos with a structured Investor Relations Pipeline designed to move leads toward a close.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="relative pt-8 md:pt-12"
                        >
                            {/* Step Marker */}
                            <div className={`absolute top-0 left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full ${step.color} shadow-lg shadow-${step.color}/50 flex items-center justify-center text-xs font-bold text-white z-10`}>
                                {/* Ping animation included in CSS if desired, static for now */}
                            </div>

                            <div className="bg-zinc-900/40 border border-white/5 p-6 rounded-2xl md:text-center hover:bg-zinc-900/60 transition-colors">
                                <span className={`text-sm font-bold ${step.color.replace('bg-', 'text-')} mb-2 block`}>Step {step.number}</span>
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
