import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

// A small decorative trident glyph, echoing the statue's own Thiru Sulam —
// a graphic that's actually related to the product, not a generic sticker.
export const TridentMark: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14, stiffness: 130, mass: 0.5 } });
  const scale = interpolate(entrance, [0, 1], [0.3, 1]);
  const opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const glow = 0.4 + Math.sin(frame / 10) * 0.25;

  return (
    <div
      style={{
        position: "absolute",
        left: 36,
        bottom: 42,
        opacity,
        transform: `scale(${scale})`,
        filter: `drop-shadow(0 0 ${8 + glow * 10}px rgba(202,163,119,${0.5 + glow * 0.3}))`,
      }}
    >
      <svg width="80" height="106" viewBox="0 0 54 72" fill="none">
        <path
          d="M27 8 L27 64 M27 8 L14 22 M27 8 L40 22 M18 30 C18 18 36 18 36 30"
          stroke="url(#tridentGold)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="tridentGold" x1="0" y1="0" x2="54" y2="72" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f3d9b1" />
            <stop offset="50%" stopColor="#caa377" />
            <stop offset="100%" stopColor="#8a6a45" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
