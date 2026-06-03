"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Sparkles, 
    Layers, 
    Waves, 
    Eye, 
    Compass, 
    BookOpen, 
    Sliders, 
    ListChecks, 
    Shield, 
    Activity, 
    Zap, 
    ChevronRight,
    ArrowLeft
} from "lucide-react";

// Mockup Data
const mockups = [
    {
        id: "cosmic-capital",
        title: "#11: Deep Water Liquidity",
        tag: "Primary Concept",
        tagColor: "bg-amber-500/10 text-gold border-amber-500/20",
        icon: Sparkles,
        iconColor: "text-gold",
        description: "Capturing the deep ocean currents of liquid capital. Investors are represented as hydrothermal vents or oceanic nodes, with glowing streams of capital routing through deep marine networks. The capital raise is modeled as navigating deep ocean channels to reach gold reefs.",
        themeTones: "Deep Sea Blue, Liquid Gold, Abyssal Black",
        image: "/cosmic_capital_mockup.png"
    },
    {
        id: "watchmaker",
        title: "#10: The Tidal Wave",
        tag: "Tidal Mechanics",
        tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        icon: Layers,
        iconColor: "text-blue-400",
        description: "Focuses on the precision fluid mechanics of pipeline capital. Displays a structured glassmorphic CRM layout that deconstructs into golden wave layers on scroll. Each wave represents a modular flow of the pipeline (Outreach, Data Room, Closing).",
        themeTones: "Tidal Navy, Liquid Gold, Sea Foam White",
        image: "/watchmaker_mockup.png"
    },
    {
        id: "liquid-capital",
        title: "Bioluminescent Flow",
        tag: "New Fluid Concept",
        tagColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        icon: Waves,
        iconColor: "text-cyan-400",
        description: "Inspired by Jonathan's liquid theme input. Captures the movement of capital using interactive bioluminescent orbs and waves. Golden currents pulse when active, aligning with the brand vision 'We Swim in Liquid Capital'.",
        themeTones: "Bioluminescent Cyan, Golden Ripples, Ocean Deep",
        image: "/liquid_capital_mockup.png"
    }
];

// Mascot Style Variations
const mascotStyles = [
    {
        id: "silhouette",
        name: "Core Institutional Silhouette",
        version: "v1",
        versionColor: "bg-zinc-800 text-zinc-400 border-zinc-700",
        description: "High-contrast outline. Clean baseline brand asset in rich gold.",
        previewDesc: "A pure golden outline silhouette, ideal for professional print, luxury branding elements, and corporate letterheads. Minimalist and static."
    },
    {
        id: "bioluminescent",
        name: "Bioluminescent Token",
        version: "Glow",
        versionColor: "bg-blue-500/15 text-blue-400 border-blue-500/20",
        description: "Rich deep blue and teal neon aura. Interactive floating glass layer.",
        previewDesc: "Features a soft pulsing deep ocean glow, evoking bioluminescent sea life. Perfect for ambient backgrounds and call-to-action indicators."
    },
    {
        id: "ripple",
        name: "Liquid Flow Ripple",
        version: "Fluid",
        versionColor: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
        description: "Surrounded by rolling liquid wave curves. Flows with scrolling.",
        previewDesc: "Surrounds the emblem with expanding water ripples that simulate fluid movement. Highly recommended for sections promoting 'Liquid Capital'."
    },
    {
        id: "precision",
        name: "Golden Precision Emblem",
        version: "Elite",
        versionColor: "bg-amber-500/15 text-gold border-amber-500/20",
        description: "Luxury metallic gold watch face. Shifts reflection on hover.",
        previewDesc: "Combines metallic gold textures with rotating concentric rings, representing precision engineering and deal timing in investment banking."
    },
    {
        id: "ascension",
        name: "Infinite Ascension",
        version: "Dynamic",
        versionColor: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20",
        description: "Scanning sweeps, orbital lines, and floating breathing curves.",
        previewDesc: "Combines a slow floating translation, breathing size pulse, and a vertical neon-indigo scanner bar sweeping the circle. Highly recommended for active AI execution screens."
    }
];

