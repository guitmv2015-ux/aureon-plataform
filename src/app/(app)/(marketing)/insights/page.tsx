import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { Container } from "@/components/shared/container";
import { PostCard, type PostCardData } from "@/components/marketing/post-card";
import { getPayloadClient } from "@/payload/get-payload-client";

export const metadata: Metadata = constructMetadata({
  title: "Insights",
  description: "Análises sobre mercado de capitais, planejamento patrimonial e governança.",
  path: "/insights",
});

export const revalidate = 300; // 5 minutos — conteúdo editorial não precisa ser realtime

async function getAllPosts(): Promise<PostCardData[]> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      where: { status: { equals: "published" } },
      sort: "-publishedAt",
      limit: 24,
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
    console.warn("Não foi possível carregar posts:", error);
    return [];
  }
}

export default async function InsightsPage() {
  const posts = await getAllPosts();

  return (
    <section className="bg-ink pb-32 pt-40">
      <Container>
        <span className="ledger-tick">Insights</span>
        <h1 className="mt-5 max-w-2xl font-display text-display-md text-ivory md:text-display-lg">
          Perspectivas para decisões patrimoniais mais sólidas.
        </h1>

        {posts.length > 0 ? (
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="mt-16 rounded-lg border border-dashed border-line p-16 text-center">
            <p className="text-sm text-slate">
              Nenhum artigo publicado ainda. Publique o primeiro em{" "}
              <code className="text-brass">/admin/collections/posts</code>.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
