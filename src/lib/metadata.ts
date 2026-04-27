import type { Metadata } from "next";
import { OG_ALT, OG_SIZE } from "@/lib/og-image";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type Title = NonNullable<Metadata["title"]>;

export type PageMetadataInput = {
  title: Title;
  description: string;
  path: string;
  ogTitle?: string;
  ogImagePath?: string;
  ogImageAlt?: string;
};

const DEFAULT_OG_IMAGE_PATH = "/opengraph-image";

function buildOgImage(path: string, alt: string) {
  return {
    url: path,
    width: OG_SIZE.width,
    height: OG_SIZE.height,
    alt,
    type: "image/png",
  } as const;
}

export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogImagePath = DEFAULT_OG_IMAGE_PATH,
  ogImageAlt = OG_ALT,
}: PageMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const resolvedOgTitle =
    ogTitle ??
    (typeof title === "string"
      ? `${title} — ${SITE_NAME}`
      : "absolute" in title
        ? title.absolute
        : SITE_NAME);
  const ogImage = buildOgImage(ogImagePath, ogImageAlt);

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
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedOgTitle,
      description,
      images: [ogImage],
    },
  };
}
