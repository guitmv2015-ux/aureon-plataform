import type { Metadata } from "next";
import { Landmark, ShieldCheck, TrendingUp, Building2 } from "lucide-react";
import { constructMetadata } from "@/lib/seo";
import { Container } from "@/components/shared/container";
import { AnimatedSection } from "@/components/shared/animated-section";
import { LedgerDivider } from "@/components/shared/ledger-divider";
import { CtaSection } from "@/components/marketing/cta-section";

export const metadata: Metadata = constructMetadata({
  title: "Serviços",
  description:
    "Wealth Management, Investment Advisory, Governança Patrimonial e Sucessória e Private Equity — conheça em detalhes os serviços da Aureon Partners.",
  path: "/servicos",
});

const SERVICES = [
  {
    slug: "wealth-management",
    icon: Landmark,
    title: "Wealth Management",
    summary: "Gestão de carteiras multi-ativos com disciplina institucional.",
    items: [
      "Definição de política de investimento (IPS) personalizada",
      "Alocação multi-ativos com rebalanceamento sistemático",
      "Relatórios de performance trimestrais com benchmark claro",
      "Otimização tributária dentro dos limites da estrutura do cliente",
    ],
  },
  {
    slug: "investment-advisory",
    icon: TrendingUp,
    title: "Investment Advisory",
    summary: "Análise independente, sem conflito com produtos proprietários.",
    items: [
      "Due diligence própria de gestores e produtos de terceiros",
      "Acesso a renda fixa privada, fundos exclusivos e ativos internacionais",
      "Monitoramento contínuo de risco de crédito e de mercado",
      "Segunda opinião independente sobre carteiras existentes",
    ],
  },
  {
    slug: "governanca-sucessoria",
    icon: ShieldCheck,
    title: "Governança Patrimonial e Sucessória",
    summary: "Estruturas que protegem o patrimônio entre gerações.",
    items: [
      "Estruturação de holdings patrimoniais e familiares",
      "Planejamento sucessório integrado a aspectos tributários e jurídicos",
      "Elaboração de protocolos de governança familiar",
      "Mediação de conselhos de família e comitês de investimento",
    ],
  },
  {
    slug: "private-equity",
    icon: Building2,
    title: "Private Equity & Special Situations",
    summary: "Acesso seletivo a capital privado com acompanhamento ativo.",
    items: [
      "Curadoria de oportunidades de private equity e venture capital",
      "Due diligence financeira, jurídica e operacional própria",
      "Negociação de termos e acompanhamento pós-investimento",
      "Estratégias de saída alinhadas ao horizonte do investidor",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-ink pb-20 pt-40">
        <Container>
          <span className="ledger-tick">Serviços</span>
          <h1 className="mt-5 max-w-3xl font-display text-display-md text-ivory md:text-display-lg">
            Advisory completo, estruturado em quatro frentes complementares.
          </h1>
        </Container>
      </section>

      {SERVICES.map((service, index) => (
        <section key={service.slug} id={service.slug} className="bg-ink py-16 md:py-20">
          <Container>
            {index > 0 ? <LedgerDivider /> : null}
            <AnimatedSection className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <service.icon className="h-8 w-8 text-brass" strokeWidth={1.5} />
                <h2 className="mt-5 font-display text-2xl text-ivory md:text-3xl">
                  {service.title}
                </h2>
                <p className="mt-3 text-base text-slate">{service.summary}</p>
              </div>
              <ul className="space-y-4">
                {service.items.map((item) => (
                  <li key={item} className="flex gap-3 border-b border-line pb-4 text-sm text-ivory/85">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rotate-45 bg-brass" />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </Container>
        </section>
      ))}

      <CtaSection />
    </>
  );
}
