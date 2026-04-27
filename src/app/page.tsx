import type { Metadata } from "next";
import Link from "next/link";
import { NOW_ENTRIES, NOW_UPDATED_AT } from "@/content/now";
import { SELECTED_WORKS } from "@/content/works";

export const metadata: Metadata = {
  title: { absolute: "miya8060.dev — Software Engineer Portfolio" },
  description:
    "Independent software engineer. TypeScript、Go、とインフラでフルスタックに作る人。",
};

export default function HomePage() {
  return (
    <div className="px-5 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
      <section className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start lg:gap-16">
        <div>
          <div className="border-border inline-flex items-center gap-2 rounded-full border py-[5px] pr-3 pl-2 text-[11px]">
            <span
              aria-hidden="true"
              className="bg-accent inline-block h-[7px] w-[7px] rounded-full shadow-[0_0_8px_var(--accent)]"
            />
            <span className="font-mono tracking-[0.05em]">
              AVAILABLE FOR WORK · 2026 Q3〜
            </span>
          </div>

          <h1 className="mt-[26px] max-w-[600px] text-4xl leading-[1.12] font-medium tracking-[-0.03em] sm:text-5xl sm:leading-[1.08] lg:text-[56px]">
            Hi, I&apos;m{" "}
            <span className="font-serif text-[1.05em] font-normal italic">
              miya
            </span>{" "}
            — フリーランスのソフトウェアエンジニアです。
          </h1>

          <p className="mt-[22px] max-w-[480px] text-[14px] leading-[1.7] opacity-70">
            スタートアップから自治体プロジェクトまで、ウェブとモバイルの開発を 8
            年。最近は Edge と LLM 周辺で遊んでいます。
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            <Link
              href="/contact"
              className="bg-foreground text-background hover:bg-foreground/90 inline-flex items-center rounded-full px-5 py-3 text-[13px] font-medium transition-colors"
            >
              お仕事の相談 →
            </Link>
            <Link
              href="/about"
              className="border-border hover:bg-foreground/[0.04] inline-flex items-center rounded-full border px-5 py-3 text-[13px] font-medium transition-colors"
            >
              About を読む
            </Link>
          </div>
        </div>

        <aside
          aria-label="Now"
          className="bg-card border-border rounded-2xl border p-5 sm:p-[22px]"
        >
          <div className="mb-[14px] flex items-center justify-between">
            <span className="font-serif text-[22px] italic">Now</span>
            <span className="font-mono text-[10px] tracking-[0.1em] opacity-50">
              UPDATED {NOW_UPDATED_AT}
            </span>
          </div>
          <ul className="m-0 list-none p-0">
            {NOW_ENTRIES.map((entry, i) => (
              <li
                key={entry.key}
                className={`border-border-soft grid grid-cols-[96px_1fr] gap-3 border-b py-2.5 text-[14px] leading-[1.5] sm:grid-cols-[110px_1fr] ${
                  i === 0 ? "border-t" : ""
                }`}
              >
                <span className="pt-0.5 font-mono text-[10px] tracking-[0.1em] uppercase opacity-55">
                  {entry.key}
                </span>
                <span>{entry.value}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="mt-16 sm:mt-20" aria-labelledby="selected-work">
        <header className="border-foreground flex items-baseline justify-between border-b pb-3.5">
          <h2
            id="selected-work"
            className="font-serif text-[26px] font-normal italic sm:text-[28px]"
          >
            Selected work
          </h2>
          <Link
            href="/works"
            className="text-[12px] opacity-70 transition-opacity hover:opacity-100"
          >
            すべて見る →
          </Link>
        </header>

        <ul className="m-0 list-none p-0">
          {SELECTED_WORKS.map((work) => (
            <li key={work.slug}>
              <Link
                href={work.href}
                className="border-border-soft hover:bg-foreground/[0.025] group grid grid-cols-[44px_1fr_24px] items-center gap-3 border-b py-4 text-[14px] transition-colors sm:grid-cols-[60px_1.4fr_1fr_1.2fr_24px] sm:gap-4"
              >
                <span className="font-mono text-[12px] opacity-55">
                  {work.year}
                </span>
                <div className="flex min-w-0 flex-col gap-1 sm:contents">
                  <span className="truncate font-medium">{work.name}</span>
                  <span className="text-[12px] opacity-65 sm:text-[14px]">
                    {work.role}
                  </span>
                  <span className="font-mono text-[10px] opacity-55 sm:text-[11px]">
                    {work.stack}
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className="text-right opacity-50 transition-opacity group-hover:opacity-100"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
