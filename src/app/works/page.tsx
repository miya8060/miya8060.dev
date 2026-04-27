import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { SELECTED_WORKS } from "@/content/works";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Works",
  description: "ケーススタディ・OSS・サイドプロジェクト。",
  path: "/works",
});

type WorksPageProps = {
  searchParams: Promise<{ year?: string }>;
};

export default async function WorksPage({ searchParams }: WorksPageProps) {
  const { year } = await searchParams;

  const years = Array.from(new Set(SELECTED_WORKS.map((w) => w.year))).sort(
    (a, b) => Number(b) - Number(a),
  );

  const activeYear = year && years.includes(year) ? year : null;
  const visibleWorks = activeYear
    ? SELECTED_WORKS.filter((w) => w.year === activeYear)
    : SELECTED_WORKS;

  const filters = [
    {
      label: "All",
      href: "/works",
      count: SELECTED_WORKS.length,
      isActive: !activeYear,
    },
    ...years.map((y) => ({
      label: y,
      href: `/works?year=${y}`,
      count: SELECTED_WORKS.filter((w) => w.year === y).length,
      isActive: activeYear === y,
    })),
  ];

  return (
    <section className="px-5 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
      <Container>
        <p className="font-mono text-[11px] tracking-[0.22em] opacity-50">
          WORKS
        </p>
        <h1 className="font-display mt-3 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
          Works
        </h1>
        <p className="mt-3 text-sm opacity-65">
          ケーススタディ・OSS・サイドプロジェクト
        </p>

        <nav
          aria-label="Year filter"
          className="mt-10 flex flex-wrap gap-2 sm:mt-12"
        >
          {filters.map(({ label, href, count, isActive }) => (
            <Link
              key={label}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px] tracking-[0.08em] transition-colors ${
                isActive
                  ? "bg-foreground text-background border-transparent"
                  : "border-border hover:bg-foreground/[0.04]"
              }`}
            >
              <span>{label}</span>
              <span className="opacity-60">{count}</span>
            </Link>
          ))}
        </nav>

        {visibleWorks.length === 0 ? (
          <p className="mt-12 text-[14px] leading-[1.75] opacity-70 sm:mt-16">
            該当する作品がありません。
          </p>
        ) : (
          <ul aria-label="Works" className="m-0 mt-8 list-none p-0 sm:mt-10">
            {visibleWorks.map((work) => (
              <li key={work.slug}>
                <Link
                  href={`/works/${work.slug}`}
                  className="border-border-soft hover:bg-foreground/[0.025] group grid grid-cols-[60px_1fr_24px] items-start gap-4 border-b py-5 transition-colors sm:grid-cols-[80px_1fr_24px]"
                >
                  <span className="pt-1 font-mono text-[11px] tracking-[0.08em] opacity-55">
                    {work.year}
                  </span>
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <span className="text-[15px] leading-[1.4] font-medium">
                      {work.name}
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.04em] opacity-60">
                      {work.role} · {work.stack}
                    </span>
                    <span className="text-[13px] leading-[1.6] opacity-70">
                      {work.summary}
                    </span>
                  </div>
                  <span
                    aria-hidden="true"
                    className="pt-1.5 text-right opacity-50 transition-opacity group-hover:opacity-100"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
