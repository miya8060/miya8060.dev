"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};
const useMounted = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isLight = mounted ? resolvedTheme === "light" : false;

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      aria-label="theme"
      aria-pressed={isLight}
      className="text-foreground relative inline-flex h-[26px] w-[54px] shrink-0 items-center rounded-full border border-current bg-transparent p-0"
      suppressHydrationWarning
    >
      <span
        aria-hidden="true"
        className="absolute top-[2px] left-[2px] block h-5 w-5 rounded-full bg-current"
        style={{
          transform: isLight ? "translateX(28px)" : "translateX(0)",
          transition: "transform 350ms cubic-bezier(0.6, 0.1, 0.3, 1.2)",
        }}
      />
    </button>
  );
}
