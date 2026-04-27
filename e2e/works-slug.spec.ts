import { expect, test } from "@playwright/test";
import { SELECTED_WORKS } from "../src/content/works";

const SITE = "https://miya8060.dev";

async function meta(page: import("@playwright/test").Page, selector: string) {
  return page.locator(selector).getAttribute("content");
}

test.describe("works case study slugs", () => {
  for (const work of SELECTED_WORKS) {
    const path = `/works/${work.slug}`;

    test(`${path} renders with eyebrow, h1 and stack chips`, async ({
      page,
    }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);

      await expect(page).toHaveTitle(
        new RegExp(`${escapeRegExp(work.name)} — miya8060\\.dev`),
      );

      const main = page.getByRole("main");
      await expect(
        main.getByRole("heading", { level: 1, name: work.name }),
      ).toBeVisible();
      await expect(
        main.getByText(
          `CASE STUDY · ${work.year} · ${work.role.toUpperCase()}`,
        ),
      ).toBeVisible();

      const stackItems = work.stack.split(" · ").filter(Boolean);
      const stackRegion = main.getByRole("region", { name: "Stack" });
      for (const item of stackItems) {
        await expect(
          stackRegion.getByText(item, { exact: true }),
        ).toBeVisible();
      }

      await expect(
        main.getByRole("link", { name: /back to works/i }),
      ).toHaveAttribute("href", "/works");
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
        `${work.name} — miya8060.dev`,
      );
      expect(await meta(page, 'meta[property="og:description"]')).toBe(
        work.description,
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

  test("Home Selected work rows link to /works/${slug}", async ({ page }) => {
    await page.goto("/");

    const section = page.getByRole("region", { name: "Selected work" });
    for (const work of SELECTED_WORKS) {
      await expect(
        section.getByRole("link", {
          name: new RegExp(escapeRegExp(work.name)),
        }),
      ).toHaveAttribute("href", `/works/${work.slug}`);
    }
  });

  test("/sitemap.xml lists every case study slug", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const body = await response.text();
    for (const work of SELECTED_WORKS) {
      expect(body).toContain(`<loc>${SITE}/works/${work.slug}</loc>`);
    }
  });

  test("unknown slug returns 404", async ({ page }) => {
    const response = await page.goto("/works/this-slug-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: "Page not found" }),
    ).toBeVisible();
  });
});

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
