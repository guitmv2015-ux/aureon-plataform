import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { PostCard, type PostCardData } from "@/components/marketing/post-card";
import { getPayloadClient } from "@/payload/get-payload-client";

async function getLatestPosts(): Promise<PostCardData[]> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      where: { status: { equals: "published" } },
      sort: "-publishedAt",
      limit: 3,
      depth: 1,
    });

    return docs.map((doc) => ({
      slug: doc.slug as string,
      title: doc.title as string,
      excerpt: doc.excerpt as string,
      category: (doc.category as string) ?? null,
      publishedAt: (doc.publishedAt as string) ?? null,
      coverImage:
        doc.coverImage && typeof doc.coverImage === "object"
          ? {
              url: (doc.coverImage as { url?: string }).url ?? null,
              alt: (doc.coverImage as { alt?: string }).alt ?? null,
            }
          : null,
    }));
  } catch (error) {
    // Em ambientes onde o banco/CMS ainda não foi provisionado (ex: primeiro
    // `npm run dev` antes de `db:push`), a home não deve quebrar — apenas
    // exibe o estado vazio abaixo.
    console.warn("Não foi possível carregar posts do Payload:", error);
    return [];
  }
}

export async function InsightsSection() {
  const posts = await getLatestPosts();

  return (
    <section className="section-pad bg-ink">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Insights"
            title="Análises e perspectivas para decisões patrimoniais mais sólidas."
          />
          <Button variant="outline" asChild>
            <Link href="/insights">
              Ver todos os insights <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {posts.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-lg border border-dashed border-line p-12 text-center">
            <p className="text-sm text-slate">
              Nossos primeiros artigos institucionais serão publicados em breve.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
