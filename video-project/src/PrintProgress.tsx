import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

// A minimal build-progress indicator — relevant to a 3D-printed piece being
// shown fresh off the printer, not a generic decorative bar.
export const PrintProgress: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 12, durationInFrames - 18, durationInFrames - 6],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const fill = interpolate(frame, [0, durationInFrames - 10], [8, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: "9%",
        left: 90,
        right: 90,
        opacity,
      }}
    >
      <div
        style={{
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontWeight: 600,
          fontSize: 22,
          color: "#fff8ef",
          textShadow: "0 2px 8px rgba(0,0,0,0.8)",
          marginBottom: 8,
          letterSpacing: 0.5,
        }}
      >
        PRINTING COMPLETE · {Math.round(fill)}%
      </div>
      <div
        style={{
          height: 6,
          borderRadius: 3,
          background: "rgba(255,255,255,0.25)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${fill}%`,
            background: "linear-gradient(90deg, #f3d9b1, #caa377)",
            borderRadius: 3,
          }}
        />
      </div>
    </div>
  );
};
