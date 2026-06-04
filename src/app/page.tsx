import { Navbar } from "@/components/landing/Navbar";
import { LiquidCapitalScene } from "@/components/landing/LiquidCapitalScene";
import {
  ArrowRight,
  BarChart3,
  DatabaseZap,
  LockKeyhole,
  RadioTower,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  Waves,
  Zap,
} from "lucide-react";

const signals = [
  {
    label: "Investor CRM",
    value: "Every relationship in motion",
    icon: Users,
  },
  {
    label: "Data Room",
    value: "Tracked access, clean permissions",
    icon: LockKeyhole,
  },
  {
    label: "Follow-up Engine",
    value: "Consistent nurture without spreadsheet drift",
    icon: RadioTower,
  },
];

const platformModules = [
  {
    title: "Capital Pipeline",
    copy: "Move investors from first signal to signed commitment with stages, tasks, notes, and ownership built into one operating surface.",
    icon: BarChart3,
  },
  {
    title: "Automated Data Room",
    copy: "Give the right investor the right material, then know what they opened, revisited, and ignored before the next call.",
    icon: DatabaseZap,
  },
  {
    title: "Credibility Loop",
    copy: "Turn interviews, updates, and founder proof into a repeatable trust machine that compounds across the raise.",
    icon: ShieldCheck,
  },
];

const proofPoints = [
  ["78%", "investors prefer founders with visible authority"],
  ["93%", "allocators review founder content before committing"],
  ["45%", "higher success from consistent follow-up cadence"],
  ["20+", "markets connected through operator networks"],
  ["200+", "Partners trust DealMachine to power their raise"],
  ["$100M+", "Capital raised through the platform"],
];

