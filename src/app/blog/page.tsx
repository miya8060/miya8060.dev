import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { BLOG_POSTS } from "@/content/blog";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description: "技術ノートとフリーランスの記録。",
  path: "/blog",
});

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

        {BLOG_POSTS.length === 0 ? (
          <p className="mt-12 text-[14px] leading-[1.75] opacity-70 sm:mt-16">
            準備中です。
          </p>
        ) : (
          <ul aria-label="Posts" className="m-0 mt-12 list-none p-0 sm:mt-16">
            {BLOG_POSTS.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="border-border-soft hover:bg-foreground/[0.025] group grid grid-cols-[88px_1fr_24px] items-start gap-4 border-b py-5 transition-colors sm:grid-cols-[110px_1fr_24px]"
                >
                  <span className="pt-0.5 font-mono text-[11px] tracking-[0.08em] opacity-55">
                    {post.date}
                  </span>
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <span className="text-[15px] leading-[1.4] font-medium">
                      {post.title}
                    </span>
                    <span className="text-[13px] leading-[1.55] opacity-65">
                      {post.summary}
                    </span>
                    {post.tags.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border-border bg-surface inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-[0.06em] uppercase opacity-75"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span
                    aria-hidden="true"
                    className="pt-1 text-right opacity-50 transition-opacity group-hover:opacity-100"
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
