import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/animated-section";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-panel py-28 md:py-36">
      <div className="absolute inset-0 bg-noise-grid opacity-60" aria-hidden />
      <Container className="relative z-10 text-center">
        <AnimatedSection direction="up">
          <span className="ledger-tick justify-center">Próximo passo</span>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-display-md text-ivory md:text-display-lg">
            Pronto para estruturar o próximo capítulo do seu patrimônio?
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base text-slate">
            Uma conversa inicial, sem compromisso, para entender se há alinhamento entre seus
            objetivos e a forma como trabalhamos.
          </p>
          <div className="mt-9">
            <Button size="lg" asChild>
              <Link href="/contato">
                Agendar conversa <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
