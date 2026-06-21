import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedSection } from "@/components/shared/animated-section";
import { PhilosophySection } from "@/components/marketing/philosophy-section";
import { StatsSection } from "@/components/marketing/stats-section";
import { CtaSection } from "@/components/marketing/cta-section";

export const metadata: Metadata = constructMetadata({
  title: "Sobre",
  description:
    "Conheça a história, a filosofia e os princípios de governança que orientam a Aureon Partners.",
  path: "/sobre",
});

const PRINCIPLES = [
  {
    title: "Fidúcia acima de tudo",
    description:
      "Atuamos como fiduciários: cada recomendação é avaliada exclusivamente pelo interesse do cliente.",
  },
  {
    title: "Simplicidade estrutural",
    description:
      "Preferimos estruturas simples e auditáveis a arquiteturas complexas que dificultam o entendimento do cliente.",
  },
  {
    title: "Horizonte de décadas",
    description:
      "Patrimônio se constrói e se preserva em décadas, não em trimestres — é assim que medimos sucesso.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink pb-24 pt-40">
        <Container>
          <span className="ledger-tick">Sobre a Aureon</span>
          <h1 className="mt-5 max-w-3xl font-display text-display-md text-ivory md:text-display-lg">
            Construída para durar mais do que um ciclo de mercado.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate md:text-lg">
            A Aureon Partners nasceu da convicção de que gestão patrimonial sólida exige
            independência total entre quem aconselha e quem vende produtos financeiros. Ao
            longo de quase duas décadas, essa convicção se manteve intacta — mesmo quando o
            mercado pressionou na direção contrária.
          </p>
        </Container>
      </section>

      <StatsSection />
      <PhilosophySection />

      <section className="section-pad bg-panel">
        <Container>
          <SectionHeading
            eyebrow="Princípios"
            title="O que não negociamos, independente do ciclo de mercado."
          />
          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
            {PRINCIPLES.map((principle, index) => (
              <AnimatedSection key={principle.title} delay={index * 0.08}>
                <div className="ledger-rule mb-5 max-w-[2.5rem]" />
                <h3 className="font-display text-lg text-ivory">{principle.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{principle.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
