import { Container } from "@/components/shared/container";
import { AnimatedSection } from "@/components/shared/animated-section";

export function PhilosophySection() {
  return (
    <section className="section-pad bg-ink">
      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <AnimatedSection>
            <span className="ledger-tick">Filosofia</span>
            <h2 className="mt-5 font-display text-display-md text-ivory">
              Disciplina antes de performance.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-slate">
              <p>
                Performance é resultado. Disciplina é processo. A Aureon Partners existe para
                que o processo nunca seja sacrificado em nome de um resultado de curto prazo.
              </p>
              <p>
                Isso significa dizer não a produtos que não fazem sentido para o objetivo do
                cliente, reportar perdas com a mesma transparência que reportamos ganhos, e
                tratar cada mandato com o mesmo rigor — independente do tamanho do patrimônio.
              </p>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-line pt-8">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-slate-dim">
                  Independência
                </dt>
                <dd className="mt-2 text-sm text-ivory/80">
                  Sem comissões de produtos próprios. A remuneração vem do cliente, não do
                  produto recomendado.
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-slate-dim">
                  Transparência
                </dt>
                <dd className="mt-2 text-sm text-ivory/80">
                  Relatórios claros, sem letras pequenas — cada taxa e cada decisão é
                  documentada e explicada.
                </dd>
              </div>
            </dl>
          </AnimatedSection>

          {/* Painel visual abstrato: representa "camadas de governança" através
              de linhas hairline sobrepostas — assinatura visual sem depender
              de fotografia (que exigiria banco de imagens externo). */}
          <AnimatedSection direction="none" className="relative aspect-[4/5] w-full">
            <div className="absolute inset-0 rounded-lg border border-line bg-panel" />
            <div className="absolute inset-6 rounded-lg border border-line-strong" />
            <div className="absolute inset-12 rounded-lg border border-brass/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-10 text-center">
              <span className="font-display text-display-md text-brass">18</span>
              <span className="max-w-[14rem] text-xs uppercase tracking-[0.2em] text-slate-dim">
                Anos estruturando patrimônio com o mesmo rigor, ciclo após ciclo
              </span>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
