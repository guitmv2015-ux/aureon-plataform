import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/seo";
import { Container } from "@/components/shared/container";

const LEGAL_DOCS: Record<string, { title: string; body: string[] }> = {
  privacidade: {
    title: "Política de Privacidade",
    body: [
      "A Aureon Partners coleta apenas os dados necessários para prestar consultoria patrimonial e cumprir obrigações legais e regulatórias.",
      "Dados pessoais informados em formulários de contato são utilizados exclusivamente para retorno comercial e nunca são vendidos a terceiros.",
      "Você pode solicitar a exclusão dos seus dados a qualquer momento através do e-mail contato@aureonpartners.pro, nos termos da LGPD.",
    ],
  },
  termos: {
    title: "Termos de Uso",
    body: [
      "O uso deste site e da área do cliente está condicionado à aceitação destes termos.",
      "As informações disponibilizadas no site têm caráter informativo e não constituem recomendação de investimento individualizada.",
      "A Aureon Partners reserva-se o direito de suspender o acesso à área do cliente em caso de uso indevido da plataforma.",
    ],
  },
  regulatorio: {
    title: "Informações Regulatórias",
    body: [
      "A Aureon Partners atua em conformidade com a regulamentação aplicável à atividade de consultoria de valores mobiliários.",
      "Esta plataforma é um ambiente institucional de demonstração de produto e não representa, por si só, uma instituição financeira registrada.",
      "Para detalhes sobre registro e credenciamento profissional dos consultores, contate nossa equipe de compliance.",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(LEGAL_DOCS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = LEGAL_DOCS[slug];
  return constructMetadata({ title: doc?.title ?? "Documento", path: `/legal/${slug}` });
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = LEGAL_DOCS[slug];

  if (!doc) notFound();

  return (
    <section className="bg-ink pb-32 pt-40">
      <Container className="max-w-2xl">
        <h1 className="font-display text-display-md text-ivory">{doc.title}</h1>
        <div className="mt-8 space-y-5">
          {doc.body.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed text-slate">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
