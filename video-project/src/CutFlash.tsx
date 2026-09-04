import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

// A very short white flash at the start of a sequence, sells a "fast cut"
// feeling on the hard cuts between rotation angles.
export const CutFlash: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 2, 8], [0.55, 0.25, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (frame > 8) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#fff",
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};
