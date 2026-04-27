import type { Metadata } from "next";
import { Container } from "@/components/container";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: "miya8060 のプロフィール、スキル、経歴。",
  path: "/about",
});

const SKILL_CATEGORIES = ["Languages", "Platforms", "Practices"] as const;
const EXPERIENCE_ROW_COUNT = 3;
const SKILL_CHIPS_PER_CATEGORY = 4;

const eyebrowClass = "font-mono text-[11px] tracking-[0.22em] opacity-50";
const sectionHeadingClass =
  "font-display mt-2 text-2xl font-bold tracking-[-0.03em] sm:text-3xl";
const sectionSubtitleClass = "mt-1 text-sm opacity-55";

function AvatarPlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="bg-muted border-border-soft flex aspect-square w-full items-center justify-center rounded-2xl border border-dashed"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-10 w-10 opacity-25 sm:h-12 sm:w-12"
      >
        <path d="M12 12.4a4.4 4.4 0 1 0 0-8.8 4.4 4.4 0 0 0 0 8.8Zm0 1.8c-3.6 0-9 1.8-9 5.4V21h18v-1.4c0-3.6-5.4-5.4-9-5.4Z" />
      </svg>
    </div>
  );
}

function SkillChip() {
  return (
    <span className="border-border bg-surface inline-flex min-w-[52px] items-center justify-center rounded-full border border-dashed px-3 py-1 font-mono text-[11px] tracking-[0.08em] opacity-55">
      —
    </span>
  );
}

export default function AboutPage() {
  return (
    <section className="px-5 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
      <Container>
        <p className={eyebrowClass}>ABOUT</p>
        <h1 className="font-display mt-3 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
          About
        </h1>
        <p className="mt-3 text-sm opacity-65">プロフィール</p>

        <div className="mt-12 flex flex-col gap-12 sm:mt-16 sm:gap-16">
          <section aria-labelledby="profile-heading">
            <p className={eyebrowClass}>PROFILE · 準備中</p>
            <h2 id="profile-heading" className={sectionHeadingClass}>
              Profile
            </h2>
            <p className={sectionSubtitleClass}>プロフィール</p>

            <div className="mt-6 grid grid-cols-[112px_1fr] items-start gap-5 sm:grid-cols-[160px_1fr] sm:gap-7">
              <AvatarPlaceholder />
              <div>
                <p className="font-serif text-[20px] leading-[1.4] italic opacity-55 sm:text-[22px]">
                  「リード文を準備中…」
                </p>
                <p className="mt-3 text-[14px] leading-[1.65] opacity-65">
                  本欄では関心領域・働き方・連絡時に伝えてほしいことを公開予定です。
                </p>
              </div>
            </div>
          </section>

          <section aria-labelledby="skills-heading">
            <p className={eyebrowClass}>SKILLS · 準備中</p>
            <h2 id="skills-heading" className={sectionHeadingClass}>
              Skills
            </h2>
            <p className={sectionSubtitleClass}>スキル</p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {SKILL_CATEGORIES.map((category) => (
                <div
                  key={category}
                  className="bg-card border-border rounded-2xl border p-5"
                >
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-55">
                    {category}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {Array.from({ length: SKILL_CHIPS_PER_CATEGORY }).map(
                      (_, i) => (
                        <SkillChip key={i} />
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="experience-heading">
            <p className={eyebrowClass}>EXPERIENCE · 準備中</p>
            <h2 id="experience-heading" className={sectionHeadingClass}>
              Experience
            </h2>
            <p className={sectionSubtitleClass}>経歴</p>

            <dl className="mt-6">
              {Array.from({ length: EXPERIENCE_ROW_COUNT }).map((_, i) => (
                <div
                  key={i}
                  className={`border-border-soft grid grid-cols-[72px_1fr] items-start gap-3 border-b py-4 sm:grid-cols-[96px_1fr] sm:gap-4 ${
                    i === 0 ? "border-t" : ""
                  }`}
                >
                  <dt className="pt-0.5 font-mono text-[11px] tracking-[0.18em] opacity-55">
                    —
                  </dt>
                  <dd className="m-0 flex flex-col gap-1">
                    <span className="text-[14px] opacity-70">—</span>
                    <span className="font-mono text-[11px] opacity-50">—</span>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </Container>
    </section>
  );
}
