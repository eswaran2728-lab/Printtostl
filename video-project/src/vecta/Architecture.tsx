import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { VECTA } from "./theme";

/** A single labeled box in an architecture/evolution diagram. `dim` renders
 * it as a completed/inactive past-stage (grey); otherwise it's the active
 * red-accented stage. */
export const ArchitectureNode: React.FC<{
  title: string;
  subtitle?: string;
  x: number;
  y: number;
  delay?: number;
  dim?: boolean;
  width?: number;
}> = ({ title, subtitle, x, y, delay = 0, dim = false, width = 220 }) => {
  const frame = useCurrentFrame() - delay;
  if (frame < 0) return null;
  const opacity = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: "clamp" });
  const scale = interpolate(frame, [0, 14], [0.92, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        opacity: dim ? opacity * 0.55 : opacity,
        transform: `scale(${scale})`,
        transformOrigin: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          padding: "16px 14px",
          borderRadius: 10,
          border: `1px solid ${dim ? "rgba(255,255,255,0.18)" : VECTA.red}`,
          background: dim ? "rgba(255,255,255,0.03)" : "rgba(224,41,62,0.08)",
          boxShadow: dim ? "none" : "0 0 30px rgba(224,41,62,0.25)",
        }}
      >
        <div
          style={{
            fontFamily: VECTA.sans,
            fontWeight: 700,
            fontSize: 20,
            color: dim ? VECTA.grey : VECTA.white,
            letterSpacing: 0.5,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div style={{ fontFamily: VECTA.sans, fontWeight: 400, fontSize: 13, color: VECTA.greyDim, marginTop: 4 }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

/** A thin connector line between two architecture nodes, with an optional
 * traveling data pulse. Coordinates are in the same pixel space as nodes. */
export const ArchitectureConnector: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay?: number;
  pulse?: boolean;
  pulseDelay?: number;
}> = ({ x1, y1, x2, y2, delay = 0, pulse = false, pulseDelay = 0 }) => {
  const frame = useCurrentFrame() - delay;
  if (frame < 0) return null;
  const p = interpolate(frame, [0, 16], [0, 1], { extrapolateRight: "clamp" });
  const length = Math.hypot(x2 - x1, y2 - y1);
  const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

  const pulseFrame = frame - pulseDelay;
  const pulseT = ((pulseFrame % 60) + 60) % 60;
  const showPulse = pulse && pulseFrame >= 0;
  const pulsePos = interpolate(pulseT, [0, 40], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        left: x1,
        top: y1,
        width: length * p,
        height: 2,
        background: "rgba(255,255,255,0.18)",
        transform: `rotate(${angle}deg)`,
        transformOrigin: "left center",
      }}
    >
      {showPulse && pulseT < 40 && (
        <div
          style={{
            position: "absolute",
            left: `${pulsePos * 100}%`,
            top: -3,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: VECTA.red,
            boxShadow: `0 0 10px ${VECTA.red}`,
            transform: "translateX(-50%)",
          }}
        />
      )}
    </div>
  );
};
