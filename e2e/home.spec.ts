import { expect, test } from "@playwright/test";

test.describe("home", () => {
  test("renders with the absolute portfolio title", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(
      /miya8060\.dev — Software Engineer Portfolio/,
    );
  });

  test("renders hero with status pill, h1 and CTAs", async ({ page }) => {
    await page.goto("/");

    const main = page.getByRole("main");

    await expect(main.getByText(/AVAILABLE FOR WORK/)).toBeVisible();

    const h1 = main.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("miya");
    await expect(h1).toContainText("ソフトウェアエンジニア");

    await expect(
      main.getByRole("link", { name: /お仕事の相談/ }),
    ).toHaveAttribute("href", "/contact");
    await expect(
      main.getByRole("link", { name: /About を読む/ }),
    ).toHaveAttribute("href", "/about");
  });

  test("renders Now panel with 4 entries and UPDATED date", async ({
    page,
  }) => {
    await page.goto("/");

    const now = page.getByRole("complementary", { name: "Now" });
    await expect(now).toBeVisible();
    await expect(now.getByText(/UPDATED \d{2} \/ \d{2}/)).toBeVisible();
    await expect(now.getByRole("listitem")).toHaveCount(4);

    for (const key of ["Working on", "Reading", "Listening", "Location"]) {
      await expect(now.getByText(key)).toBeVisible();
    }
  });

  test("renders Selected work section with 5 rows and the index link", async ({
    page,
  }) => {
    await page.goto("/");

    const section = page.getByRole("region", { name: "Selected work" });
    await expect(
      section.getByRole("heading", { level: 2, name: "Selected work" }),
    ).toBeVisible();

    await expect(section.getByRole("listitem")).toHaveCount(5);

    await expect(
      section.getByRole("link", { name: /すべて見る/ }),
    ).toHaveAttribute("href", "/works");
  });
});
