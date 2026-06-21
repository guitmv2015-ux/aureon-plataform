import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export interface PostCardData {
  slug: string;
  title: string;
  excerpt: string;
  category?: string | null;
  publishedAt?: string | null;
  coverImage?: { url?: string | null; alt?: string | null } | null;
}

export function PostCard({ post }: { post: PostCardData }) {
  return (
    <Link
      href={`/insights/${post.slug}`}
      className="group block overflow-hidden rounded-lg border border-line bg-elevated transition-colors hover:border-brass/40"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-panel">
        {post.coverImage?.url ? (
          <Image
            src={post.coverImage.url}
            alt={post.coverImage.alt ?? post.title}
            fill
            className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-display text-3xl text-line-strong">
            AP
          </div>
        )}
      </div>
      <div className="p-6">
        {post.category ? (
          <span className="text-xs font-medium uppercase tracking-wider text-brass">
            {post.category.replace(/-/g, " ")}
          </span>
        ) : null}
        <h3 className="mt-3 font-display text-lg leading-snug text-ivory">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate">{post.excerpt}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs text-slate-dim">
            {post.publishedAt ? formatDate(post.publishedAt) : "Em breve"}
          </span>
          <ArrowUpRight className="h-4 w-4 text-slate-dim transition-colors group-hover:text-brass" />
        </div>
      </div>
    </Link>
  );
}
