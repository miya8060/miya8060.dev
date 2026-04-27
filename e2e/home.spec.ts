import { expect, test } from "@playwright/test";

test.describe("home", () => {
  test("renders with the absolute portfolio title", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(
      /miya8060\.dev — Software Engineer Portfolio/,
    );
  });

  test("renders the miya8060 hero h1", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1, name: "miya8060" }),
    ).toBeVisible();
  });
});
