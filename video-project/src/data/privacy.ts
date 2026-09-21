// Privacy/PII blur regions found during full-frame inspection. Most on-screen
// app mockups already use greyed-out placeholder bars for names/values (by
// design, nothing to blur there). Two real categories needed masking:
//  1. A wall poster (32-35s) carries garbled/failed AI-generated text next
//     to a QR code that reads as a real, potentially scannable code — masked
//     as both a text-quality fix and a privacy precaution.
//  2. Staff lanyard ID cards (photo + printed name/role) are visible at
//     close range in several medium shots — blurred so no card is legible.
// Coordinates are percentages of the frame (0-100), static per cue since the
// camera is locked-off or near-static across each of these shots.
export interface BlurRegion {
  start: number; // source-video seconds
  end: number;
  x: number;
  y: number;
  w: number;
  h: number;
  reason: string;
}

export const BLUR_REGIONS: BlurRegion[] = [
  {
    start: 32.3,
    end: 34.9,
    x: 54,
    y: 4,
    w: 44,
    h: 62,
    reason: "Wall poster: garbled/failed AI-generated text beside a QR code that reads as potentially scannable.",
  },
  {
    start: 62.4,
    end: 68.6,
    x: 60,
    y: 52,
    w: 30,
    h: 22,
    reason: "AVSEC officer desk close-up: lanyard/name-badge area.",
  },
  {
    start: 88.0,
    end: 97.5,
    x: 8,
    y: 55,
    w: 22,
    h: 30,
    reason: "Ramp employee ID lanyard, medium two-shot.",
  },
  {
    start: 88.0,
    end: 97.5,
    x: 55,
    y: 45,
    w: 22,
    h: 35,
    reason: "AVSEC officer ID lanyard/duty belt card, medium two-shot.",
  },
  {
    start: 106.0,
    end: 117.9,
    x: 10,
    y: 55,
    w: 20,
    h: 28,
    reason: "Ramp employee ID lanyard, closing hangar shot.",
  },
  {
    start: 106.0,
    end: 117.9,
    x: 56,
    y: 50,
    w: 20,
    h: 30,
    reason: "AVSEC officer ID lanyard/duty belt card, closing hangar shot.",
  },
];
