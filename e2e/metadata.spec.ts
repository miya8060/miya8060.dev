import { expect, test } from "@playwright/test";

const SITE = "https://miya8060.dev";

const PAGES = [
  {
    path: "/",
    canonical: SITE,
    ogTitle: "miya8060.dev — Software Engineer Portfolio",
    ogDescriptionRe: /システム開発を5年/,
  },
  {
    path: "/about",
    canonical: `${SITE}/about`,
    ogTitle: "About — miya8060.dev",
    ogDescriptionRe: /プロフィール/,
  },
  {
    path: "/works",
    canonical: `${SITE}/works`,
    ogTitle: "Works — miya8060.dev",
    ogDescriptionRe: /ケーススタディ/,
  },
  {
    path: "/blog",
    canonical: `${SITE}/blog`,
    ogTitle: "Blog — miya8060.dev",
    ogDescriptionRe: /技術ノート/,
  },
  {
    path: "/contact",
    canonical: `${SITE}/contact`,
    ogTitle: "Contact — miya8060.dev",
    ogDescriptionRe: /カジュアル面談/,
  },
] as const;

async function meta(page: import("@playwright/test").Page, selector: string) {
  return page.locator(selector).getAttribute("content");
}

test.describe("metadata", () => {
  for (const { path, canonical, ogTitle, ogDescriptionRe } of PAGES) {
    test(`${path} exposes canonical, openGraph and twitter tags`, async ({
      page,
    }) => {
      await page.goto(path);

      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        canonical,
      );

      expect(await meta(page, 'meta[property="og:title"]')).toBe(ogTitle);
      expect(await meta(page, 'meta[property="og:description"]')).toMatch(
        ogDescriptionRe,
      );
      expect(await meta(page, 'meta[property="og:url"]')).toBe(canonical);
      expect(await meta(page, 'meta[property="og:type"]')).toBe("website");
      expect(await meta(page, 'meta[property="og:site_name"]')).toBe(
        "miya8060.dev",
      );
      expect(await meta(page, 'meta[property="og:locale"]')).toBe("ja_JP");
      expect(await meta(page, 'meta[property="og:image"]')).toContain(
        "/opengraph-image",
      );
      expect(await meta(page, 'meta[property="og:image:width"]')).toBe("1200");
      expect(await meta(page, 'meta[property="og:image:height"]')).toBe("630");

      expect(await meta(page, 'meta[name="twitter:card"]')).toBe(
        "summary_large_image",
      );
      expect(await meta(page, 'meta[name="twitter:title"]')).toBe(ogTitle);
      expect(await meta(page, 'meta[name="twitter:description"]')).toMatch(
        ogDescriptionRe,
      );
      expect(await meta(page, 'meta[name="twitter:image"]')).toContain(
        "/opengraph-image",
      );
    });
  }

  test("/opengraph-image returns a 1200x630 PNG", async ({ request }) => {
    const response = await request.get("/opengraph-image");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
    const body = await response.body();
    expect(body.byteLength).toBeGreaterThan(1000);
  });

  test("/twitter-image returns a PNG", async ({ request }) => {
    const response = await request.get("/twitter-image");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("/robots.txt allows all and points at the sitemap", async ({
    request,
  }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("User-Agent: *");
    expect(body).toContain("Allow: /");
    expect(body).toContain(`Sitemap: ${SITE}/sitemap.xml`);
  });

  test("/sitemap.xml lists every public route", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain('<?xml version="1.0"');
    for (const { path } of PAGES) {
      const expected = path === "/" ? `${SITE}/` : `${SITE}${path}`;
      expect(body).toContain(`<loc>${expected}</loc>`);
    }
  });
});
