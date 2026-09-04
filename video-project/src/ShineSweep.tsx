import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

// A soft diagonal light streak that sweeps across the statue once, drawing
// the eye to the gold detailing without looking like a generic overlay.
export const ShineSweep: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame() - delay;
  const progress = interpolate(frame, [0, 45], [-40, 140], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [0, 8, 37, 45], [0, 0.55, 0.55, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (frame < 0 || frame > 45) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity,
        background: `linear-gradient(75deg, transparent ${progress - 14}%, rgba(255,238,200,0.85) ${progress}%, transparent ${progress + 14}%)`,
        mixBlendMode: "screen",
      }}
    />
  );
};
