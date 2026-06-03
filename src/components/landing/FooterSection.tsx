"use client";

import { motion } from "framer-motion";

export function FooterSection() {
    return (
        <footer className="bg-black py-24 relative overflow-hidden border-t border-gold/10">
            <div className="container px-6 mx-auto max-w-7xl text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                        Swim with the whales. <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold via-gold-light to-gold">
                            Become a unicorn.
                        </span>
                    </h2>
                    <p className="text-sm md:text-base text-zinc-500 max-w-xl mx-auto mb-12 font-light">
                        The modern standard for private market capital raising.
                    </p>

                    <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-sm text-zinc-600 gap-4">
                        <p className="font-light">Powered by Future House.</p>
                        <p className="font-light">© {new Date().getFullYear()} The Deal Machine Ecosystem.</p>
                    </div>
                </motion.div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-dark-blue/20 to-transparent pointer-events-none" />
        </footer>
    );
}
