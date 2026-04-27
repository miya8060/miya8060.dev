// TODO: replace these demo entries with real case studies before launch.
// Source for the Home Selected work table and the /works/[slug] case study
// pages. The handoff README suggests migrating this to content/works/*.mdx
// with frontmatter (year/role/stack/featured/summary) once the MDX content
// system lands. The case study page (src/app/works/[slug]/page.tsx) reads
// `description` for both the metadata and the lead paragraph, so keep it
// short and factual.

export type SelectedWork = {
  slug: string;
  year: string;
  name: string;
  role: string;
  stack: string;
  description: string;
};

export const SELECTED_WORKS: readonly SelectedWork[] = [
  {
    slug: "lattice",
    year: "2026",
    name: "Lattice — internal data console",
    role: "Frontend lead",
    stack: "TS · Next · Postgres",
    description:
      "社内向けデータ運用コンソールのフロントエンドを刷新。Next.js + Postgres でロール別の権限と監査ログを統合。",
  },
  {
    slug: "gocrane",
    year: "2025",
    name: "gocrane (OSS)",
    role: "Maintainer",
    stack: "Go · Kubernetes",
    description:
      "Kubernetes 向けのリソース予約 / オートスケール OSS のメンテナンス。コア API と CRD の互換性維持を担当。",
  },
  {
    slug: "soba",
    year: "2025",
    name: "Soba — habit journaling app",
    role: "Solo build",
    stack: "SwiftUI · CloudKit",
    description:
      "習慣記録の iOS アプリを個人開発。SwiftUI と CloudKit でオフラインファーストの同期を実装。",
  },
  {
    slug: "studio-atelier",
    year: "2024",
    name: "Brand site for Studio Atelier",
    role: "Design + build",
    stack: "Astro · GSAP",
    description:
      "建築スタジオのブランドサイトをデザインから実装まで担当。Astro と GSAP でアニメーション中心の体験を構築。",
  },
  {
    slug: "kintsugi-cli",
    year: "2024",
    name: "kintsugi/cli",
    role: "OSS maintainer",
    stack: "Go",
    description:
      "壊れた JSON / YAML を可能な限り自動修復する Go 製 CLI。GitHub で 1.2k スターを獲得。",
  },
] as const;

export function findWorkBySlug(slug: string): SelectedWork | undefined {
  return SELECTED_WORKS.find((work) => work.slug === slug);
}
