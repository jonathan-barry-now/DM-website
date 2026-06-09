"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2 } from "lucide-react";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FIELD_KEYS = {
  // Step 1
  fullName: "full_name",
  linkedin: "LinkedIn",
  email: "email",
  orgName: "Organization Name",
  industry: "Industry",
  website: "Website URL",
  // Step 2
  orgType: "Organization Type",
  stage: "Stage",
  teamSize: "Team Size",
  // Step 3
  funding: "What is your current funding stage, how much are you raising, and when do you need to close?",
  traction: "Summarize your traction: revenue stage, key metrics, prior funding, and notable wins.",
  problem: "What problem do you solve, and why is right now the critical moment to solve it?",
  // Step 4
  story: "What's your origin story in this industry, and what have you built or done before? Highlight key credentials.",
  campaign: "Where are the core themes and topics that you would like to cover in your 12 month campaign to cultivate your subject matter expertise?"
};

export function LeadCaptureModal({ isOpen, onClose }: LeadCaptureModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string>>({
    [FIELD_KEYS.fullName]: "",
    [FIELD_KEYS.linkedin]: "",
    [FIELD_KEYS.email]: "",
    [FIELD_KEYS.orgName]: "",
    [FIELD_KEYS.industry]: "",
    [FIELD_KEYS.website]: "",
    [FIELD_KEYS.orgType]: "",
    [FIELD_KEYS.stage]: "",
    [FIELD_KEYS.teamSize]: "",
    [FIELD_KEYS.funding]: "",
    [FIELD_KEYS.traction]: "",
    [FIELD_KEYS.problem]: "",
    [FIELD_KEYS.story]: "",
    [FIELD_KEYS.campaign]: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Handle Esc key press to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting]);

  // Reset form when modal closes
  const handleClose = () => {
    onClose();
    // Reset state after transition finishes
    setTimeout(() => {
      setStep(1);
      setFormData({
        [FIELD_KEYS.fullName]: "",
        [FIELD_KEYS.linkedin]: "",
        [FIELD_KEYS.email]: "",
        [FIELD_KEYS.orgName]: "",
        [FIELD_KEYS.industry]: "",
        [FIELD_KEYS.website]: "",
        [FIELD_KEYS.orgType]: "",
        [FIELD_KEYS.stage]: "",
        [FIELD_KEYS.teamSize]: "",
        [FIELD_KEYS.funding]: "",
        [FIELD_KEYS.traction]: "",
        [FIELD_KEYS.problem]: "",
        [FIELD_KEYS.story]: "",
        [FIELD_KEYS.campaign]: ""
      });
      setErrors({});
      setIsSuccess(false);
      setSubmitError("");
    }, 300);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Validation logic per step
  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData[FIELD_KEYS.fullName].trim()) newErrors[FIELD_KEYS.fullName] = "Full name is required";
      if (!formData[FIELD_KEYS.linkedin].trim()) {
        newErrors[FIELD_KEYS.linkedin] = "LinkedIn profile is required";
      } else if (!formData[FIELD_KEYS.linkedin].includes("linkedin.com")) {
        newErrors[FIELD_KEYS.linkedin] = "Please enter a valid LinkedIn URL";
      }
      if (!formData[FIELD_KEYS.email].trim()) {
        newErrors[FIELD_KEYS.email] = "Email is required";
      } else {
        const emailVal = formData[FIELD_KEYS.email].trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailVal)) {
          newErrors[FIELD_KEYS.email] = "Please enter a valid email address";
        }
      }
      if (!formData[FIELD_KEYS.orgName].trim()) newErrors[FIELD_KEYS.orgName] = "Organization name is required";
      if (!formData[FIELD_KEYS.industry].trim()) newErrors[FIELD_KEYS.industry] = "Industry field is required";
      if (!formData[FIELD_KEYS.website].trim()) {
        newErrors[FIELD_KEYS.website] = "Website URL is required";
      } else {
        const val = formData[FIELD_KEYS.website].trim();
        if (!val.includes(".") || val.length < 4) {
          newErrors[FIELD_KEYS.website] = "Please enter a valid website URL";
        }
      }
    } else if (step === 2) {
      if (!formData[FIELD_KEYS.orgType]) newErrors[FIELD_KEYS.orgType] = "Organization type is required";
      if (!formData[FIELD_KEYS.stage]) newErrors[FIELD_KEYS.stage] = "Stage is required";
      if (!formData[FIELD_KEYS.teamSize]) newErrors[FIELD_KEYS.teamSize] = "Team size is required";
    } else if (step === 3) {
      if (!formData[FIELD_KEYS.funding].trim()) newErrors[FIELD_KEYS.funding] = "This field is required";
      if (!formData[FIELD_KEYS.traction].trim()) newErrors[FIELD_KEYS.traction] = "This field is required";
      if (!formData[FIELD_KEYS.problem].trim()) newErrors[FIELD_KEYS.problem] = "This field is required";
    } else if (step === 4) {
      if (!formData[FIELD_KEYS.story].trim()) newErrors[FIELD_KEYS.story] = "This field is required";
      if (!formData[FIELD_KEYS.campaign].trim()) newErrors[FIELD_KEYS.campaign] = "This field is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleAutoPopulate = () => {
    setFormData({
      [FIELD_KEYS.fullName]: "Jonathan Berry",
      [FIELD_KEYS.linkedin]: "www.linkedin.com/in/jonathanbarryfritzler",
      [FIELD_KEYS.email]: "jonathan@futurehouse.ai",
      [FIELD_KEYS.orgName]: "Future House",
      [FIELD_KEYS.website]: "futurehouse.ai",
      [FIELD_KEYS.industry]: "Artificial Intelligence & Agentic Coding",
      [FIELD_KEYS.orgType]: "C-Corporation",
      [FIELD_KEYS.stage]: "Series A",
      [FIELD_KEYS.teamSize]: "11-50",
      [FIELD_KEYS.funding]: "Currently in Series A; raising $10M targeting close by late Q3 2026.",
      [FIELD_KEYS.traction]: "Raised $4M Seed. 25 enterprise pilots active, growing 20% MoM with $1.8M ARR.",
      [FIELD_KEYS.problem]: "Standard software development is too slow; autonomous agentic coding unlocks 10x developer velocity.",
      [FIELD_KEYS.story]: "Veteran tech operator and AI researcher who built and scaled two previous devtools platforms.",
      [FIELD_KEYS.campaign]: "Agentic workflow systems, autonomous LLM code verification, future of software economics."
    });
    setErrors({});
  };

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("https://futurehouseai.app.n8n.cloud/webhook/9a5153ad-e590-4c86-acee-9eab2f8b7fb5", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      // Generate slug and save form data in localStorage
      const orgName = formData[FIELD_KEYS.orgName] || "company";
      const slug = slugify(orgName) || "company";
      localStorage.setItem(`proposal_form_${slug}`, JSON.stringify(formData));
      localStorage.setItem("latest_proposal_slug", slug);

      // Open new tab at proposal page
      window.open(`/proposal/${slug}`, "_blank");

      setIsSuccess(true);
    } catch (error: any) {
      console.error("Form Submission Error:", error);
      setSubmitError(error.message || "Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Framer Motion presets
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring" as const, damping: 25, stiffness: 250 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isSubmitting) handleClose();
          }}
        >
          <motion.div
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(243,212,107,0.06)] overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Background Accent Gradients */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-radial-gradient(circle,rgba(243,212,107,0.08)_0%,transparent_70%) pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-radial-gradient(circle,rgba(0,240,255,0.05)_0%,transparent_70%) pointer-events-none -z-10" />

            {/* Top Close Button */}
            {!isSubmitting && (
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Auto Populate Button */}
            {!isSubmitting && !isSuccess && (
              <button
                type="button"
                onClick={handleAutoPopulate}
                className="absolute top-4 right-14 text-zinc-500 hover:text-[#f3d46b] border border-zinc-800 hover:border-[#f3d46b]/35 bg-zinc-950/45 transition-all px-3 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider cursor-pointer"
              >
                Demo Fill
              </button>
            )}

            {/* Success Layout */}
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-10">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <CheckCircle2 className="w-16 h-16 text-[#f3d46b] mb-6 drop-shadow-[0_0_15px_rgba(243,212,107,0.4)]" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white font-sans tracking-tight">Application Submitted Successfully</h3>
                <p className="text-zinc-400 text-sm mt-4 max-w-md font-sans leading-relaxed">
                  Your 12-Month IR Strategy is being prepared. Check your email shortly.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-8 px-8 h-12 bg-gradient-to-r from-[#f3d46b] to-[#fff1a6] text-black font-black uppercase text-xs tracking-widest rounded-xl hover:scale-102 hover:shadow-[0_0_20px_rgba(243,212,107,0.3)] transition-all font-sans"
                >
                  Done
                </button>
              </div>
            ) : isSubmitting ? (
              /* Loading Layout */
              <div className="flex flex-col items-center justify-center text-center py-16">
                <Loader2 className="w-12 h-12 text-[#f3d46b] animate-spin mb-6" />
                <h3 className="text-xl font-bold text-white font-sans">Generating your strategy...</h3>
                <p className="text-zinc-500 text-xs mt-2 font-mono uppercase tracking-wider">
                  Analyzing capital pipeline metrics
                </p>
              </div>
            ) : (
              /* Standard Multi-Step Form Layout */
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Form Header */}
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#f3d46b] font-bold">
                    12 Month IR Strategy
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 font-sans">
                    Get Your Free Strategy
                  </h3>
                  
                  {/* Progress Indicator */}
                  <div className="mt-4 flex items-center justify-between text-xs text-zinc-500 font-mono">
                    <span>Step {step} of 4</span>
                    <span>{Math.round((step / 4) * 100)}% Complete</span>
                  </div>
                  <div className="w-full h-1 bg-zinc-800/80 rounded-full mt-2 overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-[#f3d46b] to-[#fff1a6]"
                      initial={{ width: `${((step - 1) / 4) * 100}%` }}
                      animate={{ width: `${(step / 4) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Steps Content */}
                <div className="min-h-[280px]">
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">Full Name</label>
                            <input
                              type="text"
                              value={formData[FIELD_KEYS.fullName]}
                              onChange={(e) => handleInputChange(FIELD_KEYS.fullName, e.target.value)}
                              placeholder="John Doe"
                              className={`w-full h-11 px-4 rounded-xl bg-zinc-950/70 border ${errors[FIELD_KEYS.fullName] ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-zinc-800 focus:border-[#f3d46b]/60 focus:ring-1 focus:ring-[#f3d46b]/30"} text-white text-sm focus:outline-none transition-all`}
                            />
                            {errors[FIELD_KEYS.fullName] && (
                              <span className="text-[10px] text-red-400 font-mono block">{errors[FIELD_KEYS.fullName]}</span>
                            )}
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">LinkedIn Profile</label>
                            <input
                              type="text"
                              value={formData[FIELD_KEYS.linkedin]}
                              onChange={(e) => handleInputChange(FIELD_KEYS.linkedin, e.target.value)}
                              placeholder="linkedin.com/in/username"
                              className={`w-full h-11 px-4 rounded-xl bg-zinc-950/70 border ${errors[FIELD_KEYS.linkedin] ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-zinc-800 focus:border-[#f3d46b]/60 focus:ring-1 focus:ring-[#f3d46b]/30"} text-white text-sm focus:outline-none transition-all`}
                            />
                            {errors[FIELD_KEYS.linkedin] && (
                              <span className="text-[10px] text-red-400 font-mono block">{errors[FIELD_KEYS.linkedin]}</span>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">Email</label>
                            <input
                              type="email"
                              value={formData[FIELD_KEYS.email]}
                              onChange={(e) => handleInputChange(FIELD_KEYS.email, e.target.value)}
                              placeholder="your@email.com"
                              className={`w-full h-11 px-4 rounded-xl bg-zinc-950/70 border ${errors[FIELD_KEYS.email] ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-zinc-800 focus:border-[#f3d46b]/60 focus:ring-1 focus:ring-[#f3d46b]/30"} text-white text-sm focus:outline-none transition-all`}
                            />
                            {errors[FIELD_KEYS.email] && (
                              <span className="text-[10px] text-red-400 font-mono block">{errors[FIELD_KEYS.email]}</span>
                            )}
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">Organization Name</label>
                            <input
                              type="text"
                              value={formData[FIELD_KEYS.orgName]}
                              onChange={(e) => handleInputChange(FIELD_KEYS.orgName, e.target.value)}
                              placeholder="Acme Corp"
                              className={`w-full h-11 px-4 rounded-xl bg-zinc-950/70 border ${errors[FIELD_KEYS.orgName] ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-zinc-800 focus:border-[#f3d46b]/60 focus:ring-1 focus:ring-[#f3d46b]/30"} text-white text-sm focus:outline-none transition-all`}
                            />
                            {errors[FIELD_KEYS.orgName] && (
                              <span className="text-[10px] text-red-400 font-mono block">{errors[FIELD_KEYS.orgName]}</span>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">Website URL</label>
                            <input
                              type="text"
                              value={formData[FIELD_KEYS.website]}
                              onChange={(e) => handleInputChange(FIELD_KEYS.website, e.target.value)}
                              placeholder="https://example.com"
                              className={`w-full h-11 px-4 rounded-xl bg-zinc-950/70 border ${errors[FIELD_KEYS.website] ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-zinc-800 focus:border-[#f3d46b]/60 focus:ring-1 focus:ring-[#f3d46b]/30"} text-white text-sm focus:outline-none transition-all`}
                            />
                            {errors[FIELD_KEYS.website] && (
                              <span className="text-[10px] text-red-400 font-mono block">{errors[FIELD_KEYS.website]}</span>
                            )}
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">Industry</label>
                          <input
                            type="text"
                            value={formData[FIELD_KEYS.industry]}
                            onChange={(e) => handleInputChange(FIELD_KEYS.industry, e.target.value)}
                            placeholder="AI / Fintech / Biotech"
                            className={`w-full h-11 px-4 rounded-xl bg-zinc-950/70 border ${errors[FIELD_KEYS.industry] ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-zinc-800 focus:border-[#f3d46b]/60 focus:ring-1 focus:ring-[#f3d46b]/30"} text-white text-sm focus:outline-none transition-all`}
                          />
                          {errors[FIELD_KEYS.industry] && (
                            <span className="text-[10px] text-red-400 font-mono block">{errors[FIELD_KEYS.industry]}</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">Organization Type</label>
                          <select
                            value={formData[FIELD_KEYS.orgType]}
                            onChange={(e) => handleInputChange(FIELD_KEYS.orgType, e.target.value)}
                            className={`w-full h-11 px-4 rounded-xl bg-zinc-950 border ${errors[FIELD_KEYS.orgType] ? "border-red-500/50 focus:border-red-500" : "border-zinc-800 focus:border-[#f3d46b]/60"} text-white text-sm focus:outline-none transition-all`}
                          >
                            <option value="">Select type...</option>
                            <option value="C-Corporation">C-Corporation</option>
                            <option value="S-Corporation">S-Corporation</option>
                            <option value="LLC">LLC</option>
                            <option value="Partnership">Partnership</option>
                            <option value="Sole Proprietorship">Sole Proprietorship</option>
                            <option value="Other">Other</option>
                          </select>
                          {errors[FIELD_KEYS.orgType] && (
                            <span className="text-[10px] text-red-400 font-mono block">{errors[FIELD_KEYS.orgType]}</span>
                          )}
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">Funding Stage</label>
                          <select
                            value={formData[FIELD_KEYS.stage]}
                            onChange={(e) => handleInputChange(FIELD_KEYS.stage, e.target.value)}
                            className={`w-full h-11 px-4 rounded-xl bg-zinc-950 border ${errors[FIELD_KEYS.stage] ? "border-red-500/50 focus:border-red-500" : "border-zinc-800 focus:border-[#f3d46b]/60"} text-white text-sm focus:outline-none transition-all`}
                          >
                            <option value="">Select stage...</option>
                            <option value="Pre-Seed">Pre-Seed</option>
                            <option value="Seed">Seed</option>
                            <option value="Series A">Series A</option>
                            <option value="Series B">Series B</option>
                            <option value="Series C+">Series C+</option>
                            <option value="Bootstrapped">Bootstrapped</option>
                          </select>
                          {errors[FIELD_KEYS.stage] && (
                            <span className="text-[10px] text-red-400 font-mono block">{errors[FIELD_KEYS.stage]}</span>
                          )}
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">Team Size</label>
                          <select
                            value={formData[FIELD_KEYS.teamSize]}
                            onChange={(e) => handleInputChange(FIELD_KEYS.teamSize, e.target.value)}
                            className={`w-full h-11 px-4 rounded-xl bg-zinc-950 border ${errors[FIELD_KEYS.teamSize] ? "border-red-500/50 focus:border-red-500" : "border-zinc-800 focus:border-[#f3d46b]/60"} text-white text-sm focus:outline-none transition-all`}
                          >
                            <option value="">Select size...</option>
                            <option value="1 (Just Me)">1 (Just Me)</option>
                            <option value="2-5">2-5</option>
                            <option value="6-10">6-10</option>
                            <option value="11-50">11-50</option>
                            <option value="51-200">51-200</option>
                            <option value="200+">200+</option>
                          </select>
                          {errors[FIELD_KEYS.teamSize] && (
                            <span className="text-[10px] text-red-400 font-mono block">{errors[FIELD_KEYS.teamSize]}</span>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div className="space-y-1">
                          <label className="text-xs font-sans text-zinc-300 font-semibold block leading-tight">
                            What is your current funding stage, how much are you raising, and when do you need to close?
                          </label>
                          <textarea
                            value={formData[FIELD_KEYS.funding]}
                            onChange={(e) => handleInputChange(FIELD_KEYS.funding, e.target.value)}
                            placeholder="Detail your funding requirements and timeline..."
                            className={`w-full h-20 p-3 rounded-xl bg-zinc-950/70 border ${errors[FIELD_KEYS.funding] ? "border-red-500/50 focus:border-red-500" : "border-zinc-800 focus:border-[#f3d46b]/60"} text-white text-sm focus:outline-none resize-none transition-all`}
                          />
                          {errors[FIELD_KEYS.funding] && (
                            <span className="text-[10px] text-red-400 font-mono block">{errors[FIELD_KEYS.funding]}</span>
                          )}
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-sans text-zinc-300 font-semibold block leading-tight">
                            Summarize your traction: revenue stage, key metrics, prior funding, and notable wins.
                          </label>
                          <textarea
                            value={formData[FIELD_KEYS.traction]}
                            onChange={(e) => handleInputChange(FIELD_KEYS.traction, e.target.value)}
                            placeholder="Outline your revenue metrics, customer count, partnerships, etc..."
                            className={`w-full h-20 p-3 rounded-xl bg-zinc-950/70 border ${errors[FIELD_KEYS.traction] ? "border-red-500/50 focus:border-red-500" : "border-zinc-800 focus:border-[#f3d46b]/60"} text-white text-sm focus:outline-none resize-none transition-all`}
                          />
                          {errors[FIELD_KEYS.traction] && (
                            <span className="text-[10px] text-red-400 font-mono block">{errors[FIELD_KEYS.traction]}</span>
                          )}
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-sans text-zinc-300 font-semibold block leading-tight">
                            What problem do you solve, and why is right now the critical moment to solve it?
                          </label>
                          <textarea
                            value={formData[FIELD_KEYS.problem]}
                            onChange={(e) => handleInputChange(FIELD_KEYS.problem, e.target.value)}
                            placeholder="Explain the market demand, pain points, and current urgency..."
                            className={`w-full h-20 p-3 rounded-xl bg-zinc-950/70 border ${errors[FIELD_KEYS.problem] ? "border-red-500/50 focus:border-red-500" : "border-zinc-800 focus:border-[#f3d46b]/60"} text-white text-sm focus:outline-none resize-none transition-all`}
                          />
                          {errors[FIELD_KEYS.problem] && (
                            <span className="text-[10px] text-red-400 font-mono block">{errors[FIELD_KEYS.problem]}</span>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {step === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div className="space-y-1">
                          <label className="text-xs font-sans text-zinc-300 font-semibold block leading-tight">
                            What's your origin story in this industry, and what have you built or done before? Highlight key credentials.
                          </label>
                          <textarea
                            value={formData[FIELD_KEYS.story]}
                            onChange={(e) => handleInputChange(FIELD_KEYS.story, e.target.value)}
                            placeholder="Highlight your domain history, past milestones, exits, or key credentials..."
                            className={`w-full h-28 p-3 rounded-xl bg-zinc-950/70 border ${errors[FIELD_KEYS.story] ? "border-red-500/50 focus:border-red-500" : "border-zinc-800 focus:border-[#f3d46b]/60"} text-white text-sm focus:outline-none resize-none transition-all`}
                          />
                          {errors[FIELD_KEYS.story] && (
                            <span className="text-[10px] text-red-400 font-mono block">{errors[FIELD_KEYS.story]}</span>
                          )}
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-sans text-zinc-300 font-semibold block leading-tight">
                            Where are the core themes and topics that you would like to cover in your 12 month campaign to cultivate your subject matter expertise?
                          </label>
                          <textarea
                            value={formData[FIELD_KEYS.campaign]}
                            onChange={(e) => handleInputChange(FIELD_KEYS.campaign, e.target.value)}
                            placeholder="List main thought-leadership concepts, research, or campaign vectors..."
                            className={`w-full h-28 p-3 rounded-xl bg-zinc-950/70 border ${errors[FIELD_KEYS.campaign] ? "border-red-500/50 focus:border-red-500" : "border-zinc-800 focus:border-[#f3d46b]/60"} text-white text-sm focus:outline-none resize-none transition-all`}
                          />
                          {errors[FIELD_KEYS.campaign] && (
                            <span className="text-[10px] text-red-400 font-mono block">{errors[FIELD_KEYS.campaign]}</span>
                          )}
                        </div>

                        {submitError && (
                          <div className="p-3 bg-red-950/40 border border-red-500/20 text-red-400 text-xs rounded-xl font-sans text-center">
                            {submitError}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-between border-t border-zinc-900 pt-6">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 h-11 border border-zinc-800 text-zinc-400 hover:text-white rounded-xl hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-wider font-sans"
                    >
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-8 h-11 bg-gradient-to-r from-[#f3d46b] to-[#fff1a6] text-black font-black uppercase text-xs tracking-widest rounded-xl hover:scale-102 hover:shadow-[0_0_20px_rgba(243,212,107,0.3)] transition-all font-sans"
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-8 h-11 bg-gradient-to-r from-[#f3d46b] to-[#fff1a6] text-black font-black uppercase text-xs tracking-widest rounded-xl hover:scale-102 hover:shadow-[0_0_20px_rgba(243,212,107,0.3)] transition-all font-sans"
                    >
                      Submit Application
                    </button>
                  )}
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
