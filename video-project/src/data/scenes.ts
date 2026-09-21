// Central timeline configuration for the AirAsia AVSEC e-Declaration edit.
// All values are in SOURCE-VIDEO seconds unless noted "output frame".
// fps = 30 throughout.
export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

/**
 * The source is one continuously-edited 120.12s clip (not separate raw
 * clips), so "editing" here means: trim the two confirmed defects, mute +
 * replace the mis-voiced narrator block, and layer captions/blur/grade on
 * top — not re-cutting scene order, which is correct already.
 *
 * Defects found by full frame-by-frame + audio (pitch/RMS) inspection:
 *  - A single dropped black frame at 74.83-75.17s (hard scene cut glitch).
 *  - A CapCut export watermark burned onto the tail from ~117.9s to 120.12s.
 */
export const DEFECTS = {
  blackFrameStart: 74.83,
  blackFrameEnd: 75.17,
  cleanContentEnd: 117.9, // CapCut watermark begins after this
};

/** Confirmed male-narrator-over-B-roll block (see dialogueReplacement.ts).
 * Visible female presenters elsewhere in the video already carry a
 * consistent, correctly-matched female voice and are left untouched. */
export const NARRATION_REPLACE_START = 19.0;
export const NARRATION_REPLACE_END = 59.3;

/** The four contiguous source-video parts that make up the output timeline,
 * in order. `mute` = true means the part's own embedded audio is silenced
 * (used only for the narration-replacement block, whose placeholder/real
 * female lines are layered in separately — see dialogueReplacement.ts). */
export const VIDEO_PARTS = [
  { id: "p1", from: 0, to: NARRATION_REPLACE_START, mute: false },
  { id: "p2", from: NARRATION_REPLACE_START, to: NARRATION_REPLACE_END, mute: true },
  { id: "p3", from: NARRATION_REPLACE_END, to: DEFECTS.blackFrameStart, mute: false },
  { id: "p4", from: DEFECTS.blackFrameEnd, to: DEFECTS.cleanContentEnd, mute: false },
] as const;

/** Short fade-through-black micro-transition applied at every part boundary
 * above (6 frames each side = 12 frames total per join, at 30fps = 0.4s),
 * per the "restrained corporate transitions" brief. */
export const JOIN_FADE_FRAMES = 6;

export const totalOutputFrames = () =>
  VIDEO_PARTS.reduce((acc, p) => acc + sec(p.to - p.from), 0);
