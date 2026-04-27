import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 } as const;

export const OG_CONTENT_TYPE = "image/png";

export const OG_ALT = `${SITE_NAME} — ${SITE_TAGLINE}`;

const HOME_HEADING_TEXT = "Hi, I'm miya — Software Engineer.";
const HOME_TAGLINE_TEXT = "Freelance · Cloud · LLM · Tokyo";

const OG_FONT_TIMEOUT_MS = 2500;
const OG_FONT_RETRY_DELAY_MS = 250;

export type RenderOgImageOptions = {
  title?: string;
  eyebrow?: string;
  tagline?: string;
};

type OgFont = {
  name: string;
  data: ArrayBuffer;
  style: "normal" | "italic";
  weight: 400 | 500 | 700;
};

async function fetchWithTimeout(url: string): Promise<Response> {
  return fetch(url, { signal: AbortSignal.timeout(OG_FONT_TIMEOUT_MS) });
}

async function loadGoogleFontOnce(
  family: string,
  text: string,
): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(
    text,
  )}`;
  const cssResponse = await fetchWithTimeout(url);
  if (!cssResponse.ok) {
    throw new Error(`failed to load ${family} CSS (${cssResponse.status})`);
  }
  const css = await cssResponse.text();
  const resource = css.match(
    /src: url\((.+?)\) format\('(?:opentype|truetype|woff2?)'\)/,
  );
  if (!resource) throw new Error(`failed to parse ${family} CSS`);
  const fontResponse = await fetchWithTimeout(resource[1]);
  if (!fontResponse.ok) {
    throw new Error(`failed to load ${family} ttf (${fontResponse.status})`);
  }
  return fontResponse.arrayBuffer();
}

// Google Fonts への fetch は遅延・5xx・接続リセットが稀に起きる。
// タイムアウト + 1 回リトライで吸収し、それでも駄目なら null を返して
// ImageResponse のシステムフォント fallback に任せる (画像は必ず返す)。
async function loadGoogleFont(
  family: string,
  text: string,
): Promise<ArrayBuffer | null> {
  try {
    return await loadGoogleFontOnce(family, text);
  } catch (firstError) {
    await new Promise((resolve) => setTimeout(resolve, OG_FONT_RETRY_DELAY_MS));
    try {
      return await loadGoogleFontOnce(family, text);
    } catch (secondError) {
      console.warn(
        `[og] gave up on ${family}: ${String(firstError)} / ${String(secondError)}`,
      );
      return null;
    }
  }
}

function buildFont(
  name: string,
  data: ArrayBuffer | null,
  style: OgFont["style"],
  weight: OgFont["weight"],
): OgFont | null {
  return data ? { name, data, style, weight } : null;
}

function compactFonts(candidates: (OgFont | null)[]): OgFont[] {
  return candidates.filter((font): font is OgFont => font !== null);
}

export async function renderOgImage(options: RenderOgImageOptions = {}) {
  const wordmarkText = SITE_NAME;
  const pillText = "AVAILABLE FOR WORK·";
  const isCaseStudy = typeof options.title === "string";

  if (isCaseStudy) {
    const titleText = options.title!;
    const eyebrowText = options.eyebrow ?? "";
    const taglineText = options.tagline ?? HOME_TAGLINE_TEXT;
    const groteskGlyphs = `${titleText}${wordmarkText}`;
    const monoGlyphs = `${eyebrowText}${taglineText.toUpperCase()}${pillText}`;

    const [spaceGroteskBold, jetBrainsMono] = await Promise.all([
      loadGoogleFont("Space+Grotesk:wght@700", groteskGlyphs),
      loadGoogleFont("JetBrains+Mono:wght@500", monoGlyphs),
    ]);

    return new ImageResponse(
      <CaseStudyOg
        title={titleText}
        eyebrow={eyebrowText}
        tagline={taglineText}
      />,
      {
        ...OG_SIZE,
        fonts: compactFonts([
          buildFont("Space Grotesk", spaceGroteskBold, "normal", 700),
          buildFont("JetBrains Mono", jetBrainsMono, "normal", 500),
        ]),
      },
    );
  }

  const heroText = HOME_HEADING_TEXT;
  const taglineText = HOME_TAGLINE_TEXT;

  const [spaceGroteskBold, instrumentSerifItalic, jetBrainsMono] =
    await Promise.all([
      loadGoogleFont(
        "Space+Grotesk:wght@700",
        `${heroText}${wordmarkText}${taglineText}`,
      ),
      loadGoogleFont("Instrument+Serif:ital@1", "miya"),
      loadGoogleFont("JetBrains+Mono:wght@500", pillText),
    ]);

  return new ImageResponse(<HomeOg tagline={taglineText} />, {
    ...OG_SIZE,
    fonts: compactFonts([
      buildFont("Space Grotesk", spaceGroteskBold, "normal", 700),
      buildFont("Instrument Serif", instrumentSerifItalic, "italic", 400),
      buildFont("JetBrains Mono", jetBrainsMono, "normal", 500),
    ]),
  });
}

function OgFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#0c0c0d",
        color: "#f5f3ee",
        fontFamily: "Space Grotesk",
      }}
    >
      {children}
    </div>
  );
}

function OgHeader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 26,
          letterSpacing: "-0.01em",
          fontWeight: 700,
        }}
      >
        <span>miya8060</span>
        <span style={{ color: "#9fe5b8" }}>.dev</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 18px",
          border: "1px solid rgba(245,243,238,0.18)",
          borderRadius: 999,
          fontFamily: "JetBrains Mono",
          fontSize: 14,
          letterSpacing: "0.18em",
          opacity: 0.85,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: "#9fe5b8",
            boxShadow: "0 0 12px #9fe5b8",
          }}
        />
        <span>AVAILABLE FOR WORK</span>
      </div>
    </div>
  );
}

function HomeOg({ tagline }: { tagline: string }) {
  return (
    <OgFrame>
      <OgHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 28,
          maxWidth: 980,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            fontSize: 96,
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            fontWeight: 700,
          }}
        >
          <span>Hi, I&apos;m&nbsp;</span>
          <span
            style={{
              fontFamily: "Instrument Serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 108,
              color: "#9fe5b8",
            }}
          >
            miya
          </span>
          <span>&nbsp;— Software Engineer.</span>
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "JetBrains Mono",
            fontSize: 22,
            letterSpacing: "0.18em",
            opacity: 0.7,
          }}
        >
          {tagline.toUpperCase()}
        </div>
      </div>
    </OgFrame>
  );
}

function CaseStudyOg({
  title,
  eyebrow,
  tagline,
}: {
  title: string;
  eyebrow: string;
  tagline: string;
}) {
  return (
    <OgFrame>
      <OgHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 32,
          maxWidth: 1040,
        }}
      >
        {eyebrow ? (
          <div
            style={{
              display: "flex",
              fontFamily: "JetBrains Mono",
              fontSize: 20,
              letterSpacing: "0.22em",
              color: "#9fe5b8",
              opacity: 0.95,
            }}
          >
            {eyebrow.toUpperCase()}
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            fontSize: 76,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            fontWeight: 700,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "JetBrains Mono",
            fontSize: 20,
            letterSpacing: "0.18em",
            opacity: 0.7,
          }}
        >
          {tagline.toUpperCase()}
        </div>
      </div>
    </OgFrame>
  );
}
