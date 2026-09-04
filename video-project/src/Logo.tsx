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
        top: 30,
        right: 10,
        opacity,
        transform: `scale(${scale}) translateY(${floatY}px)`,
      }}
    >
      {/* Logo art already has a black background with a baked-in glow — blend
          it with "screen" so the black drops out and only the rose-gold mark
          and its glow sit on top of the video. */}
      <Img
        src={staticFile("eshan-logo-v2.png")}
        style={{
          width: 320,
          height: "auto",
          display: "block",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
};
