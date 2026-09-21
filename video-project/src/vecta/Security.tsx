import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { VECTA } from "./theme";

/** One row of the sequential verification checklist (Scene 7): a label with
 * a checkmark that draws in once its delay has passed. */
export const SecurityCheck: React.FC<{
  label: string;
  delay: number;
  top: number | string;
}> = ({ label, delay, top }) => {
  const frame = useCurrentFrame() - delay;
  if (frame < 0) return null;
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const checkScale = spring({ frame: frame - 8, fps: 30, config: { damping: 12, stiffness: 200 } });

  return (
    <div
      style={{
        position: "absolute",
        top,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        gap: 14,
        opacity,
        width: 380,
        justifyContent: "space-between",
        padding: "10px 20px",
        borderRadius: 8,
        border: "1px solid rgba(255,255,255,0.15)",
        background: "rgba(10,16,28,0.6)",
      }}
    >
      <span style={{ fontFamily: VECTA.sans, fontWeight: 600, fontSize: 18, letterSpacing: 2, color: VECTA.white }}>
        {label}
      </span>
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          border: `2px solid ${VECTA.red}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${Math.max(0, checkScale)})`,
        }}
      >
        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
          <path d="M1 5L4.5 8.5L11 1" stroke={VECTA.red} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
};

/** One event in the audit-trail / traceability timeline (Scene 10). Draws a
 * connecting line from the previous event once active. */
export const AuditEvent: React.FC<{
  label: string;
  index: number;
  total: number;
  delay: number;
}> = ({ label, index, total, delay }) => {
  const frame = useCurrentFrame() - delay;
  if (frame < 0) return null;
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const dotScale = spring({ frame, fps: 30, config: { damping: 14, stiffness: 200 } });
  const lineP = interpolate(frame, [4, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const segment = 100 / total;
  const leftPct = segment * index + segment / 2;

  return (
    <div style={{ position: "absolute", left: `${leftPct}%`, top: 0, transform: "translateX(-50%)", opacity }}>
      {index > 0 && (
        <div
          style={{
            position: "absolute",
            right: "100%",
            top: 9,
            width: `${(segment * lineP * 8.48)}px`, // approx px per % at 1920 width scaled down via parent
            height: 2,
            background: `linear-gradient(90deg, rgba(255,255,255,0.15), ${VECTA.red})`,
          }}
        />
      )}
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: VECTA.red,
          boxShadow: `0 0 14px ${VECTA.red}`,
          transform: `scale(${Math.max(0, dotScale)})`,
          margin: "0 auto",
        }}
      />
      <div
        style={{
          marginTop: 14,
          fontFamily: VECTA.sans,
          fontWeight: 600,
          fontSize: 14,
          letterSpacing: 1,
          color: VECTA.white,
          textAlign: "center",
          width: 150,
        }}
      >
        {label}
      </div>
    </div>
  );
};
