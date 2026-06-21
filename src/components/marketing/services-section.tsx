import Link from "next/link";
import { Landmark, ShieldCheck, TrendingUp, Building2, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedSection } from "@/components/shared/animated-section";

const PILLARS = [
  {
    icon: Landmark,
    title: "Wealth Management",
    slug: "wealth-management",
    description:
      "Construção e gestão de carteiras multi-ativos alinhadas a objetivos de longo prazo, com rebalanceamento disciplinado e relatórios trimestrais detalhados.",
  },
  {
    icon: TrendingUp,
    title: "Investment Advisory",
    slug: "investment-advisory",
    description:
      "Análise independente de oportunidades em renda fixa, renda variável e ativos alternativos, sem conflito de interesse com produtos proprietários.",
  },
  {
    icon: ShieldCheck,
    title: "Governança Patrimonial e Sucessória",
    slug: "governanca-sucessoria",
    description:
      "Estruturação de holdings, planejamento sucessório e protocolos de governança familiar que reduzem riscos e preservam o patrimônio entre gerações.",
  },
  {
    icon: Building2,
    title: "Private Equity & Special Situations",
    slug: "private-equity",
    description:
      "Acesso a oportunidades selecionadas de capital privado e situações especiais, com due diligence própria e acompanhamento ativo do investimento.",
  },
];

export function ServicesSection() {
  return (
    <section id="servicos" className="section-pad bg-panel">
      <Container>
        <SectionHeading
          eyebrow="O que fazemos"
          title="Quatro pilares, um único compromisso: proteger e expandir capital."
          description="Cada mandato começa pelo entendimento profundo do objetivo do cliente — não por um produto a ser vendido."
        />

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
          {PILLARS.map((pillar, index) => (
            <AnimatedSection key={pillar.slug} delay={index * 0.06} className="bg-ink p-8 md:p-10">
              <pillar.icon className="h-7 w-7 text-brass" strokeWidth={1.5} />
              <h3 className="mt-6 font-display text-xl text-ivory">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{pillar.description}</p>
              <Link
                href={`/servicos#${pillar.slug}`}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brass transition-colors hover:text-brass-light"
              >
                Saiba mais <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
