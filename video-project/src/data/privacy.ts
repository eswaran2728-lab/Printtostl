// Privacy/PII blur regions found during full-frame inspection. Most on-screen
// app mockups already use greyed-out placeholder bars for names/values (by
// design, nothing to blur there) — nothing to mask there.
//
// A first pass also speculatively boxed the staff lanyard ID cards visible
// in several medium/wide shots (~62-118s). Verifying those boxes against the
// actual rendered frames showed the estimated percentage coordinates were
// wrong for several of them — landing on faces, the approval checkmark
// graphic, and the closing title text instead of the small lanyard cards
// they were meant to cover. Per the brief's own rule ("do not cover faces,
// phones, tablets, form fields, or important graphics"), those speculative
// boxes have been removed rather than shipped miscalibrated. The lanyard
// text in those shots is small and low-resolution (848x478 source) to begin
// with; if precise tracked masking of it is still wanted, it needs a proper
// per-frame face/object tracker rather than static percentage guesses.
//
// The one region kept is verified safe: a wall poster (32.3-34.9s) carrying
// garbled/failed AI-generated text beside a QR code that reads as a real,
// potentially scannable code. It sits to the right of the visible face in
// that shot (confirmed against the rendered output), so it does not cover
// any face, form field, or navigation graphic.
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
];
