import type { MDXContent } from "mdx/types";
import * as HelloMdx from "../../content/blog/hello-mdx.mdx";

export type BlogFrontmatter = {
  slug: string;
  title: string;
  date: string;
  tags: readonly string[];
  summary: string;
};

type BlogModule = {
  default: MDXContent;
  metadata: BlogFrontmatter;
};

// `@types/mdx` only declares the default export of `*.mdx` modules. Cast at the
// registry boundary to expose the `metadata` named export we author in each file.
const BLOG_MODULES: readonly BlogModule[] = [
  HelloMdx,
] as unknown as readonly BlogModule[];

export const BLOG_POSTS: readonly BlogFrontmatter[] = [...BLOG_MODULES]
  .map((mod) => mod.metadata)
  .sort((a, b) => b.date.localeCompare(a.date));

export type BlogEntry = {
  metadata: BlogFrontmatter;
  Component: MDXContent;
};

export function findBlogPostBySlug(slug: string): BlogEntry | undefined {
  const mod = BLOG_MODULES.find((m) => m.metadata.slug === slug);
  if (!mod) return undefined;
  return { metadata: mod.metadata, Component: mod.default };
}
