import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

// A one-time soft light flare that blooms and fades at the start of a
// sequence — used to sell a "reveal" moment without any unrelated sticker.
export const LightFlareReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10, 30], [0, 0.8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, 30], [0.6, 1.6], { extrapolateRight: "clamp" });

  if (frame > 30) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        mixBlendMode: "screen",
        opacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "38%",
          left: "50%",
          width: 700,
          height: 700,
          transform: `translate(-50%, -50%) scale(${scale})`,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,244,224,0.9) 0%, rgba(243,217,177,0.35) 40%, rgba(243,217,177,0) 70%)",
        }}
      />
    </div>
  );
};
