"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Briefcase, 
  Globe, 
  Users, 
  Target, 
  ArrowRight, 
  Calendar, 
  Loader2, 
  CheckCircle2, 
  BookOpen, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileText,
  MapPin,
  Mail
} from "lucide-react";

// Mock template fallback for direct page access
const MOCK_FORM_DATA = {
  "full_name": "Sarah Connor",
  "LinkedIn": "https://linkedin.com/in/sarah-connor",
  "Organization Name": "Acme Quantum Tech",
  "Website URL": "acmequantum.com",
  "Industry": "Quantum Computing & Defense AI",
  "Organization Type": "C-Corporation",
  "Stage": "Series A",
  "Team Size": "11-50",
  "What is your current funding stage, how much are you raising, and when do you need to close?": "Raising Series A of $12M, targeting close in late Q4 2026 to fund quantum cryogenic expansion.",
  "Summarize your traction: revenue stage, key metrics, prior funding, and notable wins.": "$1.5M ARR, 8 active pilot contracts with Fortune 500 defense contractors, $3M Seed raised in 2025.",
  "What problem do you solve, and why is right now the critical moment to solve it?": "Classic decryption algorithms face quantum breakthroughs; secure quantum key distribution is needed immediately.",
  "What's your origin story in this industry, and what have you built or done before? Highlight key credentials.": "Former Oak Ridge National Lab physicists with two successful exits in high-performance networking.",
  "Where are the core themes and topics that you would like to cover in your 12 month campaign to cultivate your subject matter expertise?": "Post-quantum cryptography, cryogenic hardware scaling, sovereign secure communications."
};

interface ProposalData {
  title: string;
  summary: string;
  business_goal: string;
  target_segments: string[];
  investor_filters: {
    thesis: string;
    preference: string;
    horizon: string;
    check_size: string;
  };
  positioning_hook: string[];
  campaign: {
    series_title: string;
    host: string;
  };
  brand_colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  rows: {
    month: number;
    title: string;
    objective: string;
    guests: string;
    narrative: string;
  }[];
}

function hexToRgb(hex: string): string {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "243, 212, 107"; // fallback gold
}

