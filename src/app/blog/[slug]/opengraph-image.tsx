import { notFound } from "next/navigation";
import { BLOG_POSTS, findBlogPostBySlug } from "@/content/blog";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";
import { SITE_NAME } from "@/lib/site";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamicParams = false;
export const alt = `${SITE_NAME} — Blog post`;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = findBlogPostBySlug(slug);
  if (!entry) notFound();

  const post = entry.metadata;
  const tagline = post.tags.length > 0 ? post.tags.join(" · ") : "Note";
  return renderOgImage({
    title: post.title,
    eyebrow: `Note · ${post.date}`,
    tagline,
  });
}
