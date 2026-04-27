import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/content/blog";
import { SELECTED_WORKS } from "@/content/works";
import { SITE_URL } from "@/lib/site";

type SitemapEntry = MetadataRoute.Sitemap[number];
type ChangeFrequency = SitemapEntry["changeFrequency"];

const STATIC_ROUTES: ReadonlyArray<{
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}> = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/works", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries = STATIC_ROUTES.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency,
      priority,
    }),
  );

  const workEntries = SELECTED_WORKS.map((work) => ({
    url: `${SITE_URL}/works/${work.slug}`,
    lastModified,
    changeFrequency: "monthly" as ChangeFrequency,
    priority: 0.7,
  }));

  const blogEntries = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified,
    changeFrequency: "monthly" as ChangeFrequency,
    priority: 0.5,
  }));

  return [...staticEntries, ...workEntries, ...blogEntries];
}
