import Link from "next/link";
import type { ComponentProps } from "react";
import { FooterClock } from "@/components/footer-clock";

function GithubIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 .5C5.73.5.67 5.57.67 11.84c0 5.02 3.24 9.27 7.74 10.78.57.1.78-.25.78-.55 0-.27-.01-.99-.02-1.95-3.15.69-3.81-1.52-3.81-1.52-.51-1.31-1.26-1.66-1.26-1.66-1.03-.71.08-.7.08-.7 1.14.08 1.74 1.18 1.74 1.18 1.01 1.74 2.66 1.24 3.31.95.1-.74.4-1.24.72-1.53-2.51-.29-5.16-1.27-5.16-5.65 0-1.25.44-2.27 1.16-3.07-.12-.29-.5-1.45.11-3.02 0 0 .95-.31 3.11 1.17.9-.25 1.87-.38 2.83-.38.96 0 1.93.13 2.83.38 2.16-1.48 3.11-1.17 3.11-1.17.61 1.57.23 2.73.11 3.02.72.8 1.16 1.82 1.16 3.07 0 4.39-2.66 5.36-5.19 5.64.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.21 0 .31.21.66.79.55 4.49-1.51 7.73-5.76 7.73-10.78C23.33 5.57 18.27.5 12 .5z" />
    </svg>
  );
}

const SITE_LINKS = [
  { href: "/about", label: "About" },
  { href: "/works", label: "Works" },
  { href: "/blog", label: "Blog" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-surface text-foreground border-t px-5 pt-9 pb-6 sm:px-10 lg:px-14">
      <div className="grid grid-cols-1 gap-10 pb-[22px] sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <p className="font-sans text-[20px] leading-none font-medium tracking-[-0.02em]">
            miya<span className="text-accent">8060</span>
          </p>
        </div>

        <div>
          <p className="mb-3 font-mono text-[10px] tracking-[0.18em] opacity-45">
            SITE
          </p>
          <ul className="flex flex-col gap-[7px]">
            {SITE_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="miya-link text-[13px]">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 font-mono text-[10px] tracking-[0.18em] opacity-45">
            SOCIAL
          </p>
          <ul className="flex flex-col gap-[7px]">
            <li>
              <a
                href="https://github.com/miya8060"
                target="_blank"
                rel="noopener noreferrer"
                className="miya-link inline-flex items-center gap-2 text-[13px]"
              >
                <GithubIcon className="h-3.5 w-3.5" aria-hidden="true" />
                GitHub
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 font-mono text-[10px] tracking-[0.18em] opacity-45">
            CONTACT
          </p>
          <ul className="flex flex-col gap-[7px]">
            <li>
              <a
                href="mailto:hello@miya8060.dev"
                className="miya-link text-[13px]"
              >
                hello@miya8060.dev
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-disabled="true"
                tabIndex={-1}
                className="pointer-events-none cursor-not-allowed text-[13px] opacity-55"
              >
                Schedule a chat →
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-border flex items-center justify-between border-t pt-[18px] font-mono text-[10px] tracking-[0.08em] opacity-55">
        <span>© {year} MIYA8060</span>
        <FooterClock />
      </div>
    </footer>
  );
}
