import { Composition, OffthreadVideo, Sequence, staticFile, AbsoluteFill } from "remotion";
import { Logo } from "./Logo";
import { WordReveal, SubText } from "./PromoText";
import { CTAButton } from "./CTAButton";
import { Sparkles } from "./Sparkles";

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
// Instead of playing it start-to-finish, we pick the 4 strongest angles from the
// rotation and cut between them, so the 20s edit reads as a deliberate reveal
// rather than a raw clip trimmed at the end.
const shot = (fromSec: number, toSec: number) => ({
  trimBefore: Math.round(fromSec * FPS),
  trimAfter: Math.round(toSec * FPS),
});

export const PromoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Hook (0-3s): dramatic side angle where the trident (Thiru Sulam) reads
          clearly against the statue's silhouette — the visual is the hook, no
          text competes with it. */}
      <Sequence from={0} durationInFrames={90}>
        <OffthreadVideo
          src={staticFile("promo-source.mp4")}
          {...shot(9, 12)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Sequence>

      {/* Beat 2 (3-10s): front-on angle showing the face, gold detailing and
          craftsmanship — pairs with the product headline. */}
      <Sequence from={90} durationInFrames={210}>
        <OffthreadVideo
          src={staticFile("promo-source.mp4")}
          {...shot(0, 7)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Sequence>

      {/* Beat 3 (10-16s): continues the rotation to a fresh angle for the
          availability callout, avoiding repeating footage already shown. */}
      <Sequence from={300} durationInFrames={180}>
        <OffthreadVideo
          src={staticFile("promo-source.mp4")}
          {...shot(20, 26)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Sequence>

      {/* Beat 4 (16-20s): final display angle held for the CTA. */}
      <Sequence from={480} durationInFrames={120}>
        <OffthreadVideo
          src={staticFile("promo-source.mp4")}
          {...shot(35, 39)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Sequence>

      {/* Subtle gold ambient particles — devotional gold theme, kept light so
          it never competes with the statue. */}
      <Sequence from={0} durationInFrames={DURATION_IN_FRAMES}>
        <Sparkles count={14} />
      </Sequence>

      {/* Brand logo, persistent top-right corner, clear of the statue. */}
      <Sequence from={0} durationInFrames={DURATION_IN_FRAMES}>
        <Logo />
      </Sequence>

      {/* Headline over beat 2 — top wood-panel area is empty, keeps the statue's
          face and gold detailing fully visible. */}
      <Sequence from={90} durationInFrames={210}>
        <WordReveal lines={["OUR UNIQUE SHIVA", "WITH THIRU SULAM"]} fontSize={54} top="6%" />
      </Sequence>

      {/* Availability callout over beat 3 */}
      <Sequence from={300} durationInFrames={180}>
        <WordReveal lines={["NOW AVAILABLE IN", "THE YELLOW BAG"]} fontSize={52} top="6%" />
        <SubText text="Exclusive Handcrafted Piece" top="90%" fontSize={28} />
      </Sequence>

      {/* Urgency + CTA over beat 4 */}
      <Sequence from={480} durationInFrames={120}>
        <SubText text="LIMITED STOCK · DM TO ORDER" top="6%" fontSize={32} />
        <CTAButton />
      </Sequence>
    </AbsoluteFill>
  );
};
