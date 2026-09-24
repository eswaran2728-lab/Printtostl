import React from "react";
import { AbsoluteFill, OffthreadVideo, Freeze, useCurrentFrame, interpolate, staticFile } from "remotion";
import type { EdlRow } from "../editDecisionList";
import { PHASE_FILTER, HALATION_PHASES } from "../data/nppColor";

const SOURCE = staticFile("media/nee-pona-pinne/source-master.mp4");
const FPS = 30;

// Scenes that get a restrained 100->102% push-in per the brief.
const PUSH_IN_SCENES = new Set([4, 11, 21, 22, 25]);

function transitionOverlayOpacity(type: string, frame: number, frames: number): number | null {
  if (frame >= frames) return null;
  const dissolves = new Set([
    "match_cut_blend4",
    "warm_dissolve6",
    "color_temp_bridge6",
    "match_cut_soft4",
    "ambience_jcut",
    "gaze_action_jcut4",
  ]);
  const wipes = new Set(["vehicle_wipe", "occlusion_wipe"]);
  if (dissolves.has(type)) {
    // fade the incoming scene in from black — a restrained dissolve substitute
    return interpolate(frame, [0, frames], [1, 0], { extrapolateRight: "clamp" });
  }
  if (wipes.has(type)) {
    return null; // handled separately as a wipe, not a fade
  }
  return null;
}

function transitionFrames(type: string): number {
  if (type === "match_cut_blend4" || type === "match_cut_soft4" || type === "gaze_action_jcut4") return 4;
  if (type === "warm_dissolve6" || type === "color_temp_bridge6" || type === "ambience_jcut") return 6;
  if (type === "vehicle_wipe") return 8;
  if (type === "occlusion_wipe") return 5;
  return 0;
}

/** One scene of the film: trimmed/retimed source video, colour grade,
 * optional push-in, optional tail freeze, optional restrained transition-in
 * treatment. All timing driven by the EDL row — no timing values live here. */
export const SceneClip: React.FC<{ row: EdlRow; devOverlay?: boolean }> = ({ row, devOverlay }) => {
  const frame = useCurrentFrame();
  const filter = PHASE_FILTER[row.phase];
  const halation = HALATION_PHASES.includes(row.phase);

  const bodyDurationFrames = Math.round((row.outputDurationS - row.freezeFrames / FPS) * FPS);
  const startFromFrame = Math.round(row.sourceInS * FPS);
  const endAtFrame = Math.round(row.sourceOutS * FPS);

  const scale = PUSH_IN_SCENES.has(row.scene)
    ? interpolate(frame, [0, Math.round(row.outputDurationS * FPS)], [1, 1.02], {
        extrapolateRight: "clamp",
      })
    : 1;

  const tFrames = transitionFrames(row.transitionIn);
  const dissolveOpacity = transitionOverlayOpacity(row.transitionIn, frame, tFrames);
  const isWipe = row.transitionIn === "vehicle_wipe" || row.transitionIn === "occlusion_wipe";
  const wipeFrames = isWipe ? transitionFrames(row.transitionIn) : 0;
  const wipeX = isWipe
    ? interpolate(frame, [0, wipeFrames], [-10, 110], { extrapolateRight: "clamp" })
    : null;

  const videoEl = (
    <OffthreadVideo
      src={SOURCE}
      startFrom={startFromFrame}
      endAt={endAtFrame}
      muted
      playbackRate={row.speed}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ filter, transform: `scale(${scale})`, transformOrigin: "center" }}>
        {row.freezeFrames > 0 && frame >= bodyDurationFrames ? (
          <Freeze frame={endAtFrame - 1}>{videoEl}</Freeze>
        ) : (
          videoEl
        )}
      </AbsoluteFill>

      {halation && (
        <AbsoluteFill
          style={{
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse at 50% 35%, rgba(255,214,150,0.06) 0%, rgba(255,214,150,0) 60%)",
            mixBlendMode: "screen",
          }}
        />
      )}

      {dissolveOpacity !== null && (
        <AbsoluteFill style={{ pointerEvents: "none", background: "#000", opacity: dissolveOpacity }} />
      )}

      {isWipe && wipeX !== null && (
        <AbsoluteFill style={{ pointerEvents: "none" }}>
          <div
            style={{
              position: "absolute",
              left: `${wipeX}%`,
              top: 0,
              bottom: 0,
              width: "14%",
              background: "rgba(8,8,10,0.92)",
              filter: "blur(6px)",
              transform: "translateX(-50%)",
            }}
          />
        </AbsoluteFill>
      )}

      {devOverlay && (
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: "rgba(0,0,0,0.6)",
            color: "#0f0",
            fontFamily: "monospace",
            fontSize: 14,
            padding: "4px 8px",
            borderRadius: 4,
            lineHeight: 1.4,
          }}
        >
          scene {row.scene} | out {row.outputIn}-{row.outputOut} | src {row.sourceInS.toFixed(2)}-
          {row.sourceOutS.toFixed(2)} | speed {row.speed}x | {row.transitionIn}
        </div>
      )}
    </AbsoluteFill>
  );
};
