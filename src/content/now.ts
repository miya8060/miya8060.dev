// TODO: replace these demo values with real status before launch.
// Source for the Home page Now panel. The handoff README suggests
// migrating this to content/now.md with frontmatter (mtime-driven
// UPDATED date) once the MDX content system lands.

export type NowEntry = {
  key: string;
  value: string;
};

export const NOW_UPDATED_AT = "04 / 27";

export const NOW_ENTRIES: readonly NowEntry[] = [
  { key: "Working on", value: "Lattice — observability console v2" },
  { key: "Reading", value: "“A Philosophy of Software Design”" },
  { key: "Listening", value: "Cornelius — Mellow Waves" },
  { key: "Location", value: "東京 · 中央区" },
] as const;
