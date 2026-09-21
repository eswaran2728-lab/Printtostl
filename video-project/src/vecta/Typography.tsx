import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { VECTA } from "./theme";

/** A thin red line that draws in first, used before every SectionTitle. */
export const LeadLine: React.FC<{ delay?: number; width?: number; align?: "left" | "center" }> = ({
  delay = 0,
  width = 64,
  align = "center",
}) => {
  const frame = useCurrentFrame() - delay;
  const p = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (frame < -2) return null;
  return (
    <div
      style={{
        width: width * p,
        height: 3,
        background: VECTA.red,
        marginBottom: 18,
        marginLeft: align === "center" ? "auto" : 0,
        marginRight: align === "center" ? "auto" : 0,
      }}
    />
  );
};

export const SectionTitle: React.FC<{
  text: string;
  delay?: number;
  fontSize?: number;
  align?: "left" | "center";
  top?: number | string;
}> = ({ text, delay = 0, fontSize = 56, align = "center", top }) => {
  const frame = useCurrentFrame() - delay;
  const opacity = interpolate(frame, [6, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(frame, [6, 26], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tracking = interpolate(frame, [6, 30], [4, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ position: top !== undefined ? "absolute" : "relative", top, left: 0, right: 0, textAlign: align }}>
      <LeadLine delay={delay} align={align} />
      <div
        style={{
          opacity,
          transform: `translateY(${y}px)`,
          fontFamily: VECTA.sans,
          fontWeight: 700,
          fontSize,
          letterSpacing: tracking,
          color: VECTA.white,
          textShadow: "0 2px 20px rgba(0,0,0,0.6)",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const Subtitle: React.FC<{
  text: string;
  delay?: number;
  fontSize?: number;
  align?: "left" | "center";
  top?: number | string;
  color?: string;
}> = ({ text, delay = 0, fontSize = 24, align = "center", top, color = VECTA.grey }) => {
  const frame = useCurrentFrame() - delay;
  const opacity = interpolate(frame, [0, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(frame, [0, 18], [14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: top !== undefined ? "absolute" : "relative",
        top,
        left: 0,
        right: 0,
        textAlign: align,
        opacity,
        transform: `translateY(${y}px)`,
        fontFamily: VECTA.sans,
        fontWeight: 400,
        fontSize,
        letterSpacing: 0.5,
        color,
        whiteSpace: "pre-line",
        lineHeight: 1.4,
      }}
    >
      {text}
    </div>
  );
};

/** Small anchored technical label with a thin connector line — for pointing at
 * a part of the underlying footage (a role, zone, or system named in-frame). */
export const TechLabel: React.FC<{
  text: string;
  top: number | string;
  left: number | string;
  delay?: number;
  lineWidth?: number;
  flip?: boolean;
}> = ({ text, top, left, delay = 0, lineWidth = 46, flip = false }) => {
  const frame = useCurrentFrame() - delay;
  if (frame < 0) return null;
  const lineP = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const opacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  const textOp = interpolate(frame, [8, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        opacity,
        display: "flex",
        flexDirection: flip ? "row-reverse" : "row",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div style={{ width: lineWidth * lineP, height: 1.5, background: `linear-gradient(${flip ? 270 : 90}deg, ${VECTA.red}, rgba(224,41,62,0))` }} />
      <span
        style={{
          fontFamily: VECTA.sans,
          fontWeight: 600,
          fontSize: 15,
          letterSpacing: 2,
          color: VECTA.white,
          opacity: textOp,
          whiteSpace: "nowrap",
          textShadow: "0 2px 8px rgba(0,0,0,0.8)",
        }}
      >
        {text}
      </span>
    </div>
  );
};

export const StatusChip: React.FC<{
  text: string;
  delay?: number;
  tone?: "active" | "done" | "neutral" | "proposed";
}> = ({ text, delay = 0, tone = "neutral" }) => {
  const frame = useCurrentFrame() - delay;
  if (frame < 0) return null;
  const scale = spring({ frame, fps: 30, config: { damping: 16, stiffness: 160, mass: 0.5 } });
  const opacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  const colors = {
    active: { bg: "rgba(224,41,62,0.15)", border: VECTA.red, text: VECTA.white },
    done: { bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.35)", text: VECTA.grey },
    neutral: { bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.2)", text: VECTA.grey },
    proposed: { bg: "rgba(224,41,62,0.08)", border: VECTA.redDim, text: VECTA.white },
  }[tone];

  return (
    <div
      style={{
        display: "inline-block",
        opacity,
        transform: `scale(${0.8 + scale * 0.2})`,
        padding: "8px 18px",
        borderRadius: 20,
        border: `1px solid ${colors.border}`,
        background: colors.bg,
        fontFamily: VECTA.sans,
        fontWeight: 600,
        fontSize: 14,
        letterSpacing: 1.5,
        color: colors.text,
      }}
    >
      {text}
    </div>
  );
};

/** The VECTA brand mark itself — used for the mid-film reveal and the final
 * closing card. Deliberately the largest text in the whole film. */
export const VectaTitle: React.FC<{ delay?: number; scale?: number }> = ({ delay = 0, scale = 1 }) => {
  const frame = useCurrentFrame() - delay;
  const { fps } = useVideoConfig();
  if (frame < 0) return null;

  const spr = spring({ frame, fps, config: { damping: 20, stiffness: 90, mass: 0.8 } });
  const s = interpolate(spr, [0, 1], [0.85, 1]);
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const glow = 0.4 + Math.sin(frame / 20) * 0.25;

  return (
    <div style={{ textAlign: "center", opacity, transform: `scale(${s * scale})` }}>
      <div
        style={{
          position: "relative",
          display: "inline-block",
          fontFamily: VECTA.sans,
          fontWeight: 800,
          fontSize: 128,
          letterSpacing: 6,
          color: VECTA.white,
        }}
      >
        <span
          style={{
            position: "absolute",
            inset: 0,
            filter: `blur(28px)`,
            color: VECTA.red,
            opacity: glow * 0.55,
          }}
        >
          VECTA
        </span>
        <span style={{ position: "relative" }}>VECTA</span>
      </div>
    </div>
  );
};
