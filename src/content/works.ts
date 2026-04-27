import type { MDXContent } from "mdx/types";
import * as Gocrane from "../../content/works/gocrane.mdx";
import * as KintsugiCli from "../../content/works/kintsugi-cli.mdx";
import * as Lattice from "../../content/works/lattice.mdx";
import * as Soba from "../../content/works/soba.mdx";
import * as StudioAtelier from "../../content/works/studio-atelier.mdx";

export type WorkFrontmatter = {
  slug: string;
  year: string;
  name: string;
  role: string;
  stack: string;
  summary: string;
  featured?: boolean;
};

type WorkModule = {
  default: MDXContent;
  metadata: WorkFrontmatter;
};

// `@types/mdx` only declares the default export of `*.mdx` modules. Cast at the
// registry boundary to expose the `metadata` named export we author in each file.
const WORK_MODULES: readonly WorkModule[] = [
  Lattice,
  Gocrane,
  Soba,
  StudioAtelier,
  KintsugiCli,
] as unknown as readonly WorkModule[];

export const SELECTED_WORKS: readonly WorkFrontmatter[] = WORK_MODULES.map(
  (mod) => mod.metadata,
);

export const FEATURED_WORKS: readonly WorkFrontmatter[] = SELECTED_WORKS.filter(
  (work) => work.featured,
);

export type WorkEntry = {
  metadata: WorkFrontmatter;
  Component: MDXContent;
};

export function findWorkBySlug(slug: string): WorkEntry | undefined {
  const mod = WORK_MODULES.find((m) => m.metadata.slug === slug);
  if (!mod) return undefined;
  return { metadata: mod.metadata, Component: mod.default };
}
