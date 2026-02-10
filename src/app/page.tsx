import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { StrategySection } from "@/components/landing/StrategySection";
import { PipelineSection } from "@/components/landing/PipelineSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FooterSection } from "@/components/landing/FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <StrategySection />
      <PipelineSection />
      <PricingSection />
      <FooterSection />
    </main>
  );
}
