import { expect, test } from "@playwright/test";

test.describe("layout", () => {
  test("renders header with site logo and nav links", async ({ page }) => {
    await page.goto("/");

    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(
      header.getByRole("link", { name: "miya8060.dev" }),
    ).toHaveAttribute("href", "/");

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

  test("renders footer with copyright and social links", async ({ page }) => {
    await page.goto("/");

    const footer = page.getByRole("contentinfo");
    await expect(footer).toBeVisible();
    await expect(footer.getByText(/©\s*\d{4}\s+miya8060/)).toBeVisible();

    const githubLink = footer.getByRole("link", { name: "GitHub" });
    await expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/miya8060",
    );
    await expect(githubLink).toHaveAttribute("target", "_blank");
    await expect(githubLink).toHaveAttribute("rel", /noopener/);

    await expect(footer.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  test("theme toggle cycles to dark mode", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");

    const toggle = page.getByRole("button", { name: /テーマを切り替える/ });
    await expect(toggle).toBeVisible();

    const html = page.locator("html");
    await expect(html).not.toHaveClass(/(^|\s)dark(\s|$)/);

    // system → light
    await toggle.click();
    await expect(html).not.toHaveClass(/(^|\s)dark(\s|$)/);

    // light → dark
    await toggle.click();
    await expect(html).toHaveClass(/(^|\s)dark(\s|$)/);
  });
});
