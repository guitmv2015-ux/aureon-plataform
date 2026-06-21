import type { ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-ink px-6 py-16">
      <div className="absolute inset-0 bg-noise-grid" aria-hidden />
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-10 text-center">
          <Link href="/" className="font-display text-lg tracking-wide text-ivory">
            AUREON <span className="text-brass">PARTNERS</span>
          </Link>
        </div>
        <div className="rounded-lg border border-line bg-elevated p-8 md:p-10">{children}</div>
      </div>
    </div>
  );
}
