import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

const FPS = 30;
// Times below are OUTPUT-timeline seconds (absolute), converted to frames
// by the caller's Sequence placement — this component receives frame 0 at
// 02:53.000 and is mounted for exactly the fade-in+hold+fade-with-picture
// window (02:53.000-02:56.352 = 3.352s = 101 frames).
const FADE_IN_FRAMES = Math.round(0.5 * FPS); // 02:53.000-02:53.500
const HOLD_END_FRAME = Math.round(2.9 * FPS); // through 02:55.900 (2.9s after start)
// fade-with-picture (02:55.900-02:56.352) is handled by FilmFinish's global
// fade, so this component just fades ITSELF out over the same span to stay
// in sync rather than popping off.
const TOTAL_FRAMES = Math.round(3.352 * FPS);

export const FinalCredits: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, FADE_IN_FRAMES], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [HOLD_END_FRAME, TOTAL_FRAMES], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);
  const scale = 0.99 + 0.01 * fadeIn;

  if (opacity <= 0) return null;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: "6%",
          bottom: "8%",
          opacity,
          transform: `scale(${scale})`,
          transformOrigin: "left bottom",
          textAlign: "left",
          color: "#F1ECE2",
          fontFamily: "'Cormorant Garamond', serif",
          textShadow: "0 2px 16px rgba(0,0,0,0.55)",
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: "0.08em" }}>A FILM BY ESWARAN</div>
        <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: "0.12em", marginTop: 8, opacity: 0.9 }}>
          AN ESHAN PRODUCTION
        </div>
        <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: "0.1em", marginTop: 14, opacity: 0.8 }}>
          VISUAL PRODUCTION &nbsp;•&nbsp; OMNI
        </div>
        <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: "0.1em", marginTop: 4, opacity: 0.8 }}>
          MUSIC CREATED WITH &nbsp;•&nbsp; GOOGLE FLOW MUSIC
        </div>
        <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: "0.15em", marginTop: 14, opacity: 0.7 }}>
          2026
        </div>
      </div>
    </AbsoluteFill>
  );
};
