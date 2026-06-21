import type { MetadataRoute } from "next";
import { getPayloadClient } from "@/payload/get-payload-client";
import { SITE } from "@/lib/seo";

type SitemapEntry = MetadataRoute.Sitemap[number];

const STATIC_ROUTES: Array<{ path: string; priority: number; changeFrequency: SitemapEntry["changeFrequency"] }> = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/sobre", priority: 0.8, changeFrequency: "monthly" },
  { path: "/servicos", priority: 0.8, changeFrequency: "monthly" },
  { path: "/insights", priority: 0.7, changeFrequency: "daily" },
  { path: "/contato", priority: 0.6, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  let postEntries: MetadataRoute.Sitemap = [];

  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      where: { status: { equals: "published" } },
      limit: 500,
      depth: 0,
    });

    postEntries = docs.map((doc) => ({
      url: `${SITE.url}/insights/${doc.slug}`,
      lastModified: doc.updatedAt ? new Date(doc.updatedAt as string) : new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    }));
  } catch (error) {
    console.warn("Sitemap: não foi possível carregar posts do Payload:", error);
  }

  return [...staticEntries, ...postEntries];
}
