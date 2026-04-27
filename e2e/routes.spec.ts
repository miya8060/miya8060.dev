import { expect, test } from "@playwright/test";

const ROUTES = [
  { path: "/about", h1: "About", titleRe: /About — miya8060\.dev/ },
  { path: "/works", h1: "Works", titleRe: /Works — miya8060\.dev/ },
  { path: "/blog", h1: "Blog", titleRe: /Blog — miya8060\.dev/ },
  { path: "/contact", h1: "Contact", titleRe: /Contact — miya8060\.dev/ },
] as const;

test.describe("scaffolded routes", () => {
  for (const { path, h1, titleRe } of ROUTES) {
    test(`${path} renders with metadata title and h1`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);

      await expect(page).toHaveTitle(titleRe);
      await expect(
        page.getByRole("heading", { level: 1, name: h1 }),
      ).toBeVisible();
      await expect(page.getByRole("banner")).toBeVisible();
      await expect(page.getByRole("contentinfo")).toBeVisible();
    });
  }

  test("/contact has working mailto link to hello@miya8060.dev", async ({
    page,
  }) => {
    await page.goto("/contact");

    const main = page.getByRole("main");
    await expect(
      main.getByRole("link", { name: "hello@miya8060.dev" }),
    ).toHaveAttribute("href", "mailto:hello@miya8060.dev");
  });
});
