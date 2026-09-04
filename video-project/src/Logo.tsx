import React from "react";
import { Img, staticFile, useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";

export const Logo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.6 },
  });

  const scale = interpolate(entrance, [0, 1], [0.4, 1]);
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const floatY = Math.sin(frame / 20) * 4;

  return (
    <div
      style={{
        position: "absolute",
        top: 48,
        right: 40,
        opacity,
        transform: `scale(${scale}) translateY(${floatY}px)`,
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.92)",
          borderRadius: 20,
          padding: "10px 14px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
          border: "1px solid rgba(202,163,119,0.5)",
        }}
      >
        <Img src={staticFile("eshan-logo.jpg")} style={{ width: 140, height: "auto", display: "block" }} />
      </div>
    </div>
  );
};