function generateLocalFallbackStrategy(formData: Record<string, string>): ProposalData {
  const orgName = formData["Organization Name"] || "Your Company";
  const industry = formData["Industry"] || "Technology";
  const host = formData["full_name"] || "Founding Partner";
  const stage = formData["Stage"] || "Series A";
  const fundingGoal = formData["What is your current funding stage, how much are you raising, and when do you need to close?"] || "capital growth";
  const traction = formData["Summarize your traction: revenue stage, key metrics, prior funding, and notable wins."] || "early operations";
  const problem = formData["What problem do you solve, and why is right now the critical moment to solve it?"] || "inefficiencies in the industry";
  const story = formData["What's your origin story in this industry, and what have you built or done before? Highlight key credentials."] || "years of technical experience";

  let primary = "#f3d46b"; // gold
  let secondary = "#00f0ff"; // cyan
  let accent = "#fff1a6";

  const lowerName = orgName.toLowerCase();
  if (lowerName.includes("acme") || lowerName.includes("robo")) {
    primary = "#ef4444"; // red
    secondary = "#3b82f6"; // blue
    accent = "#f87171";
  } else if (lowerName.includes("future") || lowerName.includes("house") || lowerName.includes("agent")) {
    primary = "#10b981"; // emerald green
    secondary = "#6366f1"; // indigo
    accent = "#34d399";
  } else if (lowerName.includes("quantum") || lowerName.includes("cyber")) {
    primary = "#8b5cf6"; // purple
    secondary = "#ec4899"; // pink
    accent = "#a78bfa";
  } else if (lowerName.includes("deal") || lowerName.includes("machine")) {
    primary = "#f3d46b"; // DealMachine gold
    secondary = "#00f0ff"; // cyan
    accent = "#fff1a6";
  }

  return {
    title: `12-Month IR Strategy for ${orgName}`,
    summary: `Based on your traction (${traction.substring(0, 120)}...) and your fundraising goal (${fundingGoal}), we have calibrated a 12-month campaign. This framework translates your origin story (${story.substring(0, 100)}...) into investor conviction.\n\nWe structure your narrative progression to first solve the category positioning problem before scaling outbound allocators. This timeline guarantees your authority loop aligns with institutional expectations.`,
    business_goal: `${industry.split("/")[0].trim()} Leadership → Outbound Pipeline → ${stage} Funding Close`,
    target_segments: [
      `Strategic ${industry.split("/")[0].trim()} VCs`,
      "Early-Stage Tech Syndicates",
      "Family Offices & Private Yield Funds",
      "Institutional Lead Co-Investors"
    ],
    investor_filters: {
      thesis: `Allocation in high-density ${industry.split("/")[0].trim()} opportunities`,
      preference: "Lead investors with strong operational background in SaaS/DeepTech",
      horizon: "7 to 10 Year venture capital exit windows",
      check_size: stage.includes("Seed") ? "$250k - $750k" : "$1M - $3M"
    },
    positioning_hook: [
      `Solving ${problem.toLowerCase().replace(/\.$/, "")} through automated structural precision.`,
      `Leveraging next-generation ${industry.split("/")[0].trim()} infrastructure to compound capital velocity.`
    ],
    campaign: {
      series_title: `The Future of ${industry.split("/")[0].trim()}`,
      host: host
    },
    brand_colors: {
      primary,
      secondary,
      accent
    },
    rows: [
      {
        month: 1,
        title: "Category Architecture & Problem Urgency",
        objective: "Isolate the macro friction point and establish urgency.",
        guests: "Domain researchers and veteran operators",
        narrative: `Deconstruct the legacy bottlenecks that ${orgName} solves. Contrast manual inefficiencies with high-velocity automated outcomes.`
      },
      {
        month: 2,
        title: "Industry Structural Shift & The Macro Trigger",
        objective: "Highlight the structural tailwinds forcing immediate change.",
        guests: "Venture partners and industry analysts",
        narrative: `Contextualize why solving this problem right now is critical. Detail the regulatory, technical, or market triggers.`
      },
      {
        month: 3,
        title: "The Legacy Cost Paradigm",
        objective: "Establish the exact financial and operational leakages in current solutions.",
        guests: "Early pilot partners and technical advisors",
        narrative: "Quantify the loss structures. Position the category shift not as a feature enhancement, but as a mandatory architectural rewrite."
      },
      {
        month: 4,
        title: "High-Fidelity Demonstration & Proof Points",
        objective: "Showcase the core product architecture and metrics.",
        guests: "Lead engineers and early validation partners",
        narrative: `Focus on product validation. Highlight how ${orgName}'s unique technology bypasses the typical industry constraints.`
      },
      {
        month: 5,
        title: "Traction Milestones & Customer Conviction",
        objective: "Translate early pilots into scalable evidence.",
        guests: "Existing customers and pilot champions",
        narrative: `Leverage your traction (${traction.substring(0, 80)}...) to showcase commercial momentum. Present case studies of customer retention.`
      },
      {
        month: 6,
        title: "Unit Economics & Sovereign Scale",
        objective: "Verify the leverage and margins of the operating model.",
        guests: "Financial advisors and strategic growth directors",
        narrative: "Prove that scaling the solution creates compounding margins. De-risk the investment by detailing cost boundaries."
      },
      {
        month: 7,
        title: "TAM Realization & Outbound Velocity",
        objective: "Outline the go-to-market channels and outbound conversion.",
        guests: "GTM leaders and distribution partners",
        narrative: "Demonstrate a repeatable growth playbook. Show how relationship nodes and authority loops are capitalized systematically."
      },
      {
        month: 8,
        title: "The Network Multiplier Effect",
        objective: "Map out secondary distribution loops and ecosystem integrations.",
        guests: "Platform partners and API developers",
        narrative: "Outline the integrations that lock in customers. Position the platform as the default operational center for the sector."
      },
      {
        month: 9,
        title: "Global Scalability & System Boundaries",
        objective: "Address compliance, cross-border operations, and system bounds.",
        guests: "Regulatory counsels and international directors",
        narrative: "Validate regulatory posture and global compliance frameworks. Prove structural readiness for cross-border expansion."
      },
      {
        month: 10,
        title: "Defensibility, Intellectual Property & Moats",
        objective: "Isolate proprietary assets and high-friction copy vectors.",
        guests: "IP attorneys and core technical founders",
        narrative: `Explain the technical moats. Detail how ${orgName} protects its unique advantages from fast-followers.`
      },
      {
        month: 11,
        title: "Ecosystem Alignment & Future Outlook",
        objective: "Position the long-term vision of the enterprise.",
        guests: "Key industry visionaries and board members",
        narrative: "Present the 5-year outlook. Align the immediate fundraise with category dominance milestones."
      },
      {
        month: 12,
        title: "Capital Allocator Synthesis & Raising Timelines",
        objective: "Finalize terms, syndication mechanics, and close schedules.",
        guests: "Lead allocators and founding advisory cohort",
        narrative: `Synthesize the Series A funding close plan. Target closure for ${fundingGoal.substring(0, 100)} to execute the mapped operational expansion.`
      }
    ]
  };
}

