import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const CONDENSED = "'Arial Narrow', 'Helvetica Neue', Arial, sans-serif";

// A word (or short phrase) that appears as a mask/clip-path reveal with a
// slight scale-down-to-rest and tracking (letter-spacing) settle — the
// "elegant kinetic typography" the brief asks for, not a basic fade.
export const KineticWord: React.FC<{
  text: string;
  delay?: number;
  emphasis?: boolean;
  fontSize?: number;
  color?: string;
}> = ({ text, delay = 0, emphasis = false, fontSize = 54, color = "#ffffff" }) => {
  const frame = useCurrentFrame() - delay;
  const { fps } = useVideoConfig();

  const spr = spring({ frame, fps, config: { damping: 18, stiffness: 120, mass: 0.6 } });
  const scale = interpolate(spr, [0, 1], [1.35, 1]);
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const clip = interpolate(frame, [0, 14], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tracking = interpolate(spr, [0, 1], [8, emphasis ? 1 : 0.5]);

  if (frame < 0) return null;

  return (
    <span
      style={{
        display: "inline-block",
        opacity,
        transform: `scale(${scale})`,
        clipPath: `inset(0 ${Math.max(0, clip)}% 0 0)`,
        fontFamily: CONDENSED,
        fontWeight: 900,
        fontStretch: "condensed",
        letterSpacing: tracking,
        fontSize: emphasis ? fontSize * 1.4 : fontSize,
        color,
        textShadow: "0 2px 4px rgba(0,0,0,0.9), 0 8px 28px rgba(0,0,0,0.7)",
      }}
    >
      {text}
    </span>
  );
};

export const KineticTitle: React.FC<{
  lines: { text: string; emphasis?: boolean }[][];
  fontSize?: number;
  top?: number | string;
  gapPerWord?: number;
}> = ({ lines, fontSize = 54, top = "8%", gapPerWord = 5 }) => {
  let wordIndex = 0;

  return (
    <>
      {/* Dark scrim so white type stays legible over any part of the frame. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 320,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 65%, rgba(0,0,0,0) 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top,
          left: 0,
          right: 190,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          padding: "0 36px",
        }}
      >
        {lines.map((line, li) => (
          <div key={li} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
            {line.map((word, wi) => {
              const delay = wordIndex * gapPerWord;
              wordIndex += 1;
              return (
                <KineticWord
                  key={wi}
                  text={word.text}
                  emphasis={word.emphasis}
                  delay={delay}
                  fontSize={fontSize}
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};
