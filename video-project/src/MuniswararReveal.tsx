import { Composition, OffthreadVideo, Img, Sequence, staticFile, AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Logo } from "./Logo";
import { WordReveal, SubText } from "./PromoText";
import { CTAButton } from "./CTAButton";
import { CutFlash } from "./CutFlash";
import { ShineSweep } from "./ShineSweep";
import { PrintProgress } from "./PrintProgress";
import { LightFlareReveal } from "./LightFlareReveal";

const FPS = 30;
const DURATION_IN_FRAMES = 450; // 15s

export const MuniswararComposition = () => {
  return (
    <Composition
      id="MuniswararReveal"
      component={MuniswararVideo}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};

// A shared light contrast/brightness pass so the 5 source clips (shot in
// slightly different lighting near the printer) read as one consistent edit.
const videoStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  filter: "contrast(1.05) brightness(1.02)",
};

const src = (name: string) => staticFile(`assembly/${name}`);

// Gentle push-in used only on the two fine-detail beats and the closing hero
// shot — not applied to every clip, per the "zoom only where it helps" rule.
const PushIn: React.FC<{ children: (scale: number) => React.ReactNode; from: number; to: number; frames: number }> = ({
  children,
  from,
  to,
  frames,
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, frames], [from, to], { extrapolateRight: "clamp" });
  return <>{children(scale)}</>;
};

export const MuniswararVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Beat 1 — Hook (0-1.3s): sharpest opening angle, printer visible in
          background, no text so the visual carries the hook. */}
      <Sequence from={0} durationInFrames={39}>
        <OffthreadVideo src={src("ea1baf97-IMG_5097.mov")} trimBefore={0} trimAfter={39} style={videoStyle} />
      </Sequence>

      {/* Beat 2 (1.3-3.3s) and Beat 3 (3.3-8.1s) are one continuous handheld
          turn from IMG_5102, split only so the headline can change mid-shot. */}
      <Sequence from={39} durationInFrames={60}>
        <OffthreadVideo src={src("f8b9aee5-IMG_5102.mov")} trimBefore={75} trimAfter={135} style={videoStyle} />
      </Sequence>
      <Sequence from={99} durationInFrames={144}>
        <OffthreadVideo src={src("f8b9aee5-IMG_5102.mov")} trimBefore={135} trimAfter={279} style={videoStyle} />
      </Sequence>

      {/* Beat 4 (8.1-9.1s): fine carving detail, gentle push-in. */}
      <Sequence from={243} durationInFrames={30}>
        <PushIn from={1} to={1.12} frames={30}>
          {(scale) => (
            <OffthreadVideo
              src={src("f27f8e29-IMG_5101.mov")}
              trimBefore={0}
              trimAfter={30}
              style={{ ...videoStyle, transform: `scale(${scale})` }}
            />
          )}
        </PushIn>
      </Sequence>

      {/* Beat 5 (9.1-10.1s): face/eye detail, gentle push-in. */}
      <Sequence from={273} durationInFrames={30}>
        <PushIn from={1} to={1.12} frames={30}>
          {(scale) => (
            <OffthreadVideo
              src={src("1e1d6bb8-IMG_5099.mov")}
              trimBefore={0}
              trimAfter={30}
              style={{ ...videoStyle, transform: `scale(${scale})` }}
            />
          )}
        </PushIn>
      </Sequence>

      {/* Beat 6 (10.1-13.34s): closing hero — remainder of IMG_5097, with a
          soft scale-in standing in for the "final reveal" beat. */}
      <Sequence from={303} durationInFrames={97}>
        <PushIn from={1.06} to={1} frames={20}>
          {(scale) => (
            <OffthreadVideo
              src={src("ea1baf97-IMG_5097.mov")}
              trimBefore={45}
              trimAfter={142}
              style={{ ...videoStyle, transform: `scale(${scale})` }}
            />
          )}
        </PushIn>
      </Sequence>

      {/* Closing hold (13.34-15s): a still frame captured from the hero shot
          instead of letting the video run out (which goes black past its
          trim) — the text and CTA land on a static image of the print. */}
      <Sequence from={400} durationInFrames={50}>
        <Img src={src("hero-still.jpg")} style={videoStyle} />
      </Sequence>

      {/* Cut flashes on every hard cut for a clean, deliberate edit feel. */}
      {[0, 39, 99, 243, 273, 303].map((f) => (
        <Sequence key={f} from={f} durationInFrames={10}>
          <CutFlash />
        </Sequence>
      ))}

      {/* Elegant reveal: soft light flare at the top of the closing beat. */}
      <Sequence from={303} durationInFrames={30}>
        <LightFlareReveal />
      </Sequence>
      <Sequence from={303} durationInFrames={45}>
        <ShineSweep />
      </Sequence>

      {/* Build-progress graphic — relevant to the "fresh off the printer"
          story, shown only while the printer is on-screen (beats 2-3). */}
      <Sequence from={39} durationInFrames={204}>
        <PrintProgress durationInFrames={204} />
      </Sequence>

      {/* Brand logo, persistent, top-right, clear of the print and captions. */}
      <Sequence from={0} durationInFrames={DURATION_IN_FRAMES}>
        <Logo />
      </Sequence>

      {/* Beat 2 text */}
      <Sequence from={39} durationInFrames={60}>
        <SubText
          text="Straight off the printer"
          top="6%"
          fontSize={46}
          fontFamily="Georgia, 'Times New Roman', serif"
          fontWeight={700}
        />
      </Sequence>

      {/* Beat 3 text */}
      <Sequence from={99} durationInFrames={144}>
        <WordReveal lines={["OUR 3 FEET", "JALAN BARU MUNISWARAR"]} fontSize={62} top="4%" />
      </Sequence>

      {/* Closing message (last ~3s of beat 6) */}
      <Sequence from={355} durationInFrames={95}>
        <SubText
          text="Painting & finishing coming soon — follow for the full build 🙏"
          top="68%"
          fontSize={34}
          fontFamily="Georgia, 'Times New Roman', serif"
          fontWeight={700}
        />
      </Sequence>

      {/* CTA (final ~1.3s) */}
      <Sequence from={410} durationInFrames={40}>
        <CTAButton
          text="Need it in a different size? DM us!"
          fontSize={32}
          fontFamily="Georgia, 'Times New Roman', serif"
        />
      </Sequence>
    </AbsoluteFill>
  );
};
