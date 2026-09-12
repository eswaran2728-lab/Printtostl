import { Composition, Sequence, Audio, Img, staticFile, AbsoluteFill } from "remotion";
import { Logo } from "./Logo";
import { SmoothZoomVideo } from "./SmoothZoomVideo";
import { KineticTitle } from "./KineticTitle";
import { CaptionLine } from "./CaptionLine";
import { HUDLabel, StatusHUD } from "./HUDLabel";
import { CutFlash } from "./CutFlash";
import { ShineSweep } from "./ShineSweep";
import { Sparkles } from "./Sparkles";
import { CTAButton } from "./CTAButton";

const FPS = 30;
const DURATION_IN_FRAMES = 960; // 32s

export const KaaliammanComposition = () => {
  return (
    <Composition
      id="KaaliammanReveal"
      component={KaaliammanVideo}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};

const src = (name: string) => staticFile(`kaaliamman/${name}`);
const sfx = (name: string) => staticFile(`audio/${name}`);

export const KaaliammanVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* ===== Background music bed, full length ===== */}
      <Audio src={sfx("drone.wav")} />

      {/* =========================================================
          BEAT 1 — HOOK (0:00-0:03)
          Strongest opening angle, subtle punch-in, teaser line only.
      ========================================================= */}
      <Sequence from={0} durationInFrames={90}>
        <SmoothZoomVideo
          src={src("0805edbb-IMG_5267.mov")}
          trimBefore={0}
          trimAfter={90}
          from={1}
          to={1.08}
          frames={90}
        />
      </Sequence>
      <Sequence from={0} durationInFrames={90}>
        <KineticTitle
          lines={[[{ text: "SOMETHING DIVINE IS" }], [{ text: "TAKING SHAPE…" }]]}
          fontSize={44}
          top="10%"
        />
      </Sequence>

      {/* =========================================================
          BEAT 2 — TITLE REVEAL (0:03-0:06.5)
      ========================================================= */}
      <Sequence from={90} durationInFrames={105}>
        <SmoothZoomVideo
          src={src("0805edbb-IMG_5267.mov")}
          trimBefore={90}
          trimAfter={195}
          from={1}
          to={1.06}
          frames={105}
        />
      </Sequence>
      <Sequence from={90} durationInFrames={105}>
        <KineticTitle
          lines={[
            [{ text: "NEW" }, { text: "1.5 FEET", emphasis: true }],
            [{ text: "KAALIAMMAN STATUE" }],
          ]}
          fontSize={48}
          top="7%"
        />
      </Sequence>
      <Sequence from={90} durationInFrames={12}>
        <CutFlash />
      </Sequence>
      <Sequence from={90} durationInFrames={20}>
        <Audio src={sfx("whoosh.wav")} volume={0.6} />
      </Sequence>

      {/* =========================================================
          BEAT 3 — STATUE REVEAL / PRINT STATUS (0:06.5-0:10.1)
      ========================================================= */}
      <Sequence from={195} durationInFrames={108}>
        <SmoothZoomVideo
          src={src("023bde34-IMG_5265.mov")}
          trimBefore={0}
          trimAfter={108}
          from={1}
          to={1.1}
          frames={108}
        />
      </Sequence>
      <Sequence from={195} durationInFrames={12}>
        <CutFlash />
      </Sequence>
      <Sequence from={195} durationInFrames={54}>
        <CaptionLine text="HALFWAY THROUGH PRINTING…" position="top" fontSize={36} />
      </Sequence>
      <Sequence from={249} durationInFrames={59}>
        <CaptionLine text="AND THE DETAILS ARE ALREADY COMING ALIVE." position="top" fontSize={30} />
      </Sequence>
      <Sequence from={195} durationInFrames={108}>
        <StatusHUD delay={20} />
      </Sequence>

      {/* =========================================================
          BEAT 4 — CRAFTSMANSHIP LABELS (0:10.1-0:13.1)
      ========================================================= */}
      <Sequence from={303} durationInFrames={90}>
        <SmoothZoomVideo
          src={src("a01c9fa6-IMG_5266.mov")}
          trimBefore={0}
          trimAfter={90}
          from={1.04}
          to={1}
          frames={90}
        />
      </Sequence>
      <Sequence from={303} durationInFrames={12}>
        <CutFlash />
      </Sequence>
      <Sequence from={303} durationInFrames={90}>
        <HUDLabel text="3D PRINTING" top="20%" left={48} delay={6} />
      </Sequence>
      <Sequence from={303} durationInFrames={90}>
        <HUDLabel text="PRECISION" top="34%" left={48} delay={26} />
      </Sequence>
      <Sequence from={303} durationInFrames={90}>
        <HUDLabel text="CRAFTSMANSHIP" top="48%" left={48} delay={46} />
      </Sequence>
      <Sequence from={303} durationInFrames={12}>
        <Audio src={sfx("tick.wav")} volume={0.5} />
      </Sequence>
      <Sequence from={329} durationInFrames={12}>
        <Audio src={sfx("tick.wav")} volume={0.5} />
      </Sequence>
      <Sequence from={349} durationInFrames={12}>
        <Audio src={sfx("tick.wav")} volume={0.5} />
      </Sequence>

      {/* =========================================================
          BEAT 5 — DETAIL ZOOM 1 (0:13.1-0:14.9)
      ========================================================= */}
      <Sequence from={393} durationInFrames={54}>
        <SmoothZoomVideo
          src={src("0805edbb-IMG_5267.mov")}
          trimBefore={195}
          trimAfter={249}
          from={1}
          to={1.15}
          frames={54}
        />
      </Sequence>
      <Sequence from={393} durationInFrames={10}>
        <CutFlash />
      </Sequence>
      <Sequence from={393} durationInFrames={54}>
        <CaptionLine text="EVERY DETAIL MATTERS." position="bottom-left" fontSize={32} />
      </Sequence>

      {/* =========================================================
          BEAT 6 — DETAIL ZOOM 2 (0:14.9-0:18.4)
      ========================================================= */}
      <Sequence from={447} durationInFrames={90}>
        <SmoothZoomVideo
          src={src("c6b06590-IMG_5268.mov")}
          trimBefore={0}
          trimAfter={90}
          from={1}
          to={1.15}
          frames={90}
        />
      </Sequence>
      <Sequence from={447} durationInFrames={10}>
        <CutFlash />
      </Sequence>
      <Sequence from={447} durationInFrames={90}>
        <CaptionLine text="CRAFTED WITH PRECISION." position="bottom" fontSize={34} />
      </Sequence>

      {/* =========================================================
          BEAT 7 — DETAIL ZOOM 3 (0:18.4-0:21.9), video then still hold
      ========================================================= */}
      <Sequence from={537} durationInFrames={79}>
        <SmoothZoomVideo
          src={src("a01c9fa6-IMG_5266.mov")}
          trimBefore={90}
          trimAfter={169}
          from={1}
          to={1.12}
          frames={79}
        />
      </Sequence>
      <Sequence from={616} durationInFrames={11}>
        <Img
          src={src("hold-5266.jpg")}
          style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.12)" }}
        />
      </Sequence>
      <Sequence from={537} durationInFrames={10}>
        <CutFlash />
      </Sequence>
      <Sequence from={537} durationInFrames={90}>
        <CaptionLine text="BUILT ONE LAYER AT A TIME." position="center-right" fontSize={30} />
      </Sequence>

      {/* =========================================================
          BEAT 8 — ZOOM-OUT HERO (0:21.9-0:24.9)
      ========================================================= */}
      <Sequence from={627} durationInFrames={90}>
        <SmoothZoomVideo
          src={src("023bde34-IMG_5265.mov")}
          trimBefore={0}
          trimAfter={90}
          from={1.12}
          to={1}
          frames={90}
        />
      </Sequence>
      <Sequence from={627} durationInFrames={12}>
        <CutFlash />
      </Sequence>
      <Sequence from={627} durationInFrames={45}>
        <CaptionLine text="THIS IS ONLY THE BEGINNING…" position="top" fontSize={34} />
      </Sequence>
      <Sequence from={672} durationInFrames={45}>
        <CaptionLine text="WAIT FOR THE FINAL REVEAL." position="top" fontSize={34} />
      </Sequence>

      {/* =========================================================
          BEAT 9 — ANTICIPATION (0:24.9-0:27.9)
      ========================================================= */}
      <Sequence from={717} durationInFrames={90}>
        <SmoothZoomVideo
          src={src("0805edbb-IMG_5267.mov")}
          trimBefore={0}
          trimAfter={90}
          from={1}
          to={1.1}
          frames={90}
        />
      </Sequence>
      <Sequence from={717} durationInFrames={12}>
        <CutFlash />
      </Sequence>
      <Sequence from={717} durationInFrames={22}>
        <CaptionLine text="STILL IN PROGRESS…" position="bottom" fontSize={34} />
      </Sequence>
      <Sequence from={739} durationInFrames={22}>
        <CaptionLine text="MORE WORK TO GO." position="bottom" fontSize={34} />
      </Sequence>
      <Sequence from={761} durationInFrames={22}>
        <CaptionLine text="MORE DETAILS TO COME." position="bottom" fontSize={34} />
      </Sequence>
      <Sequence from={783} durationInFrames={24}>
        <CaptionLine text="THE FINAL KAALIAMMAN STATUE IS COMING SOON." position="bottom" fontSize={28} />
      </Sequence>
      <Sequence from={780} durationInFrames={30}>
        <Audio src={sfx("impact.wav")} volume={0.8} />
      </Sequence>
      <Sequence from={780} durationInFrames={30}>
        <ShineSweep />
      </Sequence>

      {/* =========================================================
          BEAT 10 — CTA + END CARD (0:27.9-0:32)
      ========================================================= */}
      <Sequence from={807} durationInFrames={153}>
        <Img
          src={src("hero-still.jpg")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Sequence>
      <Sequence from={807} durationInFrames={12}>
        <CutFlash />
      </Sequence>
      <Sequence from={807} durationInFrames={153}>
        <Sparkles count={16} />
      </Sequence>
      <Sequence from={807} durationInFrames={50}>
        <CaptionLine text="WANT YOUR OWN CUSTOMISED STATUE?" position="top" fontSize={32} />
      </Sequence>
      <Sequence from={857} durationInFrames={100}>
        <CaptionLine text="✨ CUSTOMISED STATUES AVAILABLE" position="top" fontSize={30} />
      </Sequence>
      <Sequence from={877} durationInFrames={80}>
        <CTAButton text="📩 DM US TO START YOUR CUSTOM STATUE" fontSize={26} fontFamily="'Helvetica Neue', Arial, sans-serif" />
      </Sequence>
      <Sequence from={900} durationInFrames={60}>
        <CaptionLine text="🔥 FOLLOW FOR THE NEXT UPDATE" position="bottom" fontSize={28} />
      </Sequence>
      <Sequence from={870} durationInFrames={20}>
        <Audio src={sfx("whoosh.wav")} volume={0.5} />
      </Sequence>
      <Sequence from={930} durationInFrames={30}>
        <Audio src={sfx("resolve.wav")} volume={0.6} />
      </Sequence>

      {/* ===== Brand logo, persistent throughout ===== */}
      <Sequence from={0} durationInFrames={DURATION_IN_FRAMES}>
        <Logo />
      </Sequence>
    </AbsoluteFill>
  );
};
