import type { Metadata } from "next";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Contact",
  description: "お仕事のご相談・カジュアル面談はこちらから。",
};

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

        <ul className="mt-8 flex flex-col gap-3">
          <li>
            <a
              href="mailto:hello@miya8060.dev"
              className="miya-link font-mono text-sm tracking-[0.15em]"
            >
              hello@miya8060.dev
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-disabled="true"
              tabIndex={-1}
              className="pointer-events-none inline-block cursor-not-allowed font-mono text-sm tracking-[0.15em] opacity-55"
            >
              Schedule a chat (準備中)
            </a>
          </li>
        </ul>
      </Container>
    </section>
  );
}