const testimonials = [
  {
    quote: "This system brought clarity and structure to our capital raise.",
    author: "Manuel Reyes",
    role: "Marketing Agency Owner",
    initials: "MR",
  },
  {
    quote: "The automated pipeline and secure data room allowed us to manage LP relationships at scale.",
    author: "Presley Morgan",
    role: "E-commerce Founder",
    initials: "PM",
  },
  {
    quote: "I can now coordinate multiple investor relationships without losing track of opportunities.",
    author: "Edwin Carter",
    role: "Local Business Owner",
    initials: "EC",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#020403] text-white selection:bg-[#d7ff6f]/25">
      <LiquidCapitalScene />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_50%_8%,rgba(255,255,255,0.13),transparent_24%),linear-gradient(90deg,rgba(2,4,3,0.68),rgba(2,4,3,0.08)_44%,rgba(2,4,3,0.7)),linear-gradient(180deg,rgba(2,4,3,0.08),rgba(2,4,3,0.72)_86%)]" />
      <div className="bg-noise pointer-events-none fixed inset-0 z-[2] opacity-[0.08] mix-blend-soft-light" />
      <Navbar />

      <section id="hero" className="relative z-10 flex min-h-[88svh] items-center px-5 pb-10 pt-28 sm:px-8 lg:px-12">
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.55fr)] lg:items-end">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 border border-[#f3d46b]/35 bg-black/35 px-3 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#f3d46b] backdrop-blur-md">
              <Waves className="h-4 w-4" />
              WebGL capital environment
            </div>
            <h1 className="max-w-5xl text-5xl font-black leading-[1.0] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-[7.2rem]">
              The Fortune is in <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f3d46b] via-[#fff1a6] to-[#f3d46b]">
                the Follow Up
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#d7e4df] sm:text-xl">
              A futuristic investor operating system where pipeline, data room, authority, and follow-up move like liquid capital around the founder.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#apply"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#f3d46b] px-6 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-[#fff1a6]"
              >
                <Zap className="h-4 w-4 fill-current" />
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#platform"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/[0.08] px-6 text-sm font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md transition hover:border-[#7effee]/70 hover:bg-[#7effee]/10"
              >
                <Sparkles className="h-4 w-4" />
                View Platform
              </a>
            </div>
          </div>

          <div className="border border-white/15 bg-black/40 p-5 backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7effee]">Capital telemetry</span>
              <span className="h-2 w-2 bg-[#f3d46b] shadow-[0_0_18px_rgba(243,212,107,0.8)]" />
            </div>
            <div className="grid gap-4">
              {signals.map((signal) => (
                <div key={signal.label} className="grid grid-cols-[40px_1fr] gap-4 border border-white/10 bg-white/[0.045] p-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-[#f3d46b]/30 bg-[#f3d46b]/10 text-[#f3d46b]">
                    <signal.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{signal.label}</p>
                    <p className="mt-1 text-sm leading-6 text-[#b8c9c3]">{signal.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="current" className="relative z-10 flex min-h-screen items-center px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.75fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#7effee]">The current</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-normal text-white sm:text-6xl">
              Stop raising capital from scattered islands.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#c7d5d0]">
              DealMachine turns every investor touchpoint into a visible stream: who is warm, who has materials, who needs proof, and who is ready to commit.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {proofPoints.map(([value, label]) => (
              <div key={value} className="border border-white/12 bg-black/38 p-6 backdrop-blur-lg">
                <div className="text-5xl font-black tracking-normal text-[#f3d46b]">{value}</div>
                <p className="mt-4 text-sm leading-6 text-[#d0ddd8]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="platform" className="relative z-10 px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#f3d46b]">Platform</p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-normal text-white sm:text-6xl">
              A capital raise stack that feels alive.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {platformModules.map((module) => (
              <article key={module.title} className="group border border-white/12 bg-[#06100f]/70 p-6 backdrop-blur-xl transition hover:border-[#7effee]/55 hover:bg-[#071918]/78">
                <div className="mb-8 flex h-12 w-12 items-center justify-center border border-[#7effee]/30 bg-[#7effee]/10 text-[#7effee]">
                  <module.icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-white transition group-hover:text-[#7effee]">{module.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#b9c9c4]">{module.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="proof" className="relative z-10 px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#7effee]">Operator proof</p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-normal text-white sm:text-6xl">
              Trusted by Active Capital Operators
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-16">
            {testimonials.map((t) => (
              <div key={t.author} className="group border border-white/12 bg-black/35 p-8 backdrop-blur-md flex flex-col justify-between transition hover:border-[#7effee]/50">
                <blockquote className="text-lg leading-relaxed text-[#d0ddd8] italic font-light">
                  &quot;{t.quote}&quot;
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#f3d46b] to-[#fff1a6] text-sm font-bold text-black shadow-md">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-[#f3d46b] transition-colors">{t.author}</p>
                    <p className="text-xs text-[#7effee] font-semibold mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Three key items */}
          <div className="grid gap-4 md:grid-cols-3 border-t border-white/10 pt-16">
            {["Founder authority", "Allocator readiness", "Commitment momentum"].map((item, index) => (
              <div key={item} className="flex items-center gap-4 border border-white/12 bg-black/35 p-5 backdrop-blur-md">
                <span className="flex h-10 w-10 items-center justify-center bg-[#f3d46b] text-sm font-black text-black">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-base font-semibold text-white">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="relative z-10 px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#f3d46b]">Founding partner access</p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-normal text-white sm:text-6xl">
              Build the raise before the raise builds pressure.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#c7d5d0]">
              Selected operators receive priority setup, a capital pipeline review, and a launch sequence designed around their current round.
            </p>
          </div>

          <form className="grid gap-5 border border-white/14 bg-black/48 p-5 backdrop-blur-xl md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-white">
              Full name
              <input name="name" className="h-12 rounded-lg border border-white/12 bg-[#07100f] px-4 text-sm font-normal text-white outline-none transition placeholder:text-[#71817b] focus:border-[#7effee]" placeholder="Jane Operator" required />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-white">
              Email
              <input type="email" name="email" className="h-12 rounded-lg border border-white/12 bg-[#07100f] px-4 text-sm font-normal text-white outline-none transition placeholder:text-[#71817b] focus:border-[#7effee]" placeholder="jane@fund.com" required />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-white">
              Phone number
              <input type="tel" name="phone" className="h-12 rounded-lg border border-white/12 bg-[#07100f] px-4 text-sm font-normal text-white outline-none transition placeholder:text-[#71817b] focus:border-[#7effee]" placeholder="+1 (555) 000-0000" required />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-white">
              Company
              <input name="company" className="h-12 rounded-lg border border-white/12 bg-[#07100f] px-4 text-sm font-normal text-white outline-none transition placeholder:text-[#71817b] focus:border-[#7effee]" placeholder="Northstar Capital" required />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-white md:col-span-2">
              LinkedIn profile
              <input type="url" name="linkedin" className="h-12 rounded-lg border border-white/12 bg-[#07100f] px-4 text-sm font-normal text-white outline-none transition placeholder:text-[#71817b] focus:border-[#7effee]" placeholder="https://linkedin.com/in/username" required />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-white">
              Raise target
              <select name="raiseTarget" className="h-12 rounded-lg border border-white/12 bg-[#07100f] px-4 text-sm font-normal text-white outline-none transition focus:border-[#7effee]">
                <option>$1M - $5M</option>
                <option>$5M - $20M</option>
                <option>$20M+</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-white">
              Already raised capital
              <select name="alreadyRaised" className="h-12 rounded-lg border border-white/12 bg-[#07100f] px-4 text-sm font-normal text-white outline-none transition focus:border-[#7effee]">
                <option>$0 / Bootstrapped</option>
                <option>Under $500k</option>
                <option>$500k - $2M</option>
                <option>$2M+</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-white md:col-span-2">
              What needs to move faster?
              <textarea name="message" className="min-h-28 rounded-lg border border-white/12 bg-[#07100f] px-4 py-3 text-sm font-normal text-white outline-none transition placeholder:text-[#71817b] focus:border-[#7effee]" placeholder="Investor follow-up, data room access, credibility assets, partner coordination..." />
            </label>
            <button className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#f3d46b] px-6 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-[#fff1a6] md:col-span-2">
              <Send className="h-4 w-4" />
              Request Access
            </button>
          </form>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-5 py-10 text-sm text-[#8fa09a] sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <img 
                src="/narwal_logo.png" 
                alt="Narwhal Logo" 
                style={{ height: "30px", width: "auto", filter: "invert(1)", mixBlendMode: "screen" }}
              />
              <span className="font-semibold text-white">DealMachine</span>
            </div>
            <p className="text-xs text-zinc-400 italic">
              Swim with the whales. Become a unicorn.
            </p>
          </div>
          <p>Powered by Future House. © 2026 The Deal Machine Ecosystem.</p>
        </div>
      </footer>
    </main>
  );
}
