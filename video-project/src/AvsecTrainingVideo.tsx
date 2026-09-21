import React from "react";
import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  staticFile,
  Composition,
} from "remotion";
import { FPS, sec, VIDEO_PARTS, JOIN_FADE_FRAMES, totalOutputFrames } from "./data/scenes";
import { REPLACEMENT_LINES } from "./data/dialogueReplacement";
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
  mute: boolean;
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
      mute: part.mute,
      outputFrom: cursor,
      durationInFrames,
    };
    cursor += durationInFrames;
    return resolved;
  });
}

/** Converts an absolute SOURCE-video second into an output frame, given
 * which resolved part contains it. Returns null if no part covers it
 * (e.g. it falls inside the trimmed black-frame gap). */
function sourceSecToOutputFrame(parts: ResolvedPart[], sourceSec: number): number | null {
  const part = parts.find((p) => sourceSec >= p.sourceFrom && sourceSec <= p.sourceTo);
  if (!part) return null;
  return part.outputFrom + sec(sourceSec - part.sourceFrom);
}

const Timeline: React.FC = () => {
  const parts = resolveParts();

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {/* ---- Video parts (trims the black-frame glitch + CapCut tail; mutes
          the confirmed mis-voiced narrator block, p2) ---- */}
      {parts.map((part) => (
        <Sequence key={part.id} from={part.outputFrom} durationInFrames={part.durationInFrames}>
          <AbsoluteFill style={{ filter: GRADE_FILTER }}>
            <OffthreadVideo
              src={SOURCE}
              startFrom={sec(part.sourceFrom)}
              endAt={sec(part.sourceTo)}
              muted={part.mute}
              volume={part.mute ? 0 : 1}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </AbsoluteFill>
          {/* short fade-through-black at both ends of every part join */}
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

      {/* ---- Replacement dialogue: silent placeholders now. Dropping the
          real WAV at the same public/audio/dialogue/<file> path is the only
          change needed later — this Sequence wiring does not change. ---- */}
      {REPLACEMENT_LINES.map((line) => {
        const outputFrom = sourceSecToOutputFrame(parts, line.start);
        if (outputFrom === null) return null;
        const durationInFrames = sec(line.end - line.start);
        return (
          <Sequence key={line.file} from={outputFrom} durationInFrames={durationInFrames}>
            <Audio src={staticFile(`audio/dialogue/${line.file}`)} volume={1} />
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

      {/* ---- Music bed: fades in at open, sits well under dialogue,
          fades to a clean resolution at the end (see corporate-bed.wav,
          which already carries its own 2s in/out fade). ---- */}
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
