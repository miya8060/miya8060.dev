import Link from "next/link";
import { Mail } from "lucide-react";
import type { ComponentProps } from "react";
import { Container } from "@/components/container";

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

const SOCIAL_LINKS = [
  {
    href: "https://github.com/miya8060",
    label: "GitHub",
    icon: GithubIcon,
    external: true,
  },
  {
    href: "/contact",
    label: "Contact",
    icon: Mail,
    external: false,
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border text-muted-foreground border-t">
      <Container className="flex h-16 items-center justify-between gap-4 text-sm">
        <p>© {year} miya8060</p>
        <ul className="flex items-center gap-1">
          {SOCIAL_LINKS.map(({ href, label, icon: Icon, external }) => {
            const linkClass =
              "hover:text-foreground inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors";
            return (
              <li key={href}>
                {external ? (
                  <a
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : (
                  <Link href={href} aria-label={label} className={linkClass}>
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </footer>
  );
}
