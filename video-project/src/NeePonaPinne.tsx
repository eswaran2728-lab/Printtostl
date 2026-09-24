import React from "react";
import { AbsoluteFill, Audio, Sequence, Composition } from "remotion";
import { EDL } from "./editDecisionList";
import { SceneClip } from "./components/SceneClip";
import { FinalCredits } from "./components/FinalCredits";
import { FilmFinish } from "./components/FilmFinish";
import { FilmGrain } from "./components/FilmGrain";
import { SONG_SRC, SONG_VOLUME } from "./audioPlan";
import { useNppFonts } from "./hooks/useNppFonts";

const FPS = 30;
export const TOTAL_FRAMES = 5291;
const FILM_FINISH_FRAMES = 10;

const DEV_OVERLAY_DEFAULT = false;

// NOTE: OpeningTitle (src/components/OpeningTitle.tsx) is deliberately NOT
// rendered here. Frame-by-frame inspection of the source master found that
// Scene 1's own footage already carries a professionally composited title
// card — "நீ போன பின்னே" / "NEE PONA PINNE", warm off-white, lower-third,
// fading in ~1.0s and out ~5.5s — baked into the pixels from roughly 1.0 to
// 5.5 SOURCE seconds (fully inside the 0-6.195s range Scene 1 uses).
// Layering OpeningTitle on top produced a visible doubled-title artifact
// (confirmed via still-frame render, not a font-loading race as first
// suspected). The component is kept for reference/reuse if a future cut
// uses different Scene 1 footage without a native title.

interface ResolvedScene {
  outputFrom: number;
  durationInFrames: number;
}

function resolveScenes(): ResolvedScene[] {
  let cursor = 0;
  return EDL.map((row) => {
    const durationInFrames = Math.round(row.outputDurationS * FPS);
    const resolved = { outputFrom: cursor, durationInFrames };
    cursor += durationInFrames;
    return resolved;
  });
}

/** Throws before render if the timeline violates any locked invariant from
 * the edit spec. Called once at module load (composition definition time)
 * so a bad EDL fails fast instead of producing a silently-wrong render. */
function validateTimeline() {
  const scenes = resolveScenes();
  const total = scenes.reduce((acc, s) => acc + s.durationInFrames, 0);
  if (total !== TOTAL_FRAMES) {
    throw new Error(`NeePonaPinne validation: total frames is ${total}, expected ${TOTAL_FRAMES}`);
  }
  if (EDL.length !== 26) {
    throw new Error(`NeePonaPinne validation: expected 26 scenes, found ${EDL.length}`);
  }
  let cursor = 0;
  EDL.forEach((row, i) => {
    const scene = scenes[i];
    if (scene.outputFrom !== cursor) {
      throw new Error(
        `NeePonaPinne validation: scene ${row.scene} starts at frame ${scene.outputFrom}, expected ${cursor} (gap or overlap detected)`
      );
    }
    cursor += scene.durationInFrames;

    if (row.speed < 0.92 - 1e-6 || row.speed > 1.12 + 1e-6) {
      throw new Error(`NeePonaPinne validation: scene ${row.scene} speed ${row.speed} outside approved 0.92-1.12 range`);
    }
    if (row.sourceInS < 0 || row.sourceOutS > 259.066 + 1e-3) {
      throw new Error(
        `NeePonaPinne validation: scene ${row.scene} source range [${row.sourceInS}, ${row.sourceOutS}] exceeds source master duration 259.066s`
      );
    }
    if (row.sourceOutS <= row.sourceInS) {
      throw new Error(`NeePonaPinne validation: scene ${row.scene} has non-positive source duration`);
    }
  });
  if (cursor !== TOTAL_FRAMES) {
    throw new Error(`NeePonaPinne validation: scenes end at frame ${cursor}, expected ${TOTAL_FRAMES} (gap before final fade)`);
  }
}

validateTimeline();

export const NeePonaPinneTimeline: React.FC<{ devOverlay?: boolean }> = ({
  devOverlay = DEV_OVERLAY_DEFAULT,
}) => {
  const scenes = resolveScenes();
  useNppFonts();

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {EDL.map((row, i) => {
        const scene = scenes[i];
        return (
          <Sequence key={row.scene} from={scene.outputFrom} durationInFrames={scene.durationInFrames}>
            <SceneClip row={row} devOverlay={devOverlay} />
          </Sequence>
        );
      })}

      {/* Final credit overlay: 02:53.000-02:56.352, spanning the tail of
          Scene 25 and all of Scene 26. */}
      <Sequence from={Math.round(173.0 * FPS)} durationInFrames={Math.round(3.352 * FPS)}>
        <FinalCredits />
      </Sequence>

      {/* Song: placed at timeline 0, playbackRate implicitly 1 (never set
          otherwise), volume 1.0, the only music bed. */}
      <Audio src={SONG_SRC} volume={SONG_VOLUME} />

      <FilmGrain />

      {/* Final 10-frame fade to black, finishing on the last frame. */}
      <Sequence from={TOTAL_FRAMES - FILM_FINISH_FRAMES} durationInFrames={FILM_FINISH_FRAMES}>
        <FilmFinish frames={FILM_FINISH_FRAMES} />
      </Sequence>
    </AbsoluteFill>
  );
};

export const NeePonaPinneComposition: React.FC = () => {
  return (
    <Composition
      id="NeePonaPinneFinal"
      component={NeePonaPinneTimeline}
      fps={FPS}
      width={1920}
      height={1080}
      durationInFrames={TOTAL_FRAMES}
    />
  );
};
