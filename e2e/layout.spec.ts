import { expect, test } from "@playwright/test";

test.describe("layout", () => {
  test("renders header with logo, sub-copy and capsule nav", async ({
    page,
  }) => {
    await page.goto("/");

    const header = page.getByRole("banner");
    await expect(header).toBeVisible();

    await expect(
      header.getByRole("link", { name: "miya8060" }),
    ).toHaveAttribute("href", "/");

    await expect(header.getByText("SOFTWARE ENGINEER · TOKYO")).toBeVisible();

    const nav = header.getByRole("navigation", {
      name: "メインナビゲーション",
    });
    await expect(nav.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/about",
    );
    await expect(nav.getByRole("link", { name: "Works" })).toHaveAttribute(
      "href",
      "/works",
    );
    await expect(nav.getByRole("link", { name: "Blog" })).toHaveAttribute(
      "href",
      "/blog",
    );
    await expect(nav.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  test("renders footer with sitemap columns and bottom meta bar", async ({
    page,
  }) => {
    await page.goto("/");

    const footer = page.getByRole("contentinfo");
    await expect(footer).toBeVisible();

    await expect(
      footer.getByText(/Independent software engineer in Tokyo/),
    ).toBeVisible();

    await expect(footer.getByText("SITE", { exact: true })).toBeVisible();
    await expect(footer.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/about",
    );
    await expect(footer.getByRole("link", { name: "Works" })).toHaveAttribute(
      "href",
      "/works",
    );
    await expect(footer.getByRole("link", { name: "Blog" })).toHaveAttribute(
      "href",
      "/blog",
    );

    await expect(footer.getByText("SOCIAL", { exact: true })).toBeVisible();
    const github = footer.getByRole("link", { name: "GitHub" });
    await expect(github).toHaveAttribute("href", "https://github.com/miya8060");
    await expect(github).toHaveAttribute("target", "_blank");
    await expect(github).toHaveAttribute("rel", /noopener/);

    await expect(footer.getByText("CONTACT", { exact: true })).toBeVisible();
    await expect(
      footer.getByRole("link", { name: "hello@miya8060.dev" }),
    ).toHaveAttribute("href", "mailto:hello@miya8060.dev");

    await expect(footer.getByText(/©\s*\d{4}\s+MIYA8060/)).toBeVisible();
    await expect(footer.getByText(/\d{2}:\d{2}\s+JST/)).toBeVisible();
  });

  test("renders header and footer on 404 page (unmatched route)", async ({
    page,
  }) => {
    const response = await page.goto("/this-route-does-not-exist");
    expect(response?.status()).toBe(404);

    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Page not found" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /back to home/i }),
    ).toHaveAttribute("href", "/");
  });

  test("theme toggle switches between light and dark", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");

    const toggle = page.getByRole("button", { name: "theme" });
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-pressed", "true");

    const html = page.locator("html");
    await expect(html).not.toHaveClass(/(^|\s)dark(\s|$)/);

    await toggle.click();
    await expect(html).toHaveClass(/(^|\s)dark(\s|$)/);
    await expect(toggle).toHaveAttribute("aria-pressed", "false");

    await toggle.click();
    await expect(html).not.toHaveClass(/(^|\s)dark(\s|$)/);
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
  });
});
