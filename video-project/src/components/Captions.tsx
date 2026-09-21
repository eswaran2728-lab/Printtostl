import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { FPS } from "../data/scenes";
import type { CaptionCue } from "../data/captions";

const RED = "#e60012"; // AirAsia red
const AMBER = "#f5a623";
const GREEN = "#2ecc71";

function renderHighlighted(text: string, highlight?: string[]) {
  if (!highlight || highlight.length === 0) return text;
  const pattern = new RegExp(`(${highlight.join("|")})`, "gi");
  const parts = text.split(pattern);
  return parts.map((part, i) => {
    const isHit = highlight.some((h) => h.toLowerCase() === part.toLowerCase());
    if (!isHit) return <React.Fragment key={i}>{part}</React.Fragment>;
    const color = /expir|locked|reject/i.test(part) ? RED : /green|approved/i.test(part) ? GREEN : AMBER;
    return (
      <span key={i} style={{ color, fontWeight: 800 }}>
        {part}
      </span>
    );
  });
}

/** Renders one gap-fill caption cue, in the same visual language as the
 * source video's own burned-in captions (charcoal chip, white bold sans,
 * max two lines, safe-area margins). `localStart`/`localEnd` are in OUTPUT
 * frames relative to the Sequence this is mounted in. */
export const Caption: React.FC<{ cue: CaptionCue; durationInFrames: number }> = ({
  cue,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 6, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <div
      style={{
        position: "absolute",
        left: "8%",
        right: "8%",
        bottom: "9%",
        display: "flex",
        justifyContent: "center",
        opacity,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "rgba(30,30,32,0.72)",
          borderRadius: 8,
          padding: "12px 22px",
          maxWidth: "84%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontWeight: 700,
            fontSize: 46,
            lineHeight: 1.25,
            color: "#ffffff",
          }}
        >
          {renderHighlighted(cue.line1, cue.highlight)}
        </div>
        {cue.line2 && (
          <div
            style={{
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              fontWeight: 700,
              fontSize: 46,
              lineHeight: 1.25,
              color: "#ffffff",
            }}
          >
            {renderHighlighted(cue.line2, cue.highlight)}
          </div>
        )}
      </div>
    </div>
  );
};

export const cueDurationFrames = (cue: CaptionCue) =>
  Math.round((cue.end - cue.start) * FPS);
