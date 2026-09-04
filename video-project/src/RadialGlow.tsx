import React from "react";
import { useCurrentFrame } from "remotion";

// A soft pulsing gold glow, blended with "screen" so it only lifts the dark
// statue silhouette and wood shadows — never washes out the lighter areas.
export const RadialGlow: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 0.5 + Math.sin(frame / 24) * 0.5;
  const size = 70 + pulse * 15;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        mixBlendMode: "screen",
        background: `radial-gradient(circle at 50% 42%, rgba(202,163,119,${0.16 + pulse * 0.1}) 0%, rgba(202,163,119,0) ${size}%)`,
      }}
    />
  );
};
