import React from "react";
import { AbsoluteFill } from "remotion";
import type { BlurRegion } from "../data/privacy";

/** Static blurred/masked box over one privacy-sensitive region. Percentage
 * coordinates so it holds correctly regardless of output resolution. */
export const PrivacyMask: React.FC<{ region: BlurRegion }> = ({ region }) => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <div
      style={{
        position: "absolute",
        left: `${region.x}%`,
        top: `${region.y}%`,
        width: `${region.w}%`,
        height: `${region.h}%`,
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        background: "rgba(20,20,22,0.28)",
        borderRadius: 6,
      }}
    />
  </AbsoluteFill>
);
