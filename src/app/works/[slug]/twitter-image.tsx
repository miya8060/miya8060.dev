import { notFound } from "next/navigation";
import { findWorkBySlug, SELECTED_WORKS } from "@/content/works";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";
import { SITE_NAME } from "@/lib/site";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamicParams = false;
export const alt = `${SITE_NAME} — Case study`;

export function generateStaticParams() {
  return SELECTED_WORKS.map((work) => ({ slug: work.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = findWorkBySlug(slug);
  if (!entry) notFound();

  const work = entry.metadata;
  return renderOgImage({
    title: work.name,
    eyebrow: `Case study · ${work.year} · ${work.role}`,
    tagline: work.stack,
  });
}
