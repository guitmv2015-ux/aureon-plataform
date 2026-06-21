import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedSection } from "@/components/shared/animated-section";

const STEPS = [
  {
    number: "01",
    title: "Diagnóstico",
    description:
      "Mapeamento completo do patrimônio atual, objetivos, tolerância a risco e horizonte de tempo — antes de qualquer recomendação.",
  },
  {
    number: "02",
    title: "Arquitetura",
    description:
      "Desenho da estrutura de alocação e governança sob medida, com cenários testados e justificativa documentada para cada escolha.",
  },
  {
    number: "03",
    title: "Implementação",
    description:
      "Execução cuidadosa, com custódia segregada e seleção de instrumentos que priorizam custo, liquidez e adequação ao perfil do cliente.",
  },
  {
    number: "04",
    title: "Acompanhamento",
    description:
      "Revisões trimestrais formais, rebalanceamento disciplinado e disponibilidade direta do consultor sênior responsável pelo mandato.",
  },
];

export function ApproachSection() {
  return (
    <section className="section-pad bg-panel">
      <Container>
        <SectionHeading
          eyebrow="Como trabalhamos"
          title="Um processo replicável — porque consistência não pode depender de sorte."
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-4">
          {STEPS.map((step, index) => (
            <AnimatedSection key={step.number} delay={index * 0.08} className="relative">
              <span className="font-display text-display-md text-line-strong">{step.number}</span>
              <h3 className="mt-4 font-display text-lg text-ivory">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{step.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
