import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, staticFile } from "remotion";

const FPS = 30;
// 00:01.000-00:01.800 fade in (24 frames), hold to 00:04.500, fade out
// 00:04.500-00:05.500 (30 frames). All relative to Scene 01's own Sequence.
const FADE_IN_START = Math.round(1.0 * FPS);
const FADE_IN_FRAMES = 24;
const FADE_OUT_START = Math.round(4.5 * FPS);
const FADE_OUT_FRAMES = 30;

export const OpeningTitle: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [FADE_IN_START, FADE_IN_START + FADE_IN_FRAMES], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [FADE_OUT_START, FADE_OUT_START + FADE_OUT_FRAMES], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);
  if (opacity <= 0) return null;

  // 99->100% scale and a very subtle letter-spacing expansion, tied to the
  // same fade-in window only (settles once fully visible).
  const revealT = interpolate(frame, [FADE_IN_START, FADE_IN_START + FADE_IN_FRAMES], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = 0.99 + 0.01 * revealT;
  const tracking = 0.02 + 0.01 * (1 - revealT); // em, slightly wider before settling

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "14%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity,
          transform: `scale(${scale})`,
          transformOrigin: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Noto Sans Tamil', 'Noto Sans', sans-serif",
            fontWeight: 600,
            fontSize: 64,
            color: "#F1ECE2",
            letterSpacing: `${tracking}em`,
            textShadow: "0 2px 18px rgba(0,0,0,0.45)",
          }}
        >
          நீ போன பின்னே
        </div>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            fontSize: 26,
            color: "#F1ECE2",
            letterSpacing: `${0.35 + tracking}em`,
            marginTop: 10,
            textTransform: "uppercase",
            textShadow: "0 2px 14px rgba(0,0,0,0.4)",
          }}
        >
          Nee Pona Pinne
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const TAMIL_FONT_FACES = `
@font-face {
  font-family: 'Noto Sans Tamil';
  src: url('${staticFile("fonts/noto-sans-tamil-tamil-600-normal.woff2")}') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: 'Noto Sans Tamil';
  src: url('${staticFile("fonts/noto-sans-tamil-tamil-400-normal.woff2")}') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: 'Cormorant Garamond';
  src: url('${staticFile("fonts/cormorant-garamond-latin-500-normal.woff2")}') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: 'Cormorant Garamond';
  src: url('${staticFile("fonts/cormorant-garamond-latin-600-normal.woff2")}') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: block;
}
`;
