import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { Hero } from "@/components/marketing/hero";
import { CredentialsBar } from "@/components/marketing/credentials-bar";
import { StatsSection } from "@/components/marketing/stats-section";
import { ServicesSection } from "@/components/marketing/services-section";
import { PhilosophySection } from "@/components/marketing/philosophy-section";
import { ApproachSection } from "@/components/marketing/approach-section";
import { InsightsSection } from "@/components/marketing/insights-section";
import { CtaSection } from "@/components/marketing/cta-section";

export const metadata: Metadata = constructMetadata({
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <CredentialsBar />
      <StatsSection />
      <ServicesSection />
      <PhilosophySection />
      <ApproachSection />
      <InsightsSection />
      <CtaSection />
    </>
  );
}
