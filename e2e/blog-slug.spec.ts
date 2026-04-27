import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";
import matter from "gray-matter";

const SITE = "https://miya8060.dev";

const BLOG_DIR = path.join(__dirname, "..", "content", "blog");

type Post = {
  slug: string;
  title: string;
  date: string;
  tags: readonly string[];
  summary: string;
};

const BLOG_POSTS: readonly Post[] = fs
  .readdirSync(BLOG_DIR)
  .filter((file) => file.endsWith(".mdx"))
  .map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    return matter(raw).data as Post;
  })
  .sort((a, b) => b.date.localeCompare(a.date));

async function meta(page: import("@playwright/test").Page, selector: string) {
  return page.locator(selector).getAttribute("content");
}

test.describe("blog post slugs", () => {
  for (const post of BLOG_POSTS) {
    const path = `/blog/${post.slug}`;

    test(`${path} renders with eyebrow, h1, summary and tag chips`, async ({
      page,
    }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);

      await expect(page).toHaveTitle(
        new RegExp(`${escapeRegExp(post.title)} — miya8060\\.dev`),
      );

      const main = page.getByRole("main");
      await expect(
        main.getByRole("heading", { level: 1, name: post.title }),
      ).toBeVisible();
      await expect(main.getByText(`NOTE · ${post.date}`)).toBeVisible();
      await expect(main.getByText(post.summary)).toBeVisible();

      if (post.tags.length > 0) {
        const tagsRegion = main.getByRole("region", { name: "Tags" });
        for (const tag of post.tags) {
          await expect(
            tagsRegion.getByText(tag, { exact: true }),
          ).toBeVisible();
        }
      }

      await expect(
        main.getByRole("link", { name: /back to blog/i }),
      ).toHaveAttribute("href", "/blog");

      const body = main.getByRole("region", { name: "Post body" });
      await expect(body).toBeVisible();
    });

    test(`${path} exposes per-slug canonical and OG image`, async ({
      page,
    }) => {
      await page.goto(path);

      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `${SITE}${path}`,
      );

      expect(await meta(page, 'meta[property="og:url"]')).toBe(
        `${SITE}${path}`,
      );
      expect(await meta(page, 'meta[property="og:title"]')).toBe(
        `${post.title} — miya8060.dev`,
      );
      expect(await meta(page, 'meta[property="og:description"]')).toBe(
        post.summary,
      );
      expect(await meta(page, 'meta[property="og:image"]')).toContain(
        `${path}/opengraph-image`,
      );
      expect(await meta(page, 'meta[name="twitter:image"]')).toContain(
        `${path}/opengraph-image`,
      );
    });

    test(`${path}/opengraph-image returns a 1200x630 PNG`, async ({
      request,
    }) => {
      const response = await request.get(`${path}/opengraph-image`);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("image/png");
      const body = await response.body();
      expect(body.byteLength).toBeGreaterThan(1000);
    });
  }

  test("/blog lists every published post with link, date, summary and tags", async ({
    page,
  }) => {
    await page.goto("/blog");

    const main = page.getByRole("main");
    const list = main.getByRole("list", { name: "Posts" });
    await expect(list).toBeVisible();

    for (const post of BLOG_POSTS) {
      const link = list.getByRole("link", {
        name: new RegExp(escapeRegExp(post.title)),
      });
      await expect(link).toHaveAttribute("href", `/blog/${post.slug}`);
      await expect(link.getByText(post.date)).toBeVisible();
      await expect(link.getByText(post.summary)).toBeVisible();
      for (const tag of post.tags) {
        await expect(link.getByText(tag, { exact: true })).toBeVisible();
      }
    }
  });

  test("/sitemap.xml lists every blog slug", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const body = await response.text();
    for (const post of BLOG_POSTS) {
      expect(body).toContain(`<loc>${SITE}/blog/${post.slug}</loc>`);
    }
  });

  test("unknown blog slug returns 404", async ({ page }) => {
    const response = await page.goto("/blog/this-post-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: "Page not found" }),
    ).toBeVisible();
  });
});

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
