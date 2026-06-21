import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { constructMetadata } from "@/lib/seo";
import { Container } from "@/components/shared/container";
import { ContactForm } from "@/components/marketing/contact-form";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Contato",
  description:
    "Fale com um consultor da Aureon Partners e entenda como podemos estruturar seu patrimônio com rigor institucional.",
  path: "/contato",
});

export default function ContactPage() {
  return (
    <section className="bg-ink pb-32 pt-40">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="ledger-tick">Contato</span>
            <h1 className="mt-5 font-display text-display-md text-ivory md:text-display-lg">
              Vamos conversar sobre o seu próximo passo.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate">
              Preencha o formulário e um consultor sênior entrará em contato em até um dia
              útil. Todas as conversas iniciais são confidenciais e sem compromisso.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-3 text-sm text-ivory/80">
                <Mail className="h-4 w-4 text-brass" /> {SITE.contact.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-ivory/80">
                <Phone className="h-4 w-4 text-brass" /> {SITE.contact.phone}
              </div>
              <div className="flex items-center gap-3 text-sm text-ivory/80">
                <MapPin className="h-4 w-4 text-brass" /> São Paulo, Brasil
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-elevated p-8 md:p-10">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
