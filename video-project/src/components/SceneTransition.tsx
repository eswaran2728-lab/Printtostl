import React from "react";
import { useCurrentFrame, interpolate, AbsoluteFill } from "remotion";

/** Restrained fade-through-black micro-transition (6-12 frames), used at
 * every join this edit introduces: narration mute-in/out and the
 * black-frame-glitch cut. `mode="out"` renders at the END of the outgoing
 * part, `mode="in"` at the START of the incoming part. */
export const JoinFade: React.FC<{ mode: "in" | "out"; frames: number }> = ({ mode, frames }) => {
  const frame = useCurrentFrame();
  const opacity =
    mode === "out"
      ? interpolate(frame, [0, frames], [0, 1], { extrapolateRight: "clamp" })
      : interpolate(frame, [0, frames], [1, 0], { extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ pointerEvents: "none", background: "#000", opacity }} />;
};
