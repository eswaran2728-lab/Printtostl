import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

/** Final 10-frame linear fade to black, finishing exactly on the last
 * frame of the composition. Mount this as a Sequence starting 10 frames
 * before the end of the whole timeline. */
export const FilmFinish: React.FC<{ frames: number }> = ({ frames }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, frames - 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ pointerEvents: "none", background: "#000", opacity }} />;
};
