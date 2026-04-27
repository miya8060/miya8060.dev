// TODO: replace these demo entries with real case studies before launch.
// Source for the Home page Selected work table. The handoff README
// suggests migrating this to content/works/*.mdx with frontmatter
// (year/role/stack/featured) once the MDX content system lands.
//
// `href` currently points to the /works index for every row because the
// per-slug case-study route does not exist yet. Switch to /works/${slug}
// when those pages ship.

export type SelectedWork = {
  slug: string;
  year: string;
  name: string;
  role: string;
  stack: string;
  href: string;
};

export const SELECTED_WORKS: readonly SelectedWork[] = [
  {
    slug: "lattice",
    year: "2026",
    name: "Lattice — internal data console",
    role: "Frontend lead",
    stack: "TS · Next · Postgres",
    href: "/works",
  },
  {
    slug: "gocrane",
    year: "2025",
    name: "gocrane (OSS)",
    role: "Maintainer",
    stack: "Go · Kubernetes",
    href: "/works",
  },
  {
    slug: "soba",
    year: "2025",
    name: "Soba — habit journaling app",
    role: "Solo build",
    stack: "SwiftUI · CloudKit",
    href: "/works",
  },
  {
    slug: "studio-atelier",
    year: "2024",
    name: "Brand site for Studio Atelier",
    role: "Design + build",
    stack: "Astro · GSAP",
    href: "/works",
  },
  {
    slug: "kintsugi-cli",
    year: "2024",
    name: "kintsugi/cli",
    role: "OSS · 1.2k★",
    stack: "Go",
    href: "/works",
  },
] as const;
