import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const CTAButton: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 12, stiffness: 160, mass: 0.6 } });
  const scaleIn = interpolate(entrance, [0, 1], [0.5, 1]);

  const pulse = 1 + Math.sin(frame / 8) * 0.035;
  const glow = 0.5 + Math.sin(frame / 8) * 0.3;

  return (
    <div
      style={{
        position: "absolute",
        bottom: "16%",
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        transform: `scale(${scaleIn * pulse})`,
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #f3d9b1 0%, #caa377 50%, #8a6a45 100%)",
          padding: "22px 56px",
          borderRadius: 50,
          boxShadow: `0 0 ${30 + glow * 30}px rgba(202,163,119,${0.5 + glow * 0.3}), 0 10px 30px rgba(0,0,0,0.5)`,
        }}
      >
        <span
          style={{
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontWeight: 800,
            fontSize: 40,
            color: "#2a1d10",
            letterSpacing: 1.5,
          }}
        >
          SHOP NOW
        </span>
      </div>
    </div>
  );
};
