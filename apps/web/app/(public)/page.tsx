import { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero";
import { LiveStatsSection } from "@/components/sections/live-stats";
import { PackagesSection } from "@/components/sections/packages";
import { CoveragePreview } from "@/components/sections/coverage-preview";
import { GamingSection } from "@/components/sections/gaming";
import { StreamingSection } from "@/components/sections/streaming";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { UptimeSection } from "@/components/sections/uptime";
import { MobileAppSection } from "@/components/sections/mobile-app";
import { FAQSection } from "@/components/sections/faq";
import { PublicFooter } from "@/components/sections/footer";
import { PublicNavbar } from "@/components/sections/navbar";

export const metadata: Metadata = {
  title: "Premium Fiber Internet for Bangladesh",
  description: "Experience ultra-fast fiber internet with Bluebird Online. Speeds up to 1 Gbps, 99.9% uptime, and 24/7 local support.",
};

export default function HomePage() {
  return (
    <main className="relative">
      <PublicNavbar />
      <HeroSection />
      <LiveStatsSection />
      <PackagesSection />
      <CoveragePreview />
      <GamingSection />
      <StreamingSection />
      <UptimeSection />
      <TestimonialsSection />
      <MobileAppSection />
      <FAQSection />
      <PublicFooter />
    </main>
  );
}
