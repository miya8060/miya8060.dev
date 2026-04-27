import type { Metadata } from "next";
import { OG_ALT, OG_SIZE } from "@/lib/og-image";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type Title = NonNullable<Metadata["title"]>;

export type PageMetadataInput = {
  title: Title;
  description: string;
  path: string;
  ogTitle?: string;
};

const OG_IMAGE = {
  url: "/opengraph-image",
  width: OG_SIZE.width,
  height: OG_SIZE.height,
  alt: OG_ALT,
  type: "image/png",
} as const;

export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
}: PageMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const resolvedOgTitle =
    ogTitle ??
    (typeof title === "string"
      ? `${title} — ${SITE_NAME}`
      : "absolute" in title
        ? title.absolute
        : SITE_NAME);

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "ja_JP",
      siteName: SITE_NAME,
      url,
      title: resolvedOgTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedOgTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}
