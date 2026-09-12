import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

const SANS = "'Helvetica Neue', Arial, sans-serif";

// A small technical/HUD-style label with a thin animated line — the
// "craftsmanship" graphic language: minimal geometry, no futuristic clutter.
export const HUDLabel: React.FC<{
  text: string;
  top: number | string;
  left: number | string;
  lineWidth?: number;
  delay?: number;
}> = ({ text, top, left, lineWidth = 60, delay = 0 }) => {
  const frame = useCurrentFrame() - delay;
  if (frame < 0) return null;

  const lineProgress = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: "clamp" });
  const opacity = interpolate(frame, [0, 8, 46, 54], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textOpacity = interpolate(frame, [10, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", top, left, opacity, display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          width: lineWidth * lineProgress,
          height: 1.5,
          background: "linear-gradient(90deg, #e3b04b, rgba(227,176,75,0))",
        }}
      />
      <span
        style={{
          fontFamily: SANS,
          fontWeight: 600,
          fontSize: 20,
          letterSpacing: 3,
          color: "#e3b04b",
          opacity: textOpacity,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </span>
    </div>
  );
};

export const StatusHUD: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame() - delay;
  if (frame < 0) return null;
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        top: 300,
        right: 40,
        opacity,
        textAlign: "right",
        fontFamily: SANS,
      }}
    >
      <div style={{ fontSize: 15, letterSpacing: 3, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
        PRINT STATUS
      </div>
      <div style={{ fontSize: 22, letterSpacing: 2, color: "#e3b04b", fontWeight: 800, marginTop: 4 }}>
        50% COMPLETE
      </div>
      <div
        style={{
          marginTop: 6,
          width: 140,
          height: 3,
          background: "rgba(255,255,255,0.2)",
          marginLeft: "auto",
        }}
      >
        <div style={{ width: "50%", height: "100%", background: "#e3b04b" }} />
      </div>
    </div>
  );
};
