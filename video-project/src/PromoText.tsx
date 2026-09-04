import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const GOLD = "linear-gradient(135deg, #f3d9b1 0%, #caa377 45%, #8a6a45 100%)";

type WordRevealProps = {
  lines: string[];
  fontSize?: number;
  top?: number | string;
};

export const WordReveal: React.FC<WordRevealProps> = ({ lines, fontSize = 62, top = "38%" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        padding: "0 60px",
      }}
    >
      {lines.map((line, lineIndex) => {
        const words = line.split(" ");
        return (
          <div
            key={lineIndex}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 14,
            }}
          >
            {words.map((word, wordIndex) => {
              const delay = lineIndex * 8 + wordIndex * 4;
              const localFrame = frame - delay;
              const enter = spring({
                frame: localFrame,
                fps,
                config: { damping: 16, stiffness: 140, mass: 0.5 },
              });
              const opacity = interpolate(localFrame, [0, 10], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const y = interpolate(enter, [0, 1], [40, 0]);

              return (
                <span
                  key={wordIndex}
                  style={{
                    opacity,
                    transform: `translateY(${y}px)`,
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontWeight: 700,
                    fontSize,
                    letterSpacing: 1,
                    backgroundImage: GOLD,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    textShadow: "0 2px 18px rgba(0,0,0,0.55)",
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export const SubText: React.FC<{ text: string; top?: number | string; fontSize?: number }> = ({
  text,
  top = "60%",
  fontSize = 34,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const y = interpolate(frame, [0, 15], [20, 0], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 0,
        right: 0,
        textAlign: "center",
        opacity,
        transform: `translateY(${y}px)`,
        padding: "0 70px",
      }}
    >
      <span
        style={{
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontWeight: 600,
          fontSize,
          color: "#fff8ef",
          textShadow: "0 2px 10px rgba(0,0,0,0.7)",
          letterSpacing: 0.5,
        }}
      >
        {text}
      </span>
    </div>
  );
};
