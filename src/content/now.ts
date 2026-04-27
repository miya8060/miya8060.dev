import { execFileSync } from "node:child_process";
import { statSync } from "node:fs";
import path from "node:path";
import * as NowModule from "../../content/now.mdx";

export type NowEntry = {
  key: string;
  value: string;
};

type NowMetadata = {
  entries: readonly NowEntry[];
};

const { metadata } = NowModule as unknown as { metadata: NowMetadata };

const NOW_MDX_PATH = path.join(process.cwd(), "content/now.mdx");

function lastUpdatedDate(): Date {
  // Prefer git's "last commit that touched this file" so the UPDATED label
  // survives Vercel's fresh checkout (which resets file mtimes to build time).
  try {
    const iso = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", NOW_MDX_PATH],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
    if (iso) return new Date(iso);
  } catch {
    // git missing or not a repo — fall through.
  }
  try {
    return statSync(NOW_MDX_PATH).mtime;
  } catch {
    return new Date();
  }
}

function formatMonthDay(date: Date): string {
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${mm} / ${dd}`;
}

export const NOW_UPDATED_AT = formatMonthDay(lastUpdatedDate());
export const NOW_ENTRIES: readonly NowEntry[] = metadata.entries;
