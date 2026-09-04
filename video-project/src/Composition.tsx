import { Composition, OffthreadVideo, Sequence, staticFile, AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Logo } from "./Logo";
import { WordReveal, SubText } from "./PromoText";
import { CTAButton } from "./CTAButton";
import { Sparkles } from "./Sparkles";
import { ShineSweep } from "./ShineSweep";
import { ParticleBurst } from "./ParticleBurst";
import { CutFlash } from "./CutFlash";
import { TridentMark } from "./TridentMark";
import { RadialGlow } from "./RadialGlow";
import { CornerFrame } from "./CornerFrame";

const FPS = 30;
const DURATION_IN_SECONDS = 20;
const DURATION_IN_FRAMES = DURATION_IN_SECONDS * FPS;

export const MyComposition = () => {
  return (
    <Composition
      id="EshanPromo"
      component={PromoVideo}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};

// The source is a single 41s turntable shot of the statue (no cuts, no audio).
// We pick 6 distinct angles from the rotation and cut between them fast, so
// the 20s edit reads as an energetic reveal rather than a slow trim.
const shot = (fromSec: number, toSec: number) => ({
  trimBefore: Math.round(fromSec * FPS),
  trimAfter: Math.round(toSec * FPS),
});

const beats = [
  { fromSec: 9, toSec: 11, startFrame: 0, duration: 60 }, // hook: trident silhouette
  { fromSec: 0, toSec: 4, startFrame: 60, duration: 120 }, // front detail
  { fromSec: 13, toSec: 17, startFrame: 180, duration: 120 }, // side profile
  { fromSec: 20, toSec: 24, startFrame: 300, duration: 120 }, // back/trident
  { fromSec: 27, toSec: 30, startFrame: 420, duration: 90 }, // 3/4 angle
  { fromSec: 35, toSec: 38, startFrame: 510, duration: 90 }, // final display
];

// Slow push-in on the hook shot only — makes the trident reveal feel intentional.
const HookShot: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 60], [1, 1.18], { extrapolateRight: "clamp" });

  return (
    <OffthreadVideo
      src={staticFile("promo-source.mp4")}
      {...shot(9, 11)}
      style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale})` }}
    />
  );
};

export const PromoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Footage: 6 fast-cut beats across different rotation angles. */}
      {beats.map((b, i) => (
        <Sequence key={i} from={b.startFrame} durationInFrames={b.duration}>
          {i === 0 ? (
            <HookShot />
          ) : (
            <OffthreadVideo
              src={staticFile("promo-source.mp4")}
              {...shot(b.fromSec, b.toSec)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </Sequence>
      ))}

      {/* A quick white flash + gold shine sweep on every cut, plus a small
          particle pop, so each cut reads as a deliberate beat, not a splice. */}
      {beats.map((b, i) => (
        <Sequence key={`fx-${i}`} from={b.startFrame} durationInFrames={45}>
          <CutFlash />
          <ShineSweep />
        </Sequence>
      ))}
      {beats.map((b, i) => (
        <Sequence key={`burst-${i}`} from={b.startFrame} durationInFrames={30}>
          <ParticleBurst originTop="50%" count={14} />
        </Sequence>
      ))}

      {/* Ambient gold particles throughout — increased density for a richer feel. */}
      <Sequence from={0} durationInFrames={DURATION_IN_FRAMES}>
        <Sparkles count={24} />
      </Sequence>

      {/* Slow pulsing gold glow, screen-blended so it only lifts the dark
          statue silhouette without washing out the wood background. */}
      <Sequence from={0} durationInFrames={DURATION_IN_FRAMES}>
        <RadialGlow />
      </Sequence>

      {/* Viewfinder-style corner brackets draw in on the hook, framing the
          statue like a camera focusing on the product. */}
      <Sequence from={0} durationInFrames={60}>
        <CornerFrame />
      </Sequence>

      {/* Decorative trident glyph, echoing the statue's own Thiru Sulam —
          bottom-left, clear of the statue and the text zone. */}
      <Sequence from={0} durationInFrames={DURATION_IN_FRAMES}>
        <TridentMark />
      </Sequence>

      {/* Extra CTA-specific burst for extra emphasis at the very end. */}
      <Sequence from={510} durationInFrames={35}>
        <ParticleBurst originTop="84%" count={24} />
      </Sequence>

      {/* Brand logo, persistent top-right corner, clear of the statue. */}
      <Sequence from={0} durationInFrames={DURATION_IN_FRAMES}>
        <Logo />
      </Sequence>

      {/* Hook (0-2s): visual only, no text competing with the reveal. */}

      {/* Beat 2 (2-6s): headline starts. */}
      <Sequence from={60} durationInFrames={120}>
        <WordReveal lines={["OUR UNIQUE SHIVA"]} fontSize={54} top="6%" />
      </Sequence>

      {/* Beat 3 (6-10s): headline continues. */}
      <Sequence from={180} durationInFrames={120}>
        <WordReveal lines={["WITH THIRU SULAM"]} fontSize={54} top="6%" />
      </Sequence>

      {/* Beat 4 (10-14s): availability callout. */}
      <Sequence from={300} durationInFrames={120}>
        <WordReveal lines={["NOW AVAILABLE IN", "THE YELLOW BAG"]} fontSize={50} top="6%" />
      </Sequence>

      {/* Beat 5 (14-17s): craftsmanship line. */}
      <Sequence from={420} durationInFrames={90}>
        <SubText text="Exclusive Handcrafted Piece" top="8%" fontSize={30} />
      </Sequence>

      {/* Beat 6 (17-20s): urgency + CTA. */}
      <Sequence from={510} durationInFrames={90}>
        <SubText text="LIMITED STOCK · DM TO ORDER" top="6%" fontSize={32} />
        <CTAButton />
      </Sequence>
    </AbsoluteFill>
  );
};
