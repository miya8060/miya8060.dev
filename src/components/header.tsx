"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_ITEMS = [
  { href: "/about", label: "About" },
  { href: "/works", label: "Works" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 flex flex-col items-stretch gap-3 px-5 pt-4 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-10 sm:py-6 lg:px-14 lg:py-7">
      <Link
        href="/"
        className="text-foreground inline-flex flex-col items-start"
        aria-label="miya8060"
      >
        <span className="font-display flex items-baseline text-[22px] leading-none font-bold tracking-[-0.04em]">
          miya<span className="text-accent">8060</span>
          <span
            aria-hidden="true"
            className="bg-accent ml-1 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full"
          />
        </span>
        <span className="mt-1 hidden font-mono text-[9px] tracking-[0.2em] opacity-45 sm:block">
          SOFTWARE ENGINEER · TOKYO
        </span>
      </Link>
      <nav
        aria-label="メインナビゲーション"
        className="miya-capsule border-border flex shrink-0 items-center gap-0.5 self-end rounded-full border p-1 shadow-[0_8px_28px_rgba(0,0,0,0.06)] sm:gap-1 sm:self-auto sm:p-1.5 dark:shadow-[0_8px_28px_rgba(0,0,0,0.4)]"
      >
        <ul className="flex items-center">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`hover:bg-accent/15 relative inline-flex rounded-full px-2.5 py-1.5 text-[13px] font-medium transition-colors sm:px-[18px] sm:py-[9px] ${
                    active ? "text-foreground" : "text-foreground/70"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <span
          aria-hidden="true"
          className="mx-1 h-[18px] w-px bg-current opacity-[0.12] sm:mx-1.5"
        />
        <ThemeToggle />
      </nav>
    </header>
  );
}