export default function DesignPage() {
    const [activeTab, setActiveTab] = useState("Visual Mood Board");
    const [bgTheme, setBgTheme] = useState("dark");
    const [glowEnabled, setGlowEnabled] = useState(true);
    const [selectedStyle, setSelectedStyle] = useState("ascension");

    const tabs = [
        { name: "Visual Mood Board", icon: Eye },
        { name: "Inspiration Links", icon: Compass },
        { name: "Interactive Copy Deck", icon: BookOpen },
        { name: "Technical Specs", icon: Sliders },
        { name: "Project Checklist", icon: ListChecks },
        { name: "Cohabitance (Three Branches)", icon: Shield },
        { name: "Data Room Gaps Board", icon: Activity }
    ];

    // Helper to get preview styling classes
    const getPreviewBgClass = () => {
        switch (bgTheme) {
            case "black":
                return "bg-black border-zinc-900";
            case "light":
                return "bg-slate-50 border-slate-200 text-slate-900";
            case "radial":
                return "bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 border-indigo-900/30";
            case "dark":
            default:
                return "bg-slate-950/70 border-slate-800";
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-gold/30 selection:text-gold-light font-sans relative overflow-x-hidden">
            {/* Global SVG Filter for Water-like distortion */}
            <svg className="hidden">
                <defs>
                    <filter id="water-filter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
            </svg>

            {/* Custom Animations CSS */}
            <style jsx global>{`
                @keyframes scan {
                    0%, 100% { transform: translateY(-15px); opacity: 0.1; }
                    50% { transform: translateY(220px); opacity: 0.95; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-12px) rotate(1.5deg); }
                }
                @keyframes rotate-slow {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes rotate-reverse-slow {
                    0% { transform: rotate(360deg); }
                    100% { transform: rotate(0deg); }
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.35; transform: scale(1); }
                    50% { opacity: 0.65; transform: scale(1.08); }
                }
                @keyframes ripple-ring {
                    0% { transform: scale(0.85); opacity: 0.8; }
                    100% { transform: scale(1.6); opacity: 0; }
                }
                @keyframes wave-flow {
                    0% { transform: translateX(0) translateZ(0) scaleY(1); }
                    50% { transform: translateX(-25%) translateZ(0) scaleY(0.85); }
                    100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
                }
                .mascot-scan-line {
                    animation: scan 4.5s ease-in-out infinite;
                }
                .mascot-float-image {
                    animation: float 6s ease-in-out infinite;
                }
                .rotate-slow {
                    animation: rotate-slow 28s linear infinite;
                }
                .rotate-reverse-slow {
                    animation: rotate-reverse-slow 35s linear infinite;
                }
                .pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
                .ripple-animation {
                    animation: ripple-ring 3s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
                }
            `}</style>

            {/* Ambient Water/Liquid Background Elements */}
            <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-indigo-950/20 via-slate-950/5 to-transparent pointer-events-none -z-20" />
            <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-blue-900/10 blur-[150px] pointer-events-none -z-20 animate-pulse" />
            <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-amber-900/5 blur-[150px] pointer-events-none -z-20" />

            {/* Header */}
            <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-blue-950 via-slate-900 to-amber-500/80 border border-gold/30 flex items-center justify-center shadow-lg shadow-gold/10">
                        <Waves className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                        <h1 className="text-md font-bold tracking-tight text-white flex items-center gap-2">
                            DealMachine <span className="text-gold font-semibold text-xs tracking-wider border border-gold/20 px-1.5 py-0.2 rounded bg-gold/5">V2</span>
                        </h1>
                        <p className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">Design &amp; Strategy Spec</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2.5 py-1 rounded-full font-mono font-medium">
                        Liquid Branch
                    </span>
                    <a 
                        className="text-xs text-slate-300 hover:text-white transition-colors bg-slate-900/80 border border-slate-850 hover:border-slate-800 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5" 
                        href="/"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
                    </a>
                </div>
            </header>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 pt-10 pb-6">
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-8 md:p-10 shadow-2xl shadow-black/50">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
                    
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gold/10 text-gold border border-gold/20 mb-5">
                            <Zap className="h-3.5 w-3.5 animate-pulse text-gold" /> Liquid Strategy Spec — Ready for Review
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-amber-200">
                            DealMachine V2 Design Spec
                        </h2>
                        <p className="text-base text-slate-300 mb-8 leading-relaxed">
                            A curated visual and technical direction for the DealMachine CRM branding. 
                            Our design language is inspired by the movement of **water, deep ocean currents, and liquid capital**—represented by deep navy blues, rich dark slates, gold veins, and fluid glassmorphic micro-animations.
                        </p>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800 pt-6">
                            <div>
                                <p className="text-xs text-slate-400 font-mono">Primary Tagline</p>
                                <p className="text-sm font-semibold text-white mt-1">"Fortune is in the Follow Up"</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-mono">Theme Aesthetic</p>
                                <p className="text-sm font-semibold text-gold mt-1">Deep Sea &amp; Liquid Gold</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-mono">Target Audience</p>
                                <p className="text-sm font-semibold text-white mt-1">Founders raising $1M+</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-mono">Interactive Brand</p>
                                <p className="text-sm font-semibold text-white mt-1">Refined Narwhal Mascot</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Navigation Tabs */}
            <div className="max-w-7xl mx-auto px-6 mb-8">
                <div className="flex border-b border-slate-800 overflow-x-auto hide-scrollbar gap-1 py-1">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.name;
                        return (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                                    isActive 
                                        ? "border-gold text-white bg-gold/5" 
                                        : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30"
                                }`}
                            >
                                <Icon className={`h-4 w-4 ${isActive ? "text-gold" : "text-slate-400"}`} />
                                {tab.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Main Tabs Content */}
            <main className="max-w-7xl mx-auto px-6 pb-24">
                <AnimatePresence mode="wait">
                    {activeTab === "Visual Mood Board" && (
                        <motion.div
                            key="moodboard"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-12"
                        >
                            {/* Section Intro */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-white tracking-tight">Interactive Visual Directions</h3>
                                    <p className="text-sm text-slate-400 mt-1">High-fidelity concept mockups representing the core design directions designed around our ocean and liquid capital theme.</p>
                                </div>
                                <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-3 py-1 rounded-lg font-medium">
                                    High-Fidelity Assets
                                </span>
                            </div>

                            {/* Grid of 3 Concept Mockups */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {mockups.map((mockup) => {
                                    const MockupIcon = mockup.icon;
                                    return (
                                        <div 
                                            key={mockup.id}
                                            className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900/40 flex flex-col hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 transition-all duration-300 hover:-translate-y-1 group"
                                        >
                                            <div className="aspect-square w-full bg-slate-950 relative overflow-hidden">
                                                {/* Image */}
                                                <img 
                                                    src={mockup.image} 
                                                    alt={mockup.title} 
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85"></div>
                                                <div className={`absolute top-3 left-3 font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${mockup.tagColor}`}>
                                                    {mockup.tag}
                                                </div>
                                            </div>
                                            <div className="p-6 flex-1 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <MockupIcon className={`h-4.5 w-4.5 ${mockup.iconColor}`} />
                                                        <h4 className="text-lg font-bold text-white group-hover:text-gold transition-colors">{mockup.title}</h4>
                                                    </div>
                                                    <p className="text-xs text-slate-300 leading-relaxed font-sans">{mockup.description}</p>
                                                </div>
                                                <div className="border-t border-slate-800/85 mt-6 pt-4 flex justify-between items-center text-xs">
                                                    <span className="text-slate-400">Theme Tones:</span>
                                                    <span className="font-semibold text-gold">{mockup.themeTones}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Narwhal Mascot Logo Section */}
                            <div className="rounded-xl border border-slate-800 bg-slate-900/10 p-6 md:p-8 space-y-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/70 pb-6">
                                    <div className="space-y-1">
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gold/10 text-gold border border-gold/20">
                                            Interactive Mascot Suite
                                        </div>
                                        <h4 className="text-xl font-bold text-white tracking-tight">Narwhal Mascot Logo: Interactive Showcase</h4>
                                        <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                                            A circular outline enclosing an elegant yin-yang infinity loop silhouette, symbolizing the connection between capital depth (the whale) and valuation potential (the unicorn).
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-[10px] bg-slate-950 text-slate-400 border border-slate-800 px-2 py-1 rounded font-mono">Yin-Yang Loop</span>
                                        <span className="text-[10px] bg-slate-950 text-slate-400 border border-slate-800 px-2 py-1 rounded font-mono">Infinity Outline</span>
                                        <span className="text-[10px] bg-slate-950 text-slate-400 border border-slate-800 px-2 py-1 rounded font-mono">No Cartoon/Color</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                    {/* Left Column: Interactive Mascot Preview Panel */}
                                    <div className="lg:col-span-7 flex flex-col gap-4">
                                        <div className="text-xs text-slate-400 uppercase font-mono tracking-wider">Preview Panel</div>
                                        
                                        <div className={`relative rounded-xl border h-96 w-full flex items-center justify-center overflow-hidden transition-all duration-500 ${getPreviewBgClass()}`}>
                                            {/* Grid overlay */}
                                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-15"></div>
                                            
                                            {/* Dynamic Glow Light */}
                                            {glowEnabled && (
                                                <div 
                                                    className={`absolute h-64 w-64 rounded-full blur-3xl opacity-20 transition-all duration-700 pointer-events-none ${
                                                        selectedStyle === "bioluminescent" ? "bg-blue-500" :
                                                        selectedStyle === "ripple" ? "bg-cyan-500" :
                                                        selectedStyle === "precision" ? "bg-amber-500" :
                                                        selectedStyle === "ascension" ? "bg-gold/50 animate-pulse" : "bg-gold"
                                                    }`}
                                                />
                                            )}

                                            {/* Ripple Ring Wave animations for 'ripple' style */}
                                            {selectedStyle === "ripple" && (
                                                <>
                                                    <div className="absolute h-56 w-56 rounded-full border border-cyan-500/30 ripple-animation" style={{ animationDelay: "0s" }} />
                                                    <div className="absolute h-56 w-56 rounded-full border border-cyan-500/20 ripple-animation" style={{ animationDelay: "1s" }} />
                                                    <div className="absolute h-56 w-56 rounded-full border border-cyan-500/10 ripple-animation" style={{ animationDelay: "2s" }} />
                                                </>
                                            )}

                                            {/* Orbital and Precision Rings */}
                                            <div className="relative z-10 flex items-center justify-center">
                                                <div className={`h-64 w-64 relative rounded-full flex items-center justify-center overflow-hidden border bg-slate-950/60 p-4 transition-colors ${
                                                    selectedStyle === "precision" ? "border-amber-500/40" :
                                                    selectedStyle === "bioluminescent" ? "border-blue-500/40" :
                                                    selectedStyle === "ripple" ? "border-cyan-500/40" : "border-gold/30"
                                                }`}>
                                                    
                                                    {/* Rotating Dashed Orbits */}
                                                    <div className={`absolute inset-0 border border-dashed rounded-full rotate-slow ${
                                                        selectedStyle === "precision" ? "border-amber-500/25" :
                                                        selectedStyle === "bioluminescent" ? "border-blue-500/25" :
                                                        selectedStyle === "ripple" ? "border-cyan-500/25" : "border-gold/20"
                                                    }`} />
                                                    
                                                    {selectedStyle === "precision" && (
                                                        <div className="absolute inset-4 border border-dashed border-amber-500/15 rounded-full rotate-reverse-slow" />
                                                    )}

                                                    {/* Scanning Line for Ascension Style */}
                                                    {selectedStyle === "ascension" && (
                                                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mascot-scan-line" />
                                                    )}
                                                    
                                                    {/* Breathing Pulse Circle */}
                                                    <div className={`absolute inset-8 border rounded-full transition-all ${
                                                        selectedStyle === "ascension" ? "border-gold/20 pulse-slow" : "border-slate-800"
                                                    }`} />

                                                    {/* Mascot Floating Image Container */}
                                                    <div className={`relative z-10 h-40 w-40 flex items-center justify-center transition-all duration-300 ${
                                                        selectedStyle === "ascension" ? "mascot-float-image" : ""
                                                    } ${
                                                        selectedStyle === "precision" ? "hover:scale-105 hover:rotate-3 duration-500" : ""
                                                    }`}>
                                                        <img 
                                                            src="/narwal_logo.png" 
                                                            alt="Narwhal Mascot Logo" 
                                                            className={`h-full w-full object-contain transition-all duration-500 ${
                                                                selectedStyle === "silhouette" ? "invert brightness-100 contrast-125" :
                                                                selectedStyle === "bioluminescent" ? "invert hue-rotate-[180deg] brightness-125 saturate-150 drop-shadow-[0_0_15px_rgba(59,130,246,0.65)]" :
                                                                selectedStyle === "ripple" ? "invert hue-rotate-[160deg] brightness-120 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] filter-[url(#water-filter)]" :
                                                                selectedStyle === "precision" ? "invert sepia saturate-200 hue-rotate-[320deg] brightness-110 drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]" :
                                                                // Ascension default (Gold Glow)
                                                                "invert sepia saturate-200 hue-rotate-[320deg] brightness-110 drop-shadow-[0_0_15px_rgba(212,175,55,0.65)]"
                                                            }`}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Preview Toggles */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Background Theme</label>
                                                <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                                                    {["dark", "black", "light", "radial"].map((t) => (
                                                        <button 
                                                            key={t}
                                                            onClick={() => setBgTheme(t)}
                                                            className={`flex-1 text-[10px] font-semibold py-1 rounded capitalize transition-all ${
                                                                bgTheme === t 
                                                                    ? "bg-gold text-black shadow-sm" 
                                                                    : "text-slate-400 hover:text-white hover:bg-slate-900/60"
                                                            }`}
                                                        >
                                                            {t}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Ambient Glow Effect</label>
                                                <button 
                                                    onClick={() => setGlowEnabled(!glowEnabled)}
                                                    className={`w-full text-xs font-semibold py-2 rounded-lg border transition-all flex items-center justify-center gap-2 ${
                                                        glowEnabled 
                                                            ? "bg-gold/10 text-gold border-gold/30" 
                                                            : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700"
                                                    }`}
                                                >
                                                    {glowEnabled && <div className="h-2 w-2 rounded-full bg-gold animate-ping"></div>}
                                                    Glow: {glowEnabled ? "Enabled" : "Disabled"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Style Variation Selectors */}
                                    <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                                        <div className="space-y-4">
                                            <div className="text-xs text-slate-400 uppercase font-mono tracking-wider">Select Style Variation</div>
                                            
                                            <div className="space-y-2">
                                                {mascotStyles.map((style) => {
                                                    const isSelected = selectedStyle === style.id;
                                                    return (
                                                        <button
                                                            key={style.id}
                                                            onClick={() => setSelectedStyle(style.id)}
                                                            className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center gap-4 ${
                                                                isSelected 
                                                                    ? "bg-slate-900 border-gold shadow-md shadow-gold/5" 
                                                                    : "bg-slate-950/20 border-slate-850 hover:bg-slate-900/40 hover:border-slate-800"
                                                            }`}
                                                        >
                                                            <div className={`h-10 w-10 bg-slate-950 border rounded-lg p-1 flex items-center justify-center transition-colors ${
                                                                isSelected ? "border-gold" : "border-slate-800"
                                                            }`}>
                                                                <img 
                                                                    src="/narwal_logo.png" 
                                                                    alt={style.name} 
                                                                    className={`h-full w-full object-contain ${
                                                                        style.id === "silhouette" ? "invert brightness-75" :
                                                                        style.id === "bioluminescent" ? "invert hue-rotate-[180deg] brightness-125 saturate-150" :
                                                                        style.id === "ripple" ? "invert hue-rotate-[160deg] brightness-120" :
                                                                        style.id === "precision" ? "invert sepia saturate-200 hue-rotate-[320deg] brightness-100" :
                                                                        "invert sepia saturate-200 hue-rotate-[320deg] brightness-110"
                                                                    }`} 
                                                                />
                                                            </div>
                                                            <div>
                                                                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                                                                    {style.name}
                                                                    <span className={`text-[9px] border px-1 py-0.2 rounded font-mono font-medium ${style.versionColor}`}>
                                                                        {style.version}
                                                                    </span>
                                                                </div>
                                                                <div className="text-[10px] text-slate-400 mt-0.5">{style.description}</div>
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Description Footer */}
                                        <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-850/80 space-y-2">
                                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Style Characteristics</span>
                                            <h5 className="text-xs font-bold text-white">
                                                {mascotStyles.find(s => s.id === selectedStyle)?.name}
                                            </h5>
                                            <p className="text-[11px] text-slate-300 leading-relaxed">
                                                {mascotStyles.find(s => s.id === selectedStyle)?.previewDesc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab !== "Visual Mood Board" && (
                        <motion.div
                            key="other-tabs"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-slate-900/30 border border-slate-800 rounded-xl p-10 text-center"
                        >
                            <h3 className="text-lg font-bold text-white">{activeTab} Details</h3>
                            <p className="text-slate-400 text-sm mt-2 max-w-lg mx-auto">
                                This section is part of the interactive copy deck and technical specification system. 
                                In our main project, this is loaded dynamically to provide real-time specs.
                            </p>
                            <div className="mt-6 flex justify-center gap-2">
                                <span className="text-xs px-3 py-1 rounded bg-slate-950 border border-slate-850 font-mono text-slate-400">Section Loaded: {activeTab}</span>
                                <span className="text-xs px-3 py-1 rounded bg-gold/10 border border-gold/20 font-mono text-gold">Branch: Liquid Flow</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
