import React from "react";
import { useCurrentFrame, interpolate, AbsoluteFill } from "remotion";
import { VECTA } from "./theme";

/** Subtle corner vignette, applied over every scene for a cinematic frame. */
export const CinematicVignette: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background:
        "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
    }}
  />
);

/** A thin data-line wipe transition: a red/white vertical line sweeps across
 * the screen, revealing the incoming scene as it passes. Place the OUTGOING
 * scene behind it and the INCOMING scene should already be mounted (Remotion
 * Sequences overlap during the transition window). */
export const DataLineWipe: React.FC<{ durationInFrames?: number }> = ({ durationInFrames = 14 }) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [0, durationInFrames], [0, 100], { extrapolateRight: "clamp" });
  if (frame > durationInFrames) return null;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: `${x}%`,
          top: 0,
          bottom: 0,
          width: 3,
          background: VECTA.red,
          boxShadow: `0 0 24px 4px ${VECTA.red}`,
          transform: "translateX(-50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: `${x}%`,
          background: VECTA.navyDeep,
        }}
      />
    </AbsoluteFill>
  );
};

/** Soft horizontal light sweep — a gentler alternative transition. */
export const LightSweep: React.FC<{ durationInFrames?: number }> = ({ durationInFrames = 18 }) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [0, durationInFrames], [-30, 130], { extrapolateRight: "clamp" });
  const opacity = interpolate(frame, [0, 4, durationInFrames - 4, durationInFrames], [0, 0.5, 0.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (frame > durationInFrames) return null;

  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity }}>
      <div
        style={{
          position: "absolute",
          left: `${x}%`,
          top: 0,
          bottom: 0,
          width: "20%",
          background: "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.5), rgba(255,255,255,0))",
          transform: "skewX(-12deg)",
        }}
      />
    </AbsoluteFill>
  );
};

/** Fade through navy — for major chapter changes. Render at the END of the
 * outgoing scene AND the START of the incoming scene (each covers half). */
export const FadeThroughNavy: React.FC<{ mode: "out" | "in"; durationInFrames?: number }> = ({
  mode,
  durationInFrames = 16,
}) => {
  const frame = useCurrentFrame();
  const opacity =
    mode === "out"
      ? interpolate(frame, [0, durationInFrames], [0, 1], { extrapolateRight: "clamp" })
      : interpolate(frame, [0, durationInFrames], [1, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ pointerEvents: "none", background: VECTA.navyDeep, opacity }} />
  );
};

/** Dark dissolve — simple opacity cross-fade used for architecture/security
 * transitions where a hard wipe would feel too aggressive. */
export const DarkDissolveOut: React.FC<{ durationInFrames?: number }> = ({ durationInFrames = 14 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, durationInFrames], [0, 1], { extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ pointerEvents: "none", background: "#000", opacity }} />;
};
