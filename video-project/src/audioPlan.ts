// Sound-design plan for "Nee Pona Pinne". The song is the ONLY music bed and
// the master clock — it is never time-stretched, pitch-shifted, or
// re-normalized destructively. Every source-video instance is muted; its
// embedded audio is never heard.
//
// No SFX assets were supplied or available to source in this sandbox (no
// network access beyond package registries), so SFX_CUES is empty and the
// composition renders correctly without it, per the brief. If real SFX
// files are later dropped into public/media/nee-pona-pinne/sfx/, add
// entries here (file, startOutputS, volume, fadeFrames) and wire them into
// NeePonaPinne.tsx the same way REPLACEMENT_LINES is consumed in the AVSEC
// project — no structural change needed beyond that.
import { staticFile } from "remotion";

export const SONG_SRC = staticFile("media/nee-pona-pinne/song-master.mp3");
export const SONG_DURATION_S = 176.352;
export const SONG_VOLUME = 1.0;

export interface SfxCue {
  file: string;
  startOutputS: number;
  volume: number; // linear, target roughly -24 to -18 dBFS under the song
  fadeFrames: number; // 4-8 frame equal-power fade in/out
}

export const SFX_CUES: SfxCue[] = [];

// Scene 21 ("Maya leaves; emotional focus stays on Arun") calls for
// ambience/footsteps to gradually recede so Arun feels isolated. With no
// SFX bed present there is nothing to duck, but the hook is here so that
// once ambience is added for that scene, ducking is a one-line change.
export const SCENE_21_ISOLATION_DUCK = {
  outputStartS: 140.0, // 02:20
  outputEndS: 147.0, // 02:27
  fromVolume: 1.0,
  toVolume: 0.0,
};
