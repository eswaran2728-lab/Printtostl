import React from "react";
import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  staticFile,
  Composition,
} from "remotion";
import {
  FPS,
  sec,
  VIDEO_PARTS,
  JOIN_FADE_FRAMES,
  AUDIO_CROSSFADE_FRAMES,
  totalOutputFrames,
} from "./data/scenes";
import { REPLACEMENT_LINES } from "./data/dialogueReplacement";
import { DIALOGUE_AUDIO_AVAILABLE } from "./data/audioAvailability.generated";
import { GAP_FILL_CAPTIONS } from "./data/captions";
import { BLUR_REGIONS } from "./data/privacy";
import { Caption, cueDurationFrames } from "./components/Captions";
import { PrivacyMask } from "./components/PrivacyBlur";
import { JoinFade } from "./components/SceneTransition";

const SOURCE = staticFile("video/source.mp4");
const MUSIC = staticFile("audio/music/corporate-bed.wav");

// Consistent, subtle colour-grade applied over the whole programme so every
// part (already-clean footage plus the parts either side of our cuts)
// reads as one graded piece rather than a patchwork.
const GRADE_FILTER = "contrast(1.05) saturate(1.04) brightness(1.01)";

interface ResolvedPart {
  id: string;
  sourceFrom: number; // seconds
  sourceTo: number; // seconds
  outputFrom: number; // output frames
  durationInFrames: number;
}

function resolveParts(): ResolvedPart[] {
  let cursor = 0;
  return VIDEO_PARTS.map((part) => {
    const durationInFrames = sec(part.to - part.from);
    const resolved: ResolvedPart = {
      id: part.id,
      sourceFrom: part.from,
      sourceTo: part.to,
      outputFrom: cursor,
      durationInFrames,
    };
    cursor += durationInFrames;
    return resolved;
  });
}

function sourceSecToOutputFrame(parts: ResolvedPart[], sourceSec: number): number | null {
  const part = parts.find((p) => sourceSec >= p.sourceFrom && sourceSec <= p.sourceTo);
  if (!part) return null;
  return part.outputFrom + sec(sourceSec - part.sourceFrom);
}

/** Builds the per-frame volume function for the source video's OWN embedded
 * narration track, covering one resolved part. Outside the mis-voiced
 * 19.0-59.3s block it is always 1 (untouched). Inside that block, for each
 * line: if a real replacement WAV is available, duck the original to 0
 * (crossfaded) so the replacement clip is heard instead; if not available,
 * leave the original narration at 1 so the section is never silent. Between
 * lines (natural speech pauses) the original also stays at 1 — there is
 * nothing there to replace. */
function makeOriginalNarrationVolume(part: ResolvedPart, allParts: ResolvedPart[]) {
  const xfade = AUDIO_CROSSFADE_FRAMES;
  return (frame: number) => {
    const outputFrame = part.outputFrom + frame;

    for (const line of REPLACEMENT_LINES) {
      const available = DIALOGUE_AUDIO_AVAILABLE[line.file] === true;
      if (!available) continue; // fallback: original stays audible
      const lineStartFrame = sourceSecToOutputFrame(allParts, line.start);
      const lineEndFrame = sourceSecToOutputFrame(allParts, line.end);
      if (lineStartFrame === null || lineEndFrame === null) continue;
      if (outputFrame < lineStartFrame - xfade || outputFrame > lineEndFrame + xfade) continue;

      if (outputFrame < lineStartFrame) {
        // ramping down into the replacement clip
        return 1 - (outputFrame - (lineStartFrame - xfade)) / xfade;
      }
      if (outputFrame > lineEndFrame) {
        // ramping back up after the replacement clip
        return (outputFrame - lineEndFrame) / xfade;
      }
      return 0; // fully replaced
    }
    return 1;
  };
}

const Timeline: React.FC = () => {
  const parts = resolveParts();

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {/* ---- Video parts: split ONLY at the one confirmed black-frame
          defect. The narrator-replacement block does NOT get a video cut —
          see scenes.ts for why. ---- */}
      {parts.map((part) => (
        <Sequence key={part.id} from={part.outputFrom} durationInFrames={part.durationInFrames}>
          <AbsoluteFill style={{ filter: GRADE_FILTER }}>
            <OffthreadVideo
              src={SOURCE}
              startFrom={sec(part.sourceFrom)}
              endAt={sec(part.sourceTo)}
              volume={makeOriginalNarrationVolume(part, parts)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </AbsoluteFill>
          {/* fade-through-black only around the real black-frame cut */}
          <Sequence from={0} durationInFrames={JOIN_FADE_FRAMES}>
            <JoinFade mode="in" frames={JOIN_FADE_FRAMES} />
          </Sequence>
          <Sequence
            from={Math.max(0, part.durationInFrames - JOIN_FADE_FRAMES)}
            durationInFrames={JOIN_FADE_FRAMES}
          >
            <JoinFade mode="out" frames={JOIN_FADE_FRAMES} />
          </Sequence>
        </Sequence>
      ))}

      {/* ---- Replacement dialogue: only rendered once a real (non-silent)
          WAV has been dropped at the matching path — see
          audioAvailability.generated.ts / scripts/check-dialogue-audio.mjs.
          Until then the original narration (above) fills the gap instead
          of silence. Each clip gets a short in/out crossfade. ---- */}
      {REPLACEMENT_LINES.map((line) => {
        const available = DIALOGUE_AUDIO_AVAILABLE[line.file] === true;
        if (!available) return null;
        const outputFrom = sourceSecToOutputFrame(parts, line.start);
        if (outputFrom === null) return null;
        const durationInFrames = sec(line.end - line.start);
        const xfade = AUDIO_CROSSFADE_FRAMES;
        return (
          <Sequence key={line.file} from={outputFrom} durationInFrames={durationInFrames}>
            <Audio
              src={staticFile(`audio/dialogue/${line.file}`)}
              volume={(f) => {
                if (f < xfade) return f / xfade;
                if (f > durationInFrames - xfade) return (durationInFrames - f) / xfade;
                return 1;
              }}
            />
          </Sequence>
        );
      })}

      {/* ---- Gap-fill captions over the narration-replacement block ---- */}
      {GAP_FILL_CAPTIONS.map((cue, i) => {
        const outputFrom = sourceSecToOutputFrame(parts, cue.start);
        if (outputFrom === null) return null;
        const durationInFrames = cueDurationFrames(cue);
        return (
          <Sequence key={i} from={outputFrom} durationInFrames={durationInFrames}>
            <Caption cue={cue} durationInFrames={durationInFrames} />
          </Sequence>
        );
      })}

      {/* ---- Privacy blur / mask regions ---- */}
      {BLUR_REGIONS.map((region, i) => {
        const outputFrom = sourceSecToOutputFrame(parts, region.start);
        if (outputFrom === null) return null;
        const durationInFrames = sec(region.end - region.start);
        return (
          <Sequence key={i} from={outputFrom} durationInFrames={durationInFrames}>
            <PrivacyMask region={region} />
          </Sequence>
        );
      })}

      {/* ---- Music bed: sits under the narration throughout (never muted
          by the narration logic above), fades in at open, fades to a clean
          resolution at the end (corporate-bed.wav carries its own 2s
          in/out fade). ---- */}
      <Audio src={MUSIC} volume={0.16} />
    </AbsoluteFill>
  );
};

export const AvsecComposition: React.FC = () => {
  return (
    <Composition
      id="AvsecTrainingVideo"
      component={Timeline}
      fps={FPS}
      width={1920}
      height={1080}
      durationInFrames={totalOutputFrames()}
    />
  );
};
