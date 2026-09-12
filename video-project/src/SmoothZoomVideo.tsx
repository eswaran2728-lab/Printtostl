import React from "react";
import { OffthreadVideo, useCurrentFrame, interpolate } from "remotion";

// Wraps a trimmed OffthreadVideo with a smooth eased scale from `from` to `to`
// over `frames` (then holds at `to`). Used for every camera-motion beat so
// all zooms share the same easing curve instead of ad-hoc transforms.
export const SmoothZoomVideo: React.FC<{
  src: string;
  trimBefore: number;
  trimAfter: number;
  from: number;
  to: number;
  frames: number;
  extraStyle?: React.CSSProperties;
}> = ({ src, trimBefore, trimAfter, from, to, frames, extraStyle }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, frames], [0, 1], { extrapolateRight: "clamp" });
  const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic — no robotic linear zoom
  const scale = from + (to - from) * eased;

  return (
    <OffthreadVideo
      src={src}
      trimBefore={trimBefore}
      trimAfter={trimAfter}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: `scale(${scale})`,
        filter: "contrast(1.06) brightness(1.03) saturate(1.02)",
        ...extraStyle,
      }}
    />
  );
};
