import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { WhoItsForSection } from "@/components/landing/WhoItsForSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { ApplicationSection } from "@/components/landing/ApplicationSection";
import { FooterSection } from "@/components/landing/FooterSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-gold/30">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <WhoItsForSection />
      <TestimonialsSection />
      <ApplicationSection />
      <FooterSection />
    </main>
  );
}
