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
 *  - A single dropped black frame at 74.83-75.17s (hard scene cut glitch) —
 *    the ONLY point that needs an actual video cut.
 *  - A CapCut export watermark burned onto the tail from ~117.9s to 120.12s.
 *
 * IMPORTANT: the narrator-replacement block (19.0-59.3s) does NOT get its
 * own video cut. It sits entirely inside the same continuous shot as the
 * footage before and after it, so splitting it into a separate <Sequence>
 * (as an earlier version of this file did) forced an artificial fade/cut at
 * 59.3s where the source has none — visible as an unwanted near-black
 * moment around 00:58-00:59 in review. Audio-only fallback/replacement
 * logic (see AvsecTrainingVideo.tsx's per-frame `volume` function) handles
 * that block without ever touching the video track.
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

/** The two contiguous source-video parts that make up the output timeline —
 * split ONLY at the real black-frame defect, nowhere else. */
export const VIDEO_PARTS = [
  { id: "p1", from: 0, to: DEFECTS.blackFrameStart },
  { id: "p2", from: DEFECTS.blackFrameEnd, to: DEFECTS.cleanContentEnd },
] as const;

/** Short fade-through-black micro-transition applied at the one real video
 * join above (6 frames each side = 12 frames total, at 30fps = 0.4s), per
 * the "restrained corporate transitions" brief. */
export const JOIN_FADE_FRAMES = 6;

/** Crossfade length for audio-only transitions: original-narration <->
 * replacement-clip swaps, and the restored-narration in/out edges. 4-8
 * frames per spec; 6 used throughout for consistency. */
export const AUDIO_CROSSFADE_FRAMES = 6;

export const totalOutputFrames = () =>
  VIDEO_PARTS.reduce((acc, p) => acc + sec(p.to - p.from), 0);
