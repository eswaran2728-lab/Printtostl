import React from "react";
import { AbsoluteFill } from "remotion";

/** Subtle, temporally-STABLE film grain (a single fixed noise pattern, not
 * re-randomized per frame — deliberate, since flickering per-frame noise
 * reads as digital static rather than film grain). Monochromatic, ~2.5%
 * opacity, applied once over the whole composition. */
export const FilmGrain: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none", opacity: 0.025, mixBlendMode: "overlay" }}>
    <svg width="100%" height="100%">
      <filter id="npp-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={7} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#npp-grain)" />
    </svg>
  </AbsoluteFill>
);