export default function ProposalPage() {
  const params = useParams();
  const router = useRouter();
  
  const slug = (params.company_name as string) || "company";
  
  const [formData, setFormData] = useState<Record<string, string> | null>(null);
  const [strategy, setStrategy] = useState<ProposalData | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState("Initializing generator...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Retrieve cached lead form data
    let data: Record<string, string> | null = null;
    try {
      const stored = localStorage.getItem(`proposal_form_${slug}`);
      if (stored) {
        data = JSON.parse(stored);
      } else {
        // Fall back to latest slug or mock data
        const latestSlug = localStorage.getItem("latest_proposal_slug");
        if (latestSlug) {
          const latestStored = localStorage.getItem(`proposal_form_${latestSlug}`);
          if (latestStored) {
            data = JSON.parse(latestStored);
          }
        }
      }
    } catch (e) {
      console.error("Failed to read form data", e);
    }

    if (!data) {
      console.warn("No form data found in localStorage. Loading mock template fallback.");
      data = MOCK_FORM_DATA;
    }
    setFormData(data);

    // 2. Main generation orchestrator
    async function generateStrategy(formDataToUse: Record<string, string>) {
      setIsLoading(true);
      setError(null);

      // Check if already cached in localStorage
      try {
        const cachedStrategy = localStorage.getItem(`proposal_strategy_${slug}`);
        const cachedLogo = localStorage.getItem(`proposal_logo_${slug}`);
        if (cachedStrategy) {
          setStrategy(JSON.parse(cachedStrategy));
          if (cachedLogo) setLogoUrl(cachedLogo);
          setIsLoading(false);
          return;
        }
      } catch (e) {
        console.error("Failed to read cached strategy", e);
      }

      const website = formDataToUse["Website URL"] || "";
      const orgName = formDataToUse["Organization Name"] || "Your Company";

      // Parallel step: Scrape logo and call Gemini
      try {
        setLoadingStep("Scraping corporate branding assets...");
        
        let scrapedLogo: string | null = null;
        if (website) {
          try {
            const logoRes = await fetch(`/api/scrape-logo?url=${encodeURIComponent(website)}`);
            if (logoRes.ok) {
              const logoData = await logoRes.json();
              scrapedLogo = logoData.logoUrl || logoData.fallback;
            }
          } catch (e) {
            console.error("Logo scraper failed, using fallbacks", e);
          }
        }
        
        if (scrapedLogo) {
          setLogoUrl(scrapedLogo);
          localStorage.setItem(`proposal_logo_${slug}`, scrapedLogo);
        }

        setLoadingStep("Calibrating your quantum strategy...");
        
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyAb8RN6LWoIwmbHi08CFAwATNhmc2pvd8s8Pj-5H24ZpHRAUiCQ";
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`;

        const promptText = `
You are the elite DealMachine Investor Relations strategy AI engine.
Generate a comprehensive, highly strategic 12-month Investor Relations (IR) and narrative campaign strategy for the following company:
- Organization Name: ${formDataToUse["Organization Name"]}
- Website URL: ${formDataToUse["Website URL"]}
- Industry: ${formDataToUse["Industry"]}
- Organization Type: ${formDataToUse["Organization Type"]}
- Stage: ${formDataToUse["Stage"]}
- Team Size: ${formDataToUse["Team Size"]}
- Current Funding/Raising Goal: ${formDataToUse["What is your current funding stage, how much are you raising, and when do you need to close?"]}
- Traction & Metrics: ${formDataToUse["Summarize your traction: revenue stage, key metrics, prior funding, and notable wins."]}
- Problem Solved & Urgency: ${formDataToUse["What problem do you solve, and why is right now the critical moment to solve it?"]}
- Origin Story & Credentials: ${formDataToUse["What's your origin story in this industry, and what have you built or done before? Highlight key credentials."]}
- Core Campaign Themes: ${formDataToUse["Where are the core themes and topics that you would like to cover in your 12 month campaign to cultivate your subject matter expertise?"]}
- Submitter Name (Campaign Host): ${formDataToUse["full_name"]}

Requirements:
1. Return ONLY valid JSON matching this exact structure:
{
  "title": "12-Month IR Strategy for ${orgName}",
  "summary": "2 short paragraphs explaining the strategic thesis and positioning approach.",
  "business_goal": "validated insight → scale objective → fundraise objective",
  "target_segments": ["Segment 1", "Segment 2", "Segment 3", "Segment 4"],
  "investor_filters": {
    "thesis": "Specific thesis filter matching the profile",
    "preference": "Investor background preference",
    "horizon": "Expected capital horizon",
    "check_size": "Target check sizes matching stage"
  },
  "positioning_hook": ["Strong hook line 1", "Strong hook line 2"],
  "campaign": {
    "series_title": "Title of the 12-month thought leadership/campaign series",
    "host": "${formDataToUse["full_name"]}"
  },
  "brand_colors": {
    "primary": "Suggest a primary brand hex color that fits this company's industry, name, and profile. Use high-contrast dark-mode friendly palette.",
    "secondary": "Suggest a secondary brand hex color.",
    "accent": "Suggest an accent brand hex color."
  },
  "rows": [
    { "month": 1, "title": "Campaign theme/sub-theme", "objective": "Month objective", "guests": "Ideal guests/partners to target or feature", "narrative": "Narrative detail" },
    ... 12 months total
  ]
}

2. Strict Narrative Progression for rows:
- Months 1-3: Problem + Category definition.
- Months 4-6: Product + Proof (traction, customers, technical validation).
- Months 7-9: Scale + Market (expansion mechanics, industry momentum).
- Months 10-12: Moat + Investment (defensibility, scaling returns).
- Month 12: Must specifically include details about their funding stage, raise purpose, and timing based on their input: "${formDataToUse["What is your current funding stage, how much are you raising, and when do you need to close?"]}".

Ensure that the JSON is fully valid and strictly conformant to this schema. Do not output any markdown formatting tags (like \`\`\`json) in the response text, just the raw JSON structure.
`;

        const response = await fetch(geminiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: promptText
                  }
                ]
              }
            ],
            generationConfig: {
              responseMimeType: "application/json"
            }
          })
        });

        if (!response.ok) {
          throw new Error(`Gemini API error. Status: ${response.status}`);
        }

        const resData = await response.json();
        const rawJsonText = resData.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!rawJsonText) {
          throw new Error("Empty response received from Gemini.");
        }

        const parsedStrategy: ProposalData = JSON.parse(rawJsonText.trim());
        
        // Ensure colors exist
        if (!parsedStrategy.brand_colors) {
          parsedStrategy.brand_colors = {
            primary: "#f3d46b",
            secondary: "#00f0ff",
            accent: "#fff1a6"
          };
        }

        setStrategy(parsedStrategy);
        localStorage.setItem(`proposal_strategy_${slug}`, JSON.stringify(parsedStrategy));
        setIsLoading(false);
      } catch (err: any) {
        console.error("Strategy generation failed, using high-fidelity local generator fallback:", err);
        try {
          const fallbackStrategy = generateLocalFallbackStrategy(formDataToUse);
          setStrategy(fallbackStrategy);
          localStorage.setItem(`proposal_strategy_${slug}`, JSON.stringify(fallbackStrategy));
          setIsLoading(false);
        } catch (fallbackErr) {
          console.error("Local generator failed too:", fallbackErr);
          setError(err.message || "Failed to compile strategy. Please try again.");
          setIsLoading(false);
        }
      }
    }

    generateStrategy(data);
  }, [slug]);

  // Loading State UI
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative font-sans">
        <div 
          className="absolute w-[450px] h-[450px] rounded-full blur-[130px] pointer-events-none opacity-40 animate-pulse"
          style={{ background: "radial-gradient(circle, #f3d46b 0%, transparent 70%)" }}
        />
        <div className="z-10 flex flex-col items-center text-center space-y-6 max-w-md">
          <Loader2 className="w-16 h-16 text-[#f3d46b] animate-spin mb-4" />
          <h2 className="text-2xl font-bold tracking-tight">Calibrating your quantum strategy...</h2>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">{loadingStep}</p>
        </div>
      </div>
    );
  }

  // Error State UI
  if (error || !strategy || !formData) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative font-sans">
        <div className="border border-red-500/20 bg-red-950/20 p-8 rounded-2xl max-w-md text-center space-y-6">
          <h2 className="text-xl font-bold text-red-400">Configuration Error</h2>
          <p className="text-zinc-400 text-sm">{error || "Failed to load strategy details."}</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full h-11 bg-red-900/40 border border-red-500/30 text-white rounded-xl hover:bg-red-900/60 transition-all font-semibold text-sm"
          >
            Retry Strategy Generation
          </button>
        </div>
      </div>
    );
  }

  const primaryColor = strategy.brand_colors?.primary || "#f3d46b";
  const secondaryColor = strategy.brand_colors?.secondary || "#00f0ff";
  const accentColor = strategy.brand_colors?.accent || "#fff1a6";

  const primaryRgb = hexToRgb(primaryColor);
  const secondaryRgb = hexToRgb(secondaryColor);

  return (
    <div 
      style={{
        "--primary-brand": primaryColor,
        "--secondary-brand": secondaryColor,
        "--accent-brand": accentColor,
        "--primary-rgb": primaryRgb,
        "--secondary-rgb": secondaryRgb,
      } as React.CSSProperties}
      className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-[var(--primary-brand)]/20 selection:text-[var(--primary-brand)]"
    >
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div 
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-[140px] opacity-20"
          style={{ background: `radial-gradient(circle, var(--primary-brand) 0%, transparent 75%)` }}
        />
        <div 
          className="absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full blur-[160px] opacity-10"
          style={{ background: `radial-gradient(circle, var(--secondary-brand) 0%, transparent 75%)` }}
        />
      </div>

      <div className="container mx-auto px-6 py-12 max-w-5xl space-y-12">
        {/* Cover / Page Header */}
        <header className="relative border border-zinc-800/80 bg-zinc-900/30 rounded-3xl p-8 sm:p-12 shadow-[0_0_50px_rgba(var(--primary-rgb),0.03)] backdrop-blur-md overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-radial-gradient(circle,rgba(var(--primary-rgb),0.05)_0%,transparent_70%) pointer-events-none -z-10" />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-zinc-800/50">
            {/* Scraped Company Logo */}
            {logoUrl ? (
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/5 rounded-2xl border border-zinc-800 flex items-center justify-center p-2.5 overflow-hidden">
                  <img src={logoUrl} alt={`${formData["Organization Name"]} Logo`} className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-bold">Prepared For</span>
                  <h3 className="text-lg font-bold text-white tracking-tight">{formData["Organization Name"]}</h3>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-brand)] to-[var(--secondary-brand)] rounded-2xl flex items-center justify-center font-black text-black text-2xl shadow-lg">
                  {formData["Organization Name"].charAt(0)}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-bold">Prepared For</span>
                  <h3 className="text-lg font-bold text-white tracking-tight">{formData["Organization Name"]}</h3>
                </div>
              </div>
            )}

            {/* DealMachine Brand Stamp */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-widest text-zinc-400">DEAL</span>
              <span className="text-xs font-black tracking-widest text-[var(--primary-brand)]">MACHINE</span>
              <div className="h-1.5 w-1.5 bg-[var(--primary-brand)] rounded-full animate-pulse" />
            </div>
          </div>

          <div className="mt-8 space-y-4 max-w-3xl">
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[var(--primary-brand)] font-bold">
              Exclusive Investor Relations Strategy
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {strategy.title}
            </h1>
            <p className="text-zinc-400 text-sm font-light leading-relaxed">
              This roadmap structures your narrative campaign, target investor positioning, and authority loop funnel across a 12-month window. Calibrated specifically for your raising goal and domain traction.
            </p>
          </div>

          {/* Submitter details grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-zinc-800/50 text-xs font-mono">
            <div>
              <span className="text-zinc-600 uppercase block mb-1">Representative</span>
              <a href={formData["LinkedIn"]} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[var(--primary-brand)] flex items-center gap-1 transition-colors">
                {formData["full_name"]} <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div>
              <span className="text-zinc-600 uppercase block mb-1">Industry Sector</span>
              <span className="text-zinc-300 block">{formData["Industry"]}</span>
            </div>
            <div>
              <span className="text-zinc-600 uppercase block mb-1">Company Stage</span>
              <span className="text-zinc-300 block">{formData["Stage"]}</span>
            </div>
            <div>
              <span className="text-zinc-600 uppercase block mb-1">Team Size</span>
              <span className="text-zinc-300 block">{formData["Team Size"]} employees</span>
            </div>
          </div>
        </header>

        {/* Page 1: Strategic Synthesis & Goals */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7 border border-zinc-800/80 bg-zinc-900/20 rounded-2xl p-6 sm:p-8 space-y-6 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[var(--primary-brand)]" /> Executive Framework
            </h3>
            <div className="text-zinc-400 text-sm space-y-4 leading-relaxed font-light whitespace-pre-line">
              {strategy.summary}
            </div>
          </div>

          <div className="md:col-span-5 space-y-6">
            {/* Positioning Hook Callout */}
            <div className="border border-zinc-800/80 bg-zinc-900/20 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[var(--primary-brand)]" />
              <h4 className="text-xs font-mono uppercase text-zinc-500 tracking-wider mb-3">Positioning Hook</h4>
              <div className="space-y-3">
                {strategy.positioning_hook.map((hook, idx) => (
                  <p key={idx} className="text-sm font-semibold text-white leading-snug italic font-serif">
                    "{hook}"
                  </p>
                ))}
              </div>
            </div>

            {/* Flowchart Path */}
            <div className="border border-zinc-800/80 bg-zinc-900/20 rounded-2xl p-6 backdrop-blur-sm space-y-4">
              <h4 className="text-xs font-mono uppercase text-zinc-500 tracking-wider">Business Alignment Goal</h4>
              <div className="flex flex-col gap-2 font-mono text-[10px]">
                {strategy.business_goal.split("→").map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full border border-zinc-800 bg-zinc-950 flex items-center justify-center text-[var(--primary-brand)] font-bold">
                        0{idx + 1}
                      </div>
                      {idx < 2 && <div className="w-0.5 h-6 bg-zinc-800" />}
                    </div>
                    <div className="bg-zinc-950/80 border border-zinc-800/60 rounded-lg p-2.5 flex-1 capitalize tracking-wider text-zinc-300">
                      {step.trim()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Page 2: Target Allocation & Filters */}
        <section className="border border-zinc-800/80 bg-zinc-900/20 rounded-3xl p-6 sm:p-8 space-y-8 backdrop-blur-sm">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-[var(--primary-brand)]" /> Target Allocator Profiles
            </h3>
            <p className="text-zinc-500 text-xs mt-1">Calibrated institutional filters mapped to the funding trajectory.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Target Segments list */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider">Strategic Allocator Segments</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {strategy.target_segments.map((segment, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-zinc-850 bg-zinc-950/40 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--primary-brand)] shrink-0" />
                    <span className="text-xs text-zinc-300 leading-tight">{segment}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Investor Filters Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider">Pre-flight Investor Filters</h4>
              <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
                <div className="p-3 border border-zinc-850 bg-zinc-950/40 rounded-xl space-y-1">
                  <span className="text-zinc-600 block uppercase">Thesis Fit</span>
                  <span className="text-zinc-300 font-sans font-medium line-clamp-2">{strategy.investor_filters.thesis}</span>
                </div>
                <div className="p-3 border border-zinc-850 bg-zinc-950/40 rounded-xl space-y-1">
                  <span className="text-zinc-600 block uppercase">Preference</span>
                  <span className="text-zinc-300 font-sans font-medium line-clamp-2">{strategy.investor_filters.preference}</span>
                </div>
                <div className="p-3 border border-zinc-850 bg-zinc-950/40 rounded-xl space-y-1">
                  <span className="text-zinc-600 block uppercase">Horizon</span>
                  <span className="text-zinc-300 font-sans font-medium line-clamp-2">{strategy.investor_filters.horizon}</span>
                </div>
                <div className="p-3 border border-zinc-850 bg-zinc-950/40 rounded-xl space-y-1">
                  <span className="text-zinc-600 block uppercase">Target Check</span>
                  <span className="text-zinc-300 font-sans font-medium line-clamp-2">{strategy.investor_filters.check_size}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Page 3: 12-Month Campaign Roadmap */}
        <section className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--primary-brand)]" /> 12-Month Campaign Roadmap
            </h3>
            <p className="text-zinc-500 text-xs mt-1">
              Narrative Series: <span className="text-[var(--primary-brand)] font-bold">"{strategy.campaign.series_title}"</span> • Hosted by {strategy.campaign.host}
            </p>
          </div>

          <div className="border border-zinc-800/80 bg-zinc-900/10 rounded-3xl overflow-hidden backdrop-blur-md">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-950/60 font-mono uppercase text-zinc-500 tracking-wider">
                    <th className="py-4 px-4 font-bold text-center w-16">Month</th>
                    <th className="py-4 px-4 font-bold w-44">Campaign Theme</th>
                    <th className="py-4 px-4 font-bold w-48">Core Objective</th>
                    <th className="py-4 px-4 font-bold w-40">Ideal Guests/Targets</th>
                    <th className="py-4 px-4 font-bold">Narrative Focus & Milestones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {strategy.rows.map((row, idx) => {
                    // Determine phase names and styling
                    let phaseTag = "";
                    let phaseColor = "border-l-2 border-[var(--primary-brand)]";
                    let phaseBg = "bg-zinc-950/10";
                    if (row.month <= 3) {
                      phaseTag = "Phase I: Problem + Category";
                      phaseColor = "border-l-2 border-[var(--primary-brand)]";
                    } else if (row.month <= 6) {
                      phaseTag = "Phase II: Product + Proof";
                      phaseColor = "border-l-2 border-purple-500";
                      phaseBg = "bg-purple-950/5";
                    } else if (row.month <= 9) {
                      phaseTag = "Phase III: Scale + Market";
                      phaseColor = "border-l-2 border-[var(--secondary-brand)]";
                      phaseBg = "bg-cyan-950/5";
                    } else {
                      phaseTag = "Phase IV: Moat + Investment";
                      phaseColor = "border-l-2 border-emerald-500";
                      phaseBg = "bg-emerald-950/5";
                    }

                    const showPhaseHeader = row.month === 1 || row.month === 4 || row.month === 7 || row.month === 10;

                    return (
                      <React.Fragment key={idx}>
                        {showPhaseHeader && (
                          <tr className="bg-zinc-950/80 border-y border-zinc-900/50">
                            <td colSpan={5} className="py-2.5 px-4 font-mono text-[10px] uppercase tracking-wider text-zinc-400 font-bold">
                              {phaseTag}
                            </td>
                          </tr>
                        )}
                        <tr className={`${phaseBg} transition-colors hover:bg-zinc-900/40 align-top`}>
                          <td className="py-4 px-4 font-mono text-center font-bold text-zinc-300">
                            {row.month}
                          </td>
                          <td className={`py-4 px-4 font-bold text-white leading-tight ${phaseColor}`}>
                            {row.title}
                          </td>
                          <td className="py-4 px-4 text-zinc-300 leading-snug">
                            {row.objective}
                          </td>
                          <td className="py-4 px-4 text-zinc-400 font-mono text-xs leading-normal">
                            {row.guests}
                          </td>
                          <td className="py-4 px-4 text-zinc-400 font-light leading-relaxed text-xs">
                            {row.narrative}
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Bottom Booking Callout */}
        <section className="relative border border-zinc-800 bg-[#050505] rounded-3xl p-8 sm:p-12 shadow-[0_0_50px_rgba(var(--primary-rgb),0.03)] backdrop-blur-md overflow-hidden text-center max-w-3xl mx-auto space-y-6">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none -z-10" 
            style={{ background: "radial-gradient(circle, rgba(var(--primary-rgb),0.04) 0%, transparent 70%)" }}
          />

          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[var(--primary-brand)] font-bold">
            Execute Campaign
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Ready to activate this campaign roadmap?
          </h2>
          <p className="text-zinc-400 text-sm font-light max-w-lg mx-auto leading-relaxed">
            Let's operationalize your 12-month positioning narrative, unlock high-density data room tracking, and establish automated investor sequences.
          </p>
          <div className="pt-4">
            <a
              href="https://advisory.futurehouse.ai/jonathanbarry"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-[var(--primary-brand)] to-[var(--accent-brand)] px-8 text-xs font-black uppercase tracking-widest text-black transition-all hover:scale-102 hover:shadow-[0_0_25px_rgba(var(--primary-rgb),0.3)] cursor-pointer"
            >
              Book a Call with Jonathan Barry
            </a>
          </div>
        </section>
      </div>

      {/* Mini footer */}
      <footer className="py-12 border-t border-zinc-900 bg-zinc-950 mt-12 text-center text-[10px] text-zinc-600 font-mono">
        <p>This Investor Relations Strategy report is confidential and intended solely for the representative of {formData["Organization Name"]}.</p>
        <p className="mt-1">Powered by DealMachine IR Engine. Co-calibrated by Gemini AI.</p>
      </footer>
    </div>
  );
}
