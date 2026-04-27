import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findWorkBySlug, SELECTED_WORKS } from "@/content/works";
import { pageMetadata } from "@/lib/metadata";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return SELECTED_WORKS.map((work) => ({ slug: work.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = findWorkBySlug(slug);
  if (!entry) return {};

  const path = `/works/${entry.metadata.slug}`;
  return pageMetadata({
    title: entry.metadata.name,
    description: entry.metadata.summary,
    path,
    ogImagePath: `${path}/opengraph-image`,
  });
}

export default async function WorkCaseStudyPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const entry = findWorkBySlug(slug);
  if (!entry) notFound();

  const { metadata: work, Component: WorkBody } = entry;
  const stackItems = work.stack.split(" · ").filter(Boolean);

  return (
    <article className="px-5 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
      <Link
        href="/works"
        className="miya-link font-mono text-[11px] tracking-[0.22em] uppercase opacity-60"
      >
        ← back to works
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="font-mono text-[11px] tracking-[0.22em] opacity-50">
          CASE STUDY · {work.year} · {work.role.toUpperCase()}
        </p>
        <h1 className="font-display mt-3 text-4xl leading-[1.08] font-bold tracking-[-0.035em] sm:text-5xl">
          {work.name}
        </h1>
        <p className="mt-5 text-[15px] leading-[1.7] opacity-75">
          {work.summary}
        </p>
      </header>

      <section
        aria-label="Stack"
        className="mt-10 flex flex-wrap items-center gap-2"
      >
        {stackItems.map((item) => (
          <span
            key={item}
            className="border-border bg-surface inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] tracking-[0.08em]"
          >
            {item}
          </span>
        ))}
      </section>

      <section aria-label="Case study" className="mt-12 max-w-3xl sm:mt-16">
        <WorkBody />
      </section>
    </article>
  );
}
