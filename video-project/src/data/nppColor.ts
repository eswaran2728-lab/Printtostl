import type { Phase } from "../editDecisionList";

// CSS filter per narrative phase. Implemented with standard CSS filters
// (reliable in Remotion's Chromium renderer) rather than an ffmpeg
// primary-grade pass, per the brief's preference. Values are deliberately
// restrained: no crushed blacks, no teal-orange split, no vignette.
export const PHASE_FILTER: Record<Phase, string> = {
  // Present-day loneliness: slightly cool, saturation ~90%, modest contrast.
  lonely: "saturate(0.90) contrast(1.03) brightness(0.99) hue-rotate(-2deg)",
  // Happy memories: warm amber, saturation ~105%, gently lifted blacks via brightness.
  happy: "saturate(1.06) contrast(1.02) brightness(1.03) sepia(0.06) hue-rotate(2deg)",
  // Breakup memories: warmth drains toward cool blue-grey.
  breakup: "saturate(0.85) contrast(1.04) brightness(0.97) hue-rotate(-6deg)",
  // Present-day reunion: natural, neither golden nor cold.
  reunion: "saturate(0.97) contrast(1.02) brightness(1.0)",
  // Resolution: gently warmer present-day grade.
  resolution: "saturate(1.0) contrast(1.02) brightness(1.02) sepia(0.03)",
};

// Restrained halation on warm-memory highlights only (never present-day).
export const HALATION_PHASES: Phase[] = ["happy"];
