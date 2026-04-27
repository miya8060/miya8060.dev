import type { Metadata } from "next";
import type { ComponentProps } from "react";
import { Container } from "@/components/container";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "お仕事のご相談・カジュアル面談はこちらから。",
  path: "/contact",
});

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

export default function ContactPage() {
  return (
    <section className="px-5 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
      <Container>
        <p className="font-mono text-[11px] tracking-[0.22em] opacity-50">
          CONTACT
        </p>
        <h1 className="font-display mt-3 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
          Contact
        </h1>
        <p className="mt-3 text-sm opacity-65">お問い合わせ</p>

        <p className="mt-12 max-w-prose text-[14px] leading-[1.75] opacity-70 sm:mt-16">
          お仕事のご相談、カジュアル面談、技術的な質問など、お気軽にどうぞ。
        </p>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <a
            href="mailto:hello@miya8060.dev"
            className="bg-foreground text-background hover:bg-foreground/90 group flex items-center justify-between gap-4 rounded-2xl px-5 py-4 transition-colors"
          >
            <span className="flex flex-col gap-1">
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-65">
                Email
              </span>
              <span className="font-mono text-[14px] tracking-[0.04em]">
                hello@miya8060.dev
              </span>
            </span>
            <span
              aria-hidden="true"
              className="opacity-65 transition-opacity group-hover:opacity-100"
            >
              →
            </span>
          </a>

          <a
            href="https://github.com/miya8060"
            target="_blank"
            rel="noopener noreferrer"
            className="border-border hover:bg-foreground/[0.04] group flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 transition-colors"
          >
            <span className="flex items-center gap-3">
              <GithubIcon className="h-4 w-4 opacity-70" aria-hidden="true" />
              <span className="flex flex-col gap-1">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-50">
                  GitHub
                </span>
                <span className="font-mono text-[14px] tracking-[0.04em]">
                  @miya8060
                </span>
              </span>
            </span>
            <span
              aria-hidden="true"
              className="opacity-50 transition-opacity group-hover:opacity-100"
            >
              ↗
            </span>
          </a>
        </div>

        <div
          aria-labelledby="schedule-heading"
          className="border-border bg-surface mt-6 flex max-w-prose flex-col gap-2 rounded-2xl border border-dashed p-5"
        >
          <p
            id="schedule-heading"
            className="font-mono text-[10px] tracking-[0.22em] opacity-50"
          >
            SCHEDULE · 準備中
          </p>
          <p className="text-[14px] leading-[1.65] opacity-70">
            カジュアル面談用のブッキングフォームを準備中です。当面はメールでご連絡ください。
          </p>
          <span
            aria-disabled="true"
            className="mt-1 inline-block cursor-not-allowed font-mono text-[11px] tracking-[0.15em] uppercase opacity-45"
          >
            Schedule a chat (準備中)
          </span>
        </div>
      </Container>
    </section>
  );
}
