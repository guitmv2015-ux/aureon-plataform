import type { Metadata } from "next";

const SITE_NAME = "Aureon Partners";
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://aureonpartners.pro";
const DEFAULT_DESCRIPTION =
  "Aureon Partners é uma gestora independente de patrimônio que combina rigor institucional, advisory personalizado e tecnologia para proteger e expandir capital de longo prazo.";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

interface ConstructMetadataParams {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
  type?: "website" | "article";
}

/**
 * Helper único para gerar metadata consistente (título, OG, Twitter Card,
 * canonical) em todas as páginas. Evita duplicação e garante que nenhuma
 * página "esqueça" tags essenciais de SEO.
 */
export function constructMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_OG_IMAGE,
  path = "/",
  noIndex = false,
  type = "website",
}: ConstructMetadataParams = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Gestão Patrimonial Institucional`;
  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
      locale: "pt_BR",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large" },
        },
  };
}

export const SITE = {
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  ogImage: DEFAULT_OG_IMAGE,
  social: {
    linkedin: "https://www.linkedin.com/company/aureon-partners",
    instagram: "https://www.instagram.com/aureonpartners",
  },
  contact: {
    email: "contato@aureonpartners.pro",
    phone: "+55 11 4000-0000",
  },
} as const;
