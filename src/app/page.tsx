import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "miya8060.dev — Software Engineer Portfolio" },
  description:
    "Independent software engineer. TypeScript、Go、とインフラでフルスタックに作る人。",
};

const CARDS = [
  {
    href: "/about",
    eyebrow: "ABOUT",
    description: "プロフィール、スキル、経歴。",
  },
  {
    href: "/works",
    eyebrow: "WORKS",
    description: "ケーススタディ、OSS、サイドプロジェクト。",
  },
  {
    href: "/blog",
    eyebrow: "BLOG",
    description: "技術ノートとフリーランスの記録。",
  },
  {
    href: "/contact",
    eyebrow: "CONTACT",
    description: "お仕事のご相談、カジュアル面談。",
  },
] as const;

export default function HomePage() {
  return (
    <section className="px-5 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
      <p className="font-mono text-[11px] tracking-[0.22em] opacity-50">
        PORTFOLIO
      </p>
      <h1 className="font-display mt-4 flex items-baseline text-5xl font-bold tracking-[-0.04em] sm:text-6xl">
        miya<span className="text-accent">8060</span>
      </h1>
      <p className="mt-5 max-w-prose text-[14px] leading-[1.75] opacity-75 sm:text-[15px]">
        Independent software engineer.
        TypeScript、Go、とインフラでフルスタックに作る人。
      </p>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2">
        {CARDS.map(({ href, eyebrow, description }) => (
          <Link
            key={href}
            href={href}
            className="border-border hover:bg-accent/10 hover:border-accent/40 group relative flex items-center justify-between gap-4 rounded-2xl border p-6 transition-colors"
          >
            <div>
              <p className="font-mono text-[10px] tracking-[0.22em] opacity-50">
                {eyebrow}
              </p>
              <p className="mt-2 text-[14px] leading-[1.5] opacity-80">
                {description}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="text-foreground/40 group-hover:text-accent text-xl transition-colors"
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
