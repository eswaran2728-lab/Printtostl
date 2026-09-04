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

export const PromoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Base footage, trimmed to the first 20 seconds */}
      <Sequence from={0} durationInFrames={DURATION_IN_FRAMES}>
        <OffthreadVideo
          src={staticFile("promo-source.mp4")}
          trimBefore={0}
          trimAfter={DURATION_IN_FRAMES}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Sequence>

      {/* Ambient sparkle graphics, on for the whole clip */}
      <Sequence from={0} durationInFrames={DURATION_IN_FRAMES}>
        <Sparkles />
      </Sequence>

      {/* Brand logo, persistent top-right corner */}
      <Sequence from={0} durationInFrames={DURATION_IN_FRAMES}>
        <Logo />
      </Sequence>

      {/* Beat 1 (0.5s - 6.5s): product reveal headline */}
      <Sequence from={15} durationInFrames={165}>
        <WordReveal lines={["OUR UNIQUE SHIVAN", "WITH THIRU SULAM"]} fontSize={58} top="34%" />
      </Sequence>

      {/* Beat 2 (7s - 13.5s): availability callout */}
      <Sequence from={210} durationInFrames={195}>
        <WordReveal lines={["NOW AVAILABLE IN", "THE YELLOW BAG"]} fontSize={56} top="36%" />
        <SubText text="Exclusive Craftsmanship, Made for You" top="52%" fontSize={30} />
      </Sequence>

      {/* Beat 3 (13.5s - 20s): urgency + call to action */}
      <Sequence from={405} durationInFrames={195}>
        <SubText text="LIMITED STOCK · DON'T MISS OUT" top="30%" fontSize={34} />
        <CTAButton />
      </Sequence>
    </AbsoluteFill>
  );
};
