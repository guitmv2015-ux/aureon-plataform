import { Container } from "@/components/shared/container";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Counter } from "@/components/shared/counter";
import { LedgerDivider } from "@/components/shared/ledger-divider";

const STATS = [
  { value: 4.2, decimals: 1, prefix: "R$ ", suffix: " bi", label: "Patrimônio sob gestão" },
  { value: 18, suffix: " anos", label: "De atuação no mercado" },
  { value: 120, suffix: "+", label: "Famílias e instituições atendidas" },
  { value: 7, label: "Países com clientes ativos" },
];

export function StatsSection() {
  return (
    <section className="bg-ink">
      <Container>
        <LedgerDivider />
        <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-4 md:py-20">
          {STATS.map((stat, index) => (
            <AnimatedSection key={stat.label} delay={index * 0.08}>
              <p className="font-mono font-display text-display-md text-brass md:text-display-lg">
                <Counter value={stat.value} decimals={stat.decimals} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-slate">{stat.label}</p>
            </AnimatedSection>
          ))}
        </div>
        <LedgerDivider />
      </Container>
    </section>
  );
}
