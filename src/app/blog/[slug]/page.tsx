import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { BLOG_POSTS, findBlogPostBySlug } from "@/content/blog";
import { pageMetadata } from "@/lib/metadata";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = findBlogPostBySlug(slug);
  if (!entry) return {};

  const path = `/blog/${entry.metadata.slug}`;
  return pageMetadata({
    title: entry.metadata.title,
    description: entry.metadata.summary,
    path,
    ogImagePath: `${path}/opengraph-image`,
  });
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const entry = findBlogPostBySlug(slug);
  if (!entry) notFound();

  const { metadata: post, Component: PostBody } = entry;

  return (
    <article className="px-5 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
      <Container>
        <Link
          href="/blog"
          className="miya-link font-mono text-[11px] tracking-[0.22em] uppercase opacity-60"
        >
          ← back to blog
        </Link>

        <header className="mt-8">
          <p className="font-mono text-[11px] tracking-[0.22em] opacity-50">
            NOTE · {post.date}
          </p>
          <h1 className="font-display mt-3 text-4xl leading-[1.08] font-bold tracking-[-0.035em] sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-[15px] leading-[1.7] opacity-75">
            {post.summary}
          </p>
        </header>

        {post.tags.length > 0 && (
          <section
            aria-label="Tags"
            className="mt-8 flex flex-wrap items-center gap-2"
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="border-border bg-surface inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] tracking-[0.08em] uppercase"
              >
                {tag}
              </span>
            ))}
          </section>
        )}

        <section aria-label="Post body" className="mt-12 sm:mt-16">
          <PostBody />
        </section>
      </Container>
    </article>
  );
}
