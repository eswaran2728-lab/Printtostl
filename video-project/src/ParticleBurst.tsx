import React from "react";
import { useCurrentFrame, interpolate, random } from "remotion";

// A short radial burst of gold particles, triggered once when it mounts —
// used to punctuate the CTA button appearing, not looped or continuous.
export const ParticleBurst: React.FC<{ originTop: string; count?: number }> = ({
  originTop,
  count = 24,
}) => {
  const frame = useCurrentFrame();
  if (frame > 35) return null;

  const particles = new Array(count).fill(0).map((_, i) => {
    const seed = `burst-${i}`;
    const angle = (i / count) * Math.PI * 2 + random(seed + "a") * 0.3;
    const distance = interpolate(frame, [0, 30], [0, 160 + random(seed + "d") * 100], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const opacity = interpolate(frame, [0, 4, 22, 32], [0, 1, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const size = 5 + random(seed + "s") * 7;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y, size, opacity, key: seed };
  });

  return (
    <div style={{ position: "absolute", left: "50%", top: originTop, pointerEvents: "none" }}>
      {particles.map((p) => (
        <div
          key={p.key}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            opacity: p.opacity,
            background:
              "radial-gradient(circle, rgba(255,238,200,1) 0%, rgba(202,163,119,0.8) 55%, rgba(202,163,119,0) 100%)",
          }}
        />
      ))}
    </div>
  );
};
