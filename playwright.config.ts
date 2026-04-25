import { defineConfig, devices } from "@playwright/test";

const PORT = 3000;
const previewBaseURL = process.env.PLAYWRIGHT_BASE_URL;
const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

if (previewBaseURL && !bypassSecret) {
  throw new Error(
    "PLAYWRIGHT_BASE_URL is set but VERCEL_AUTOMATION_BYPASS_SECRET is missing. " +
      "Set the bypass secret to test against a Vercel Preview deployment.",
  );
}

const baseURL = previewBaseURL ?? `http://localhost:${PORT}`;
const extraHTTPHeaders =
  previewBaseURL && bypassSecret
    ? {
        "x-vercel-protection-bypass": bypassSecret,
        "x-vercel-set-bypass-cookie": "true",
      }
    : undefined;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
    ...(extraHTTPHeaders ? { extraHTTPHeaders } : {}),
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  ...(previewBaseURL
    ? {}
    : {
        webServer: {
          command: process.env.CI ? "pnpm build && pnpm start" : "pnpm dev",
          url: baseURL,
          reuseExistingServer: !process.env.CI,
          timeout: 120_000,
        },
      }),
});
