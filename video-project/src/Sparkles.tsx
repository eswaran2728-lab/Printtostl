import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, random } from "remotion";

type SparkleProps = {
  count?: number;
};

export const Sparkles: React.FC<SparkleProps> = ({ count = 18 }) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const particles = new Array(count).fill(0).map((_, i) => {
    const seed = `sparkle-${i}`;
    const x = random(seed + "x") * width;
    const baseY = random(seed + "y") * height;
    const speed = 12 + random(seed + "speed") * 18;
    const size = 4 + random(seed + "size") * 10;
    const delay = random(seed + "delay") * fps * 4;

    const y = baseY - ((frame + delay) * speed) % (height + 100);
    const twinkle = Math.sin((frame + delay) / 6 + i) * 0.5 + 0.5;
    const opacity = interpolate(twinkle, [0, 1], [0.15, 0.9]);

    return { x, y, size, opacity, key: seed };
  });

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
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
            background:
              "radial-gradient(circle, rgba(255,225,180,1) 0%, rgba(202,163,119,0.6) 60%, rgba(202,163,119,0) 100%)",
            opacity: p.opacity,
            filter: "blur(0.3px)",
          }}
        />
      ))}
    </div>
  );
};
