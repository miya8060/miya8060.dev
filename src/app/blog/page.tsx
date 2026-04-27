import type { Metadata } from "next";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Blog",
  description: "技術ノートとフリーランスの記録（準備中）。",
};

export default function BlogPage() {
  return (
    <section className="px-5 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
      <Container>
        <p className="font-mono text-[11px] tracking-[0.22em] opacity-50">
          BLOG
        </p>
        <h1 className="font-display mt-3 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
          Blog
        </h1>
        <p className="mt-3 text-sm opacity-65">技術ノート</p>

        <p className="mt-12 text-[14px] leading-[1.75] opacity-70 sm:mt-16">
          TypeScript、Go、Next.js、インフラ周りで学んだことを書いていきます。
          準備中です。
        </p>
      </Container>
    </section>
  );
}
