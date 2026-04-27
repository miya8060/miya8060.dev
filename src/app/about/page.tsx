import type { Metadata } from "next";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "About",
  description: "miya8060 のプロフィール、スキル、経歴。",
};

const SECTIONS = [
  { eyebrow: "PROFILE · 準備中", title: "Profile", subtitle: "プロフィール" },
  { eyebrow: "SKILLS · 準備中", title: "Skills", subtitle: "スキル" },
  {
    eyebrow: "EXPERIENCE · 準備中",
    title: "Experience",
    subtitle: "経歴",
  },
] as const;

export default function AboutPage() {
  return (
    <section className="px-5 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
      <Container>
        <p className="font-mono text-[11px] tracking-[0.22em] opacity-50">
          ABOUT
        </p>
        <h1 className="font-display mt-3 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
          About
        </h1>
        <p className="mt-3 text-sm opacity-65">プロフィール</p>

        <div className="mt-12 flex flex-col gap-12 sm:mt-16 sm:gap-16">
          {SECTIONS.map(({ eyebrow, title, subtitle }) => (
            <div key={title}>
              <p className="font-mono text-[11px] tracking-[0.22em] opacity-50">
                {eyebrow}
              </p>
              <h2 className="font-display mt-2 text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
                {title}
              </h2>
              <p className="mt-1 text-sm opacity-55">{subtitle}</p>
              <p className="mt-3 text-[14px] leading-[1.65] opacity-70">
                内容は近日公開します。
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
