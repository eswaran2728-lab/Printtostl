import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

type WordRevealProps = {
  lines: string[];
  fontSize?: number;
  top?: number | string;
};

export const WordReveal: React.FC<WordRevealProps> = ({ lines, fontSize = 62, top = "38%" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      {/* Dark scrim so white text stays legible over the light wood panel. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 260,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.18) 70%, rgba(0,0,0,0) 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top,
          left: 0,
          right: 200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
          padding: "0 40px",
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
                      color: "#ffffff",
                      WebkitTextStroke: "1.5px rgba(138,106,69,0.9)",
                      textShadow:
                        "0 2px 6px rgba(0,0,0,0.9), 0 4px 24px rgba(0,0,0,0.85), 0 0 30px rgba(202,163,119,0.5)",
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
    </>
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
