import { expect, test } from "@playwright/test";

test.describe("about page polish", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("renders eyebrow, h1 and three section headings", async ({ page }) => {
    const main = page.getByRole("main");

    await expect(main.getByText("ABOUT", { exact: true })).toBeVisible();
    await expect(
      main.getByRole("heading", { level: 1, name: "About" }),
    ).toBeVisible();

    for (const heading of ["Profile", "Skills", "Experience"]) {
      await expect(
        main.getByRole("heading", { level: 2, name: heading }),
      ).toBeVisible();
    }
  });

  test("each section is marked 準備中 and exposes a placeholder structure", async ({
    page,
  }) => {
    const main = page.getByRole("main");

    for (const eyebrow of [
      "PROFILE · 準備中",
      "SKILLS · 準備中",
      "EXPERIENCE · 準備中",
    ]) {
      await expect(main.getByText(eyebrow, { exact: true })).toBeVisible();
    }

    for (const category of ["Languages", "Platforms", "Practices"]) {
      await expect(main.getByText(category, { exact: true })).toBeVisible();
    }

    const dl = main.locator("dl");
    await expect(dl).toBeVisible();
    await expect(dl.locator("> div")).toHaveCount(3);
  });
});
