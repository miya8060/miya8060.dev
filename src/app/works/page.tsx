import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Works",
  description: "ケーススタディ・OSS・サイドプロジェクト。",
};

export default function WorksPage() {
  return (
    <section className="px-5 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
      <p className="font-mono text-[11px] tracking-[0.22em] opacity-50">
        WORKS
      </p>
      <h1 className="font-display mt-3 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
        Works
      </h1>
      <p className="mt-3 text-sm opacity-65">
        ケーススタディ・OSS・サイドプロジェクト
      </p>

      <div className="mt-12 sm:mt-16">
        <div className="border-border flex min-h-[180px] flex-col items-start justify-center gap-2 rounded-2xl border border-dashed p-8">
          <p className="font-mono text-[10px] tracking-[0.22em] opacity-50">
            COMING SOON · 準備中
          </p>
          <p className="text-[14px] leading-[1.65] opacity-70">
            Case studies, OSS contributions, and side projects will appear
            here.
          </p>
        </div>
      </div>
    </section>
  );
}
