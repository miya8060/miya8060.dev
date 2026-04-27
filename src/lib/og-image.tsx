import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 } as const;

export const OG_CONTENT_TYPE = "image/png";

export const OG_ALT = `${SITE_NAME} — ${SITE_TAGLINE}`;

const HEADING_TEXT = "Hi, I'm miya — Software Engineer.";
const TAGLINE_TEXT = "Freelance · Cloud · LLM · Tokyo";

async function loadGoogleFont(family: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(
    text,
  )}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+?)\) format\('(?:opentype|truetype|woff2?)'\)/,
  );
  if (!resource) throw new Error(`failed to parse ${family} CSS`);
  const fontResponse = await fetch(resource[1]);
  if (!fontResponse.ok) throw new Error(`failed to load ${family} ttf`);
  return fontResponse.arrayBuffer();
}

export async function renderOgImage() {
  const heroText = HEADING_TEXT;
  const wordmarkText = SITE_NAME;
  const taglineText = TAGLINE_TEXT;

  const [spaceGroteskBold, instrumentSerifItalic, jetBrainsMono] =
    await Promise.all([
      loadGoogleFont(
        "Space+Grotesk:wght@700",
        `${heroText}${wordmarkText}${taglineText}`,
      ),
      loadGoogleFont("Instrument+Serif:ital@1", "miya"),
      loadGoogleFont("JetBrains+Mono:wght@500", "AVAILABLE FOR WORK·"),
    ]);

  return new ImageResponse(
    (
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
            {taglineText.toUpperCase()}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        {
          name: "Space Grotesk",
          data: spaceGroteskBold,
          style: "normal",
          weight: 700,
        },
        {
          name: "Instrument Serif",
          data: instrumentSerifItalic,
          style: "italic",
          weight: 400,
        },
        {
          name: "JetBrains Mono",
          data: jetBrainsMono,
          style: "normal",
          weight: 500,
        },
      ],
    },
  );
}
