"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export function ApplicationSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        companyName: "",
        linkedin: "",
        lookingToRaise: "",
        alreadyRaised: ""
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const validate = () => {
        const tempErrors: Record<string, string> = {};
        if (!formData.name.trim()) tempErrors.name = "Full name is required";
        if (!formData.email.trim()) {
            tempErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Please enter a valid email address";
        }
        if (!formData.phone.trim()) tempErrors.phone = "Phone number is required";
        if (!formData.companyName.trim()) tempErrors.companyName = "Company name is required";
        if (!formData.linkedin.trim()) {
            tempErrors.linkedin = "LinkedIn URL is required";
        } else if (!formData.linkedin.includes("linkedin.com/")) {
            tempErrors.linkedin = "Please enter a valid LinkedIn URL";
        }
        if (!formData.lookingToRaise) tempErrors.lookingToRaise = "Please select an option";
        if (!formData.alreadyRaised) tempErrors.alreadyRaised = "Please select an option";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when typing
        if (errors[name]) {
            setErrors(prev => {
                const updated = { ...prev };
                delete updated[name];
                return updated;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setStatus("submitting");

        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1500));

        setStatus("success");
    };

    return (
        <section id="apply" className="py-28 bg-gradient-to-b from-black to-[#020817] border-t border-gold/10 relative overflow-hidden">
            {/* Ambient Background glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-dark-blue/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container px-6 mx-auto max-w-4xl relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="inline-block px-3 py-1 bg-gold/5 rounded-full border border-gold/25 text-xxs font-bold uppercase tracking-wider text-gold mb-4"
                    >
                        Join Us
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        Apply to Become a <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold via-gold-light to-gold">
                            Founding Partner
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-zinc-400 font-light"
                    >
                        Accelerate your round. Selected partners receive priority setup, direct GP coaching, and premium pipeline terms.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative bg-black/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/80 max-w-3xl mx-auto"
                >
                    {/* Glowing gold border element */}
                    <div className="absolute inset-0 border border-transparent rounded-3xl bg-gradient-to-b from-gold/15 to-transparent pointer-events-none [mask-image:linear-gradient(black,transparent)]" />

                    <AnimatePresence mode="wait">
                        {status === "success" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-12 flex flex-col items-center justify-center"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                    className="p-4 rounded-full bg-gold/10 text-gold mb-6"
                                >
                                    <CheckCircle2 className="w-16 h-16" />
                                </motion.div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Application Submitted</h3>
                                <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed font-light mb-8">
                                    Thank you, <span className="text-white font-medium">{formData.name}</span>. Our partners will review your fundraise profile for <span className="text-white font-medium">{formData.companyName}</span> and contact you within 24 hours.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.form
                                onSubmit={handleSubmit}
                                className="space-y-6 relative z-10"
                            >
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Full Name */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className={`w-full px-4 py-3 bg-zinc-950 border rounded-xl text-white text-sm placeholder-zinc-600 outline-none transition-all ${
                                                errors.name ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                                            }`}
                                        />
                                        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@company.com"
                                            className={`w-full px-4 py-3 bg-zinc-950 border rounded-xl text-white text-sm placeholder-zinc-600 outline-none transition-all ${
                                                errors.email ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                                            }`}
                                        />
                                        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+1 (555) 000-0000"
                                            className={`w-full px-4 py-3 bg-zinc-950 border rounded-xl text-white text-sm placeholder-zinc-600 outline-none transition-all ${
                                                errors.phone ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                                            }`}
                                        />
                                        {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                                    </div>

                                    {/* Company Name */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Company Name</label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            placeholder="Acme Corp"
                                            className={`w-full px-4 py-3 bg-zinc-950 border rounded-xl text-white text-sm placeholder-zinc-600 outline-none transition-all ${
                                                errors.companyName ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                                            }`}
                                        />
                                        {errors.companyName && <p className="text-xs text-red-500">{errors.companyName}</p>}
                                    </div>

                                    {/* LinkedIn */}
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">LinkedIn Profile</label>
                                        <input
                                            type="url"
                                            name="linkedin"
                                            value={formData.linkedin}
                                            onChange={handleChange}
                                            placeholder="https://linkedin.com/in/username"
                                            className={`w-full px-4 py-3 bg-zinc-950 border rounded-xl text-white text-sm placeholder-zinc-600 outline-none transition-all ${
                                                errors.linkedin ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                                            }`}
                                        />
                                        {errors.linkedin && <p className="text-xs text-red-500">{errors.linkedin}</p>}
                                    </div>

                                    {/* Looking to Raise */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Looking to Raise</label>
                                        <div className="relative">
                                            <select
                                                name="lookingToRaise"
                                                value={formData.lookingToRaise}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 bg-zinc-950 border rounded-xl text-white text-sm outline-none transition-all appearance-none ${
                                                    errors.lookingToRaise ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-gold/50"
                                                }`}
                                            >
                                                <option value="" disabled className="text-zinc-700">Select raise target...</option>
                                                <option value="under_1m" className="bg-zinc-950 text-white">Under $1M</option>
                                                <option value="1m_5m" className="bg-zinc-950 text-white">$1M - $5M</option>
                                                <option value="5m_20m" className="bg-zinc-950 text-white">$5M - $20M</option>
                                                <option value="above_20m" className="bg-zinc-950 text-white">$20M+</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold font-light">▼</div>
                                        </div>
                                        {errors.lookingToRaise && <p className="text-xs text-red-500">{errors.lookingToRaise}</p>}
                                    </div>

                                    {/* Capital Already Raised */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Capital Already Raised</label>
                                        <div className="relative">
                                            <select
                                                name="alreadyRaised"
                                                value={formData.alreadyRaised}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 bg-zinc-950 border rounded-xl text-white text-sm outline-none transition-all appearance-none ${
                                                    errors.alreadyRaised ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-gold/50"
                                                }`}
                                            >
                                                <option value="" disabled className="text-zinc-700">Select capital raised...</option>
                                                <option value="bootstrap" className="bg-zinc-950 text-white">$0 / Bootstrapped</option>
                                                <option value="under_500k" className="bg-zinc-950 text-white">Under $500k</option>
                                                <option value="500k_2m" className="bg-zinc-950 text-white">$500k - $2M</option>
                                                <option value="above_2m" className="bg-zinc-950 text-white">$2M+</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold font-light">▼</div>
                                        </div>
                                        {errors.alreadyRaised && <p className="text-xs text-red-500">{errors.alreadyRaised}</p>}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={status === "submitting"}
                                    className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-gold via-amber-500 to-gold text-black font-bold uppercase tracking-wider text-sm transition-all hover:scale-101 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    {status === "submitting" ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Processing Profile...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Submit Application
                                        </>
                                    )}
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
