import Link from "next/link";
import { Linkedin, Instagram } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Separator } from "@/components/ui/separator";
import { NewsletterForm } from "@/components/marketing/newsletter-form";
import { SITE } from "@/lib/seo";

const COLUMNS = [
  {
    title: "Aureon Partners",
    links: [
      { label: "Sobre", href: "/sobre" },
      { label: "Serviços", href: "/servicos" },
      { label: "Insights", href: "/insights" },
      { label: "Contato", href: "/contato" },
    ],
  },
  {
    title: "Acesso",
    links: [
      { label: "Área do Cliente", href: "/login" },
      { label: "Criar conta", href: "/cadastro" },
      { label: "Recuperar senha", href: "/recuperar-senha" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Política de Privacidade", href: "/legal/privacidade" },
      { label: "Termos de Uso", href: "/legal/termos" },
      { label: "Informações Regulatórias", href: "/legal/regulatorio" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-panel">
      <Container className="section-pad">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="font-display text-lg tracking-wide text-ivory">
              AUREON <span className="text-brass">PARTNERS</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate">
              Gestão patrimonial institucional para famílias, empresas e instituições que exigem
              rigor, transparência e visão de longo prazo.
            </p>
            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-wider text-slate">
                Receba nossos insights
              </p>
              <div className="mt-3">
                <NewsletterForm />
              </div>
            </div>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="text-xs font-medium uppercase tracking-wider text-slate">
                {column.title}
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ivory/80 transition-colors hover:text-brass"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-12" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-slate-dim">
            © {new Date().getFullYear()} Aureon Partners. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={SITE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-slate transition-colors hover:text-brass"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-slate transition-colors hover:text-brass"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
