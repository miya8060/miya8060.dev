import { expect, test } from "@playwright/test";

test.describe("contact page polish", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("primary mailto link is rendered as a button-style card", async ({
    page,
  }) => {
    const main = page.getByRole("main");

    const email = main.getByRole("link", { name: "hello@miya8060.dev" });
    await expect(email).toHaveAttribute("href", "mailto:hello@miya8060.dev");
  });

  test("GitHub link opens in a new tab via inline icon", async ({ page }) => {
    const main = page.getByRole("main");

    const github = main.getByRole("link", { name: /^GitHub/ });
    await expect(github).toHaveAttribute("href", "https://github.com/miya8060");
    await expect(github).toHaveAttribute("target", "_blank");
    await expect(github).toHaveAttribute("rel", /noopener/);
  });

  test("Schedule a chat is shown as a 準備中 placeholder, not a link", async ({
    page,
  }) => {
    const main = page.getByRole("main");

    await expect(
      main.getByText("SCHEDULE · 準備中", { exact: true }),
    ).toBeVisible();
    await expect(main.getByText(/Schedule a chat/)).toBeVisible();
    await expect(
      main.getByRole("link", { name: /Schedule a chat/ }),
    ).toHaveCount(0);
  });
});
