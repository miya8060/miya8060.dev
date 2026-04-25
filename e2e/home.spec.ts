import { expect, test } from "@playwright/test";

test.describe("home", () => {
  test("renders with the site title", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/miya8060\.dev/);
  });
});
