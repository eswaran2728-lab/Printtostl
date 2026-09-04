import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

// Viewfinder-style corner brackets that draw themselves in, framing the
// product like a camera focusing on it — a cinematic "reveal" motion graphic.
export const CornerFrame: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const inset = interpolate(draw, [0, 1], [60, 0]);
  const armLength = 46;

  const corner = (top?: number, bottom?: number, left?: number, right?: number, flipX = false, flipY = false) => (
    <svg
      width={armLength}
      height={armLength}
      viewBox={`0 0 ${armLength} ${armLength}`}
      style={{
        position: "absolute",
        top,
        bottom,
        left,
        right,
        transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})`,
      }}
    >
      <path
        d={`M0 ${armLength * draw} L0 0 L${armLength * draw} 0`}
        stroke="rgba(243,217,177,0.85)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 90 + inset,
        left: 24 + inset * 0.4,
        right: 24 + inset * 0.4,
        bottom: 90 + inset,
        opacity,
        pointerEvents: "none",
      }}
    >
      {corner(0, undefined, 0, undefined, false, false)}
      {corner(0, undefined, undefined, 0, true, false)}
      {corner(undefined, 0, 0, undefined, false, true)}
      {corner(undefined, 0, undefined, 0, true, true)}
    </div>
  );
};
