import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 py-20 text-center sm:px-10">
      <p className="font-mono text-[11px] tracking-[0.22em] opacity-50">
        ERROR · 404
      </p>
      <h1 className="font-display mt-4 text-4xl leading-[1.05] font-bold tracking-[-0.04em] sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-[14px] leading-[1.65] opacity-70">
        お探しのページは見つかりませんでした。URL
        をご確認の上、トップページからお探しください。
      </p>
      <Link
        href="/"
        className="miya-link mt-8 font-mono text-[11px] tracking-[0.22em] uppercase"
      >
        ← back to home
      </Link>
    </div>
  );
}
