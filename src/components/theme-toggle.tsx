"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const ORDER = ["system", "light", "dark"] as const;
type Theme = (typeof ORDER)[number];

const LABEL: Record<Theme, string> = {
  system: "システム",
  light: "ライト",
  dark: "ダーク",
};

const noopSubscribe = () => () => {};
const useMounted = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const current = (theme as Theme | undefined) ?? "system";
  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`テーマを切り替える (現在: ${LABEL[current]})`}
      className="border-border text-foreground hover:bg-muted inline-flex h-9 items-center rounded-md border px-3 text-sm transition-colors"
      suppressHydrationWarning
    >
      {mounted ? LABEL[current] : LABEL.system}
    </button>
  );
}
