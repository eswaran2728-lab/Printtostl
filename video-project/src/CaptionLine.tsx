import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

const SANS = "'Helvetica Neue', Arial, sans-serif";

// A single premium caption line — mask reveal + slight upward ease-out, no
// bounce. `position` lets the same component land in different screen zones
// so consecutive captions don't feel repetitive.
export const CaptionLine: React.FC<{
  text: string;
  position?: "top" | "bottom" | "bottom-left" | "center-right";
  fontSize?: number;
  accent?: string;
}> = ({ text, position = "bottom", fontSize = 34, accent = "#e3b04b" }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(frame, [0, 16], [26, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const clip = interpolate(frame, [0, 18], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const posStyle: React.CSSProperties =
    position === "top"
      ? { top: "10%", left: 0, right: 190, textAlign: "center" }
      : position === "bottom-left"
        ? { bottom: "12%", left: 56, right: 320, textAlign: "left" }
        : position === "center-right"
          ? { top: "46%", left: "42%", right: 40, textAlign: "left" }
          : { bottom: "10%", left: 0, right: 0, textAlign: "center" };

  return (
    <div style={{ position: "absolute", ...posStyle, padding: "0 20px" }}>
      <div
        style={{
          display: "inline-block",
          opacity,
          transform: `translateY(${y}px)`,
          clipPath: `inset(0 ${Math.max(0, clip)}% 0 0)`,
        }}
      >
        <span
          style={{
            fontFamily: SANS,
            fontWeight: 700,
            fontSize,
            color: "#ffffff",
            textShadow: "0 2px 6px rgba(0,0,0,0.85), 0 6px 22px rgba(0,0,0,0.6)",
            borderLeft: position === "bottom-left" || position === "center-right" ? `3px solid ${accent}` : "none",
            paddingLeft: position === "bottom-left" || position === "center-right" ? 14 : 0,
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};
