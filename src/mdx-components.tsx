import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

function CaseStudyPlaceholder() {
  return (
    <div className="border-border flex min-h-[160px] flex-col items-start justify-center gap-2 rounded-2xl border border-dashed p-8">
      <p className="font-mono text-[10px] tracking-[0.22em] opacity-50">
        FULL CASE STUDY · 準備中
      </p>
      <p className="text-[14px] leading-[1.65] opacity-70">
        背景・課題・アプローチ・成果は近日公開します。
      </p>
    </div>
  );
}

const components: MDXComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="font-display mt-12 mb-4 text-2xl font-bold tracking-[-0.02em] sm:text-3xl"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="font-display mt-8 mb-3 text-xl font-bold tracking-[-0.015em]"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-4 text-[15px] leading-[1.7] opacity-80" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="mt-4 list-disc space-y-1.5 pl-6 text-[15px] leading-[1.7] opacity-80"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="mt-4 list-decimal space-y-1.5 pl-6 text-[15px] leading-[1.7] opacity-80"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="leading-[1.7]" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a className="miya-link" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-medium" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="italic" {...props} />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr className="border-border my-10 border-t" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="bg-surface rounded px-1.5 py-0.5 font-mono text-[13px]"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="bg-card border-border mt-6 overflow-x-auto rounded-2xl border p-5 font-mono text-[13px] leading-[1.65]"
      {...props}
    />
  ),
  CaseStudyPlaceholder,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
