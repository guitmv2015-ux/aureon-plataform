import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { RichText } from "@payloadcms/richtext-lexical/react";

import { constructMetadata } from "@/lib/seo";
import { Container } from "@/components/shared/container";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { getPayloadClient } from "@/payload/get-payload-client";
import { formatDate } from "@/lib/utils";
import { SITE } from "@/lib/seo";

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      where: { status: { equals: "published" } },
      limit: 100,
      depth: 0,
    });
    return docs.map((doc) => ({ slug: doc.slug as string }));
  } catch {
    // Banco ainda não provisionado no momento do build — SSR cobre o resto.
    return [];
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug }, status: { equals: "published" } },
    depth: 2,
    limit: 1,
  });
  return docs[0] ?? null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return constructMetadata({ title: "Artigo não encontrado", noIndex: true });

  const coverImage =
    post.coverImage && typeof post.coverImage === "object"
      ? (post.coverImage as { url?: string }).url
      : undefined;

  return constructMetadata({
    title: post.title as string,
    description: post.excerpt as string,
    path: `/insights/${post.slug}`,
    image: coverImage,
    type: "article",
  });
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const author =
    post.author && typeof post.author === "object" ? (post.author as { name?: string }) : null;
  const coverImage =
    post.coverImage && typeof post.coverImage === "object"
      ? (post.coverImage as { url?: string; alt?: string })
      : null;

  return (
    <article className="bg-ink pb-32 pt-40">
      <ArticleJsonLd
        title={post.title as string}
        description={post.excerpt as string}
        url={`${SITE.url}/insights/${post.slug}`}
        imageUrl={coverImage?.url ?? SITE.ogImage}
        datePublished={(post.publishedAt as string) ?? new Date().toISOString()}
        authorName={author?.name ?? "Equipe Aureon Partners"}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Insights", path: "/insights" },
          { name: post.title as string, path: `/insights/${post.slug}` },
        ]}
      />

      <Container className="max-w-3xl">
        {post.category ? (
          <span className="text-xs font-medium uppercase tracking-wider text-brass">
            {(post.category as string).replace(/-/g, " ")}
          </span>
        ) : null}
        <h1 className="mt-4 font-display text-display-md text-ivory md:text-display-lg">
          {post.title as string}
        </h1>
        <div className="mt-6 flex items-center gap-3 text-sm text-slate">
          <span>{author?.name ?? "Equipe Aureon Partners"}</span>
          <span aria-hidden>·</span>
          <span>{post.publishedAt ? formatDate(post.publishedAt as string) : ""}</span>
        </div>

        {coverImage?.url ? (
          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-lg border border-line">
            <Image src={coverImage.url} alt={coverImage.alt ?? (post.title as string)} fill className="object-cover" />
          </div>
        ) : null}

        <div className="prose prose-invert mt-12 max-w-none prose-headings:font-display prose-headings:text-ivory prose-p:text-slate prose-p:leading-relaxed prose-a:text-brass prose-strong:text-ivory">
          <RichText data={post.content} />
        </div>
      </Container>
    </article>
  );
}
