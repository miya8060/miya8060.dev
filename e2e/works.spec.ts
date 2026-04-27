import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";
import matter from "gray-matter";

const WORKS_DIR = path.join(__dirname, "..", "content", "works");

type Work = {
  slug: string;
  year: string;
  name: string;
  role: string;
  stack: string;
  summary: string;
};

const ALL_WORKS: readonly Work[] = fs
  .readdirSync(WORKS_DIR)
  .filter((file) => file.endsWith(".mdx"))
  .map(
    (file) =>
      matter(fs.readFileSync(path.join(WORKS_DIR, file), "utf8")).data as Work,
  );

const YEARS = Array.from(new Set(ALL_WORKS.map((w) => w.year))).sort(
  (a, b) => Number(b) - Number(a),
);

test.describe("works index", () => {
  test("/works lists every work with link, role, stack and summary", async ({
    page,
  }) => {
    await page.goto("/works");

    const list = page.getByRole("list", { name: "Works" });
    await expect(list.getByRole("listitem")).toHaveCount(ALL_WORKS.length);

    for (const work of ALL_WORKS) {
      const link = list.getByRole("link", {
        name: new RegExp(escapeRegExp(work.name)),
      });
      await expect(link).toHaveAttribute("href", `/works/${work.slug}`);
      await expect(link).toContainText(work.year);
      await expect(link).toContainText(work.role);
      await expect(link).toContainText(work.summary);
    }
  });

  test("/works exposes a year filter with All + per-year chips", async ({
    page,
  }) => {
    await page.goto("/works");

    const nav = page.getByRole("navigation", { name: "Year filter" });
    await expect(nav).toBeVisible();

    const allChip = nav.getByRole("link", { name: /^All\s/ });
    await expect(allChip).toHaveAttribute("aria-current", "page");
    await expect(allChip).toHaveAttribute("href", "/works");

    for (const year of YEARS) {
      const chip = nav.getByRole("link", {
        name: new RegExp(`^${year}\\s`),
      });
      await expect(chip).toHaveAttribute("href", `/works?year=${year}`);
    }
  });

  for (const year of YEARS) {
    const expected = ALL_WORKS.filter((w) => w.year === year);

    test(`/works?year=${year} narrows the list to ${expected.length} entries`, async ({
      page,
    }) => {
      await page.goto(`/works?year=${year}`);

      const list = page.getByRole("list", { name: "Works" });
      await expect(list.getByRole("listitem")).toHaveCount(expected.length);

      const nav = page.getByRole("navigation", { name: "Year filter" });
      await expect(
        nav.getByRole("link", { name: new RegExp(`^${year}\\s`) }),
      ).toHaveAttribute("aria-current", "page");
    });
  }

  test("/works?year=invalid falls back to showing all works", async ({
    page,
  }) => {
    await page.goto("/works?year=1999");

    const list = page.getByRole("list", { name: "Works" });
    await expect(list.getByRole("listitem")).toHaveCount(ALL_WORKS.length);

    const nav = page.getByRole("navigation", { name: "Year filter" });
    await expect(nav.getByRole("link", { name: /^All\s/ })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
