import {
  Composition,
  OffthreadVideo,
  Img,
  Audio,
  Sequence,
  staticFile,
  AbsoluteFill,
} from "remotion";
import { VECTA } from "./vecta/theme";
import { SectionTitle, Subtitle, TechLabel, StatusChip, VectaTitle } from "./vecta/Typography";
import { ArchitectureNode, ArchitectureConnector } from "./vecta/Architecture";
import { CinematicVignette, DataLineWipe, FadeThroughNavy, DarkDissolveOut } from "./vecta/Overlays";
import { SecurityCheck, AuditEvent } from "./vecta/Security";

const FPS = 30;
const DURATION_IN_FRAMES = 3750; // 125s (~2:05)

export const VectaComposition = () => (
  <Composition
    id="VectaFilm"
    component={VectaFilmVideo}
    durationInFrames={DURATION_IN_FRAMES}
    fps={FPS}
    width={1920}
    height={1080}
  />
);

const seg = (name: string) => staticFile(`vecta/segments/${name}`);
const sfx = (name: string) => staticFile(`vecta/audio/${name}`);

const footageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  filter: "contrast(1.08) brightness(0.92) saturate(0.95)",
};

/** Full-bleed footage clip with the vignette baked on. */
const Footage: React.FC<{ src: string; dim?: boolean }> = ({ src, dim }) => (
  <>
    <OffthreadVideo src={src} style={footageStyle} />
    {dim && <AbsoluteFill style={{ background: VECTA.navyDeep, opacity: 0.74 }} />}
    <CinematicVignette />
  </>
);

/** Pure navy background for fully-custom (footage-free) diagram scenes. */
const NavyBG: React.FC = () => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(ellipse at 50% 40%, #0d1526 0%, ${VECTA.navyDeep} 70%)`,
    }}
  />
);

export const VectaFilmVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* ===================== AUDIO ===================== */}
      <Audio src={sfx("bed.wav")} />
      <Sequence from={630} durationInFrames={40}>
        <Audio src={sfx("reveal_impact.wav")} volume={0.8} />
      </Sequence>
      <Sequence from={1770} durationInFrames={20}>
        <Audio src={sfx("tick.wav")} volume={0.5} />
      </Sequence>
      <Sequence from={1830} durationInFrames={20}>
        <Audio src={sfx("tick.wav")} volume={0.5} />
      </Sequence>
      <Sequence from={2670} durationInFrames={20}>
        <Audio src={sfx("verified.wav")} volume={0.7} />
      </Sequence>
      <Sequence from={2910} durationInFrames={20}>
        <Audio src={sfx("whoosh.wav")} volume={0.6} />
      </Sequence>
      <Sequence from={3330} durationInFrames={50}>
        <Audio src={sfx("ecosystem_impact.wav")} volume={0.9} />
      </Sequence>
      <Sequence from={3630} durationInFrames={70}>
        <Audio src={sfx("resolve.wav")} volume={0.7} />
      </Sequence>

      {/* =========================================================
          SCENE 1 — AVIATION OPERATIONS (0:00-0:07) — frames 0-210
      ========================================================= */}
      <Sequence from={0} durationInFrames={210}>
        <Footage src={seg("s1.mp4")} />
      </Sequence>
      <Sequence from={30} durationInFrames={150}>
        <SectionTitle text="AVIATION OPERATIONS" delay={0} fontSize={52} top="30%" />
        <Subtitle text="Every movement. Every checkpoint. Every action." delay={26} fontSize={22} top="42%" />
      </Sequence>
      <Sequence from={196} durationInFrames={14}>
        <DataLineWipe durationInFrames={14} />
      </Sequence>

      {/* =========================================================
          SCENE 2 — CONNECTED OPERATIONS (0:07-0:21) — frames 210-630
      ========================================================= */}
      <Sequence from={210} durationInFrames={420}>
        <Footage src={seg("s2.mp4")} />
      </Sequence>
      <Sequence from={220} durationInFrames={100}>
        <SectionTitle text="CONNECTED OPERATIONS" fontSize={48} top="12%" />
      </Sequence>
      <Sequence from={280} durationInFrames={70}>
        <TechLabel text="AIRCRAFT" top="30%" left="12%" />
      </Sequence>
      <Sequence from={330} durationInFrames={70}>
        <TechLabel text="CHECKPOINT" top="60%" left="70%" flip />
      </Sequence>
      <Sequence from={380} durationInFrames={70}>
        <TechLabel text="STAFF" top="70%" left="20%" />
      </Sequence>
      <Sequence from={430} durationInFrames={70}>
        <TechLabel text="GROUND OPERATIONS" top="20%" left="65%" flip />
      </Sequence>
      <Sequence from={480} durationInFrames={70}>
        <TechLabel text="DIGITAL RECORDS" top="45%" left="8%" />
      </Sequence>
      <Sequence from={616} durationInFrames={14}>
        <FadeThroughNavy mode="out" durationInFrames={14} />
      </Sequence>

      {/* =========================================================
          SCENE 3 — VECTA REVEAL (0:21-0:29) — frames 630-870 (custom)
      ========================================================= */}
      <Sequence from={630} durationInFrames={240}>
        <NavyBG />
        <Sequence from={14} durationInFrames={14}>
          <FadeThroughNavy mode="in" durationInFrames={14} />
        </Sequence>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            transform: "translateY(-50%)",
          }}
        >
          <VectaTitle delay={10} />
          <div style={{ marginTop: 28 }}>
            <Subtitle
              text={"Versatile Enforcement, Continuity,\nTraceability & Audit"}
              delay={45}
              fontSize={24}
              align="center"
            />
          </div>
          <Sequence from={100} durationInFrames={140}>
            <div style={{ marginTop: 56, textAlign: "center" }}>
              <StatusChip text="ONE PLATFORM  •  CONNECTED OPERATIONS" tone="active" />
            </div>
          </Sequence>
        </div>
        <Sequence from={226} durationInFrames={14}>
          <DarkDissolveOut durationInFrames={14} />
        </Sequence>
      </Sequence>

      {/* =========================================================
          SCENE 4 — SYSTEM EVOLUTION (0:29-0:37) — frames 870-1110 (custom)
      ========================================================= */}
      <Sequence from={870} durationInFrames={240}>
        <NavyBG />
        <SectionTitle text="SYSTEM EVOLUTION" delay={6} fontSize={44} top="10%" />
        <ArchitectureNode title="CSCS" x={175} y={480} delay={30} dim />
        <ArchitectureConnector x1={395} y1={520} x2={560} y2={520} delay={45} pulse pulseDelay={50} />
        <ArchitectureNode title="ICMS" x={560} y={480} delay={55} dim />
        <ArchitectureConnector x1={780} y1={520} x2={980} y2={520} delay={70} pulse pulseDelay={75} />
        <ArchitectureNode title="AVSEC REPORTS" x={980} y={480} delay={80} dim width={240} />
        <ArchitectureConnector x1={1220} y1={520} x2={1420} y2={520} delay={95} pulse pulseDelay={100} />
        <ArchitectureNode title="VECTA" x={1420} y={470} delay={105} width={200} />
        <Sequence from={125} durationInFrames={90}>
          <Subtitle text="PAPER PROCESS  →  DIGITAL WORKFLOW" top="66%" fontSize={18} />
        </Sequence>
        <Sequence from={165} durationInFrames={60}>
          <Subtitle text="UNIFIED PLATFORM" top="74%" fontSize={18} color={VECTA.white} />
        </Sequence>
        <Sequence from={222} durationInFrames={18}>
          <DataLineWipe durationInFrames={18} />
        </Sequence>
      </Sequence>

      {/* =========================================================
          SCENE 5 — CORE CAPABILITIES (0:37-0:45) — frames 1110-1350
      ========================================================= */}
      <Sequence from={1110} durationInFrames={240}>
        <Footage src={seg("s5.mp4")} dim />
      </Sequence>
      <Sequence from={1120} durationInFrames={100}>
        <SectionTitle text="CORE CAPABILITIES" fontSize={44} top="8%" />
      </Sequence>
      <Sequence from={1170} durationInFrames={170}>
        <div style={{ position: "absolute", top: "24%", left: 0, right: 0, display: "flex", justifyContent: "center", gap: 22 }}>
          <StatusChip text="CHECKPOINT WORKFLOWS" delay={0} tone="active" />
          <StatusChip text="6 SEC REPORTS" delay={8} tone="active" />
          <StatusChip text="ROLE HIERARCHY" delay={16} tone="active" />
          <StatusChip text="CATERLINK" delay={24} tone="active" />
        </div>
      </Sequence>
      <Sequence from={1230} durationInFrames={100}>
        <div style={{ position: "absolute", top: "48%", left: 0, right: 0, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          {["SEC 013", "SEC 014", "SEC 016", "SEC 018", "SEC 029", "SEC 033"].map((c, i) => (
            <Sequence key={c} from={i * 5} durationInFrames={100 - i * 5}>
              <StatusChip text={c} tone="done" />
            </Sequence>
          ))}
        </div>
      </Sequence>
      <Sequence from={1300} durationInFrames={50}>
        <Subtitle text="CONNECTED THROUGH VECTA" top="68%" fontSize={20} />
      </Sequence>
      <Sequence from={1336} durationInFrames={14}>
        <FadeThroughNavy mode="out" durationInFrames={14} />
      </Sequence>

      {/* =========================================================
          SCENE 6 — CURRENT PILOT ARCHITECTURE (0:45-0:53) — frames 1350-1590 (custom)
      ========================================================= */}
      <Sequence from={1350} durationInFrames={240}>
        <NavyBG />
        <Sequence from={14} durationInFrames={14}>
          <FadeThroughNavy mode="in" durationInFrames={14} />
        </Sequence>
        <SectionTitle text="CURRENT PILOT ARCHITECTURE" delay={16} fontSize={40} top="8%" />

        <ArchitectureNode title="Next.js" subtitle="Frontend" x={200} y={430} delay={40} width={260} />
        <ArchitectureConnector x1={460} y1={470} x2={700} y2={470} delay={55} pulse pulseDelay={60} />
        <ArchitectureNode
          title="Supabase"
          subtitle="Postgres • Auth • Row-Level Security"
          x={700}
          y={430}
          delay={65}
          width={340}
        />
        <ArchitectureConnector x1={1040} y1={470} x2={1280} y2={470} delay={80} pulse pulseDelay={85} />
        <ArchitectureNode title="Vercel" subtitle="Hosting / Deployment" x={1280} y={430} delay={90} width={260} />

        <Sequence from={110} durationInFrames={130}>
          <div style={{ position: "absolute", bottom: "10%", left: 0, right: 0, textAlign: "center" }}>
            <Subtitle text="SELF-FUNDED PILOT  •  FREE-TIER INFRASTRUCTURE" fontSize={16} color={VECTA.greyDim} />
          </div>
        </Sequence>
        <Sequence from={226} durationInFrames={14}>
          <DarkDissolveOut durationInFrames={14} />
        </Sequence>
      </Sequence>

      {/* =========================================================
          SCENE 7 — SECURITY / ROW-LEVEL SECURITY (0:53-1:11) — frames 1590-2130
      ========================================================= */}
      <Sequence from={1590} durationInFrames={180}>
        <Footage src={seg("s7a.mp4")} dim />
      </Sequence>
      <Sequence from={1770} durationInFrames={180}>
        <Footage src={seg("s7b.mp4")} dim />
      </Sequence>
      <Sequence from={1950} durationInFrames={180}>
        <Footage src={seg("s7c.mp4")} dim />
      </Sequence>

      <Sequence from={1600} durationInFrames={100}>
        <SectionTitle text="SECURITY & ACCESS" fontSize={42} top="8%" />
      </Sequence>

      <Sequence from={1650} durationInFrames={480}>
        <SecurityCheck label="IDENTITY" delay={0} top="30%" />
        <SecurityCheck label="ROLE" delay={40} top="42%" />
        <SecurityCheck label="BRANCH / STATION" delay={80} top="54%" />
        <SecurityCheck label="DATA SCOPE" delay={120} top="66%" />
      </Sequence>

      <Sequence from={1950} durationInFrames={180}>
        <SectionTitle text="ROW-LEVEL SECURITY" delay={10} fontSize={40} top="14%" />
        <Sequence from={40} durationInFrames={140}>
          <div style={{ position: "absolute", top: "78%", left: 0, right: 0, textAlign: "center" }}>
            <StatusChip text="AUTHORIZED" tone="active" />
          </div>
        </Sequence>
        <Sequence from={90} durationInFrames={90}>
          <Subtitle
            text={"ASO  →  SO  →  DSE  →  MANAGEMENT  →  SUPER ADMIN"}
            top="88%"
            fontSize={16}
          />
        </Sequence>
      </Sequence>

      <Sequence from={2116} durationInFrames={14}>
        <FadeThroughNavy mode="out" durationInFrames={14} />
      </Sequence>

      {/* =========================================================
          SCENE 8 — OPERATIONAL SEPARATION (1:11-1:15) — frames 2130-2250
      ========================================================= */}
      <Sequence from={2130} durationInFrames={120}>
        <Footage src={seg("s8.mp4")} dim />
      </Sequence>
      <Sequence from={2140} durationInFrames={40}>
        <TechLabel text="OPERATION AVSEC" top="20%" left="10%" />
      </Sequence>
      <Sequence from={2155} durationInFrames={40}>
        <TechLabel text="IFC AVSEC" top="20%" left="45%" />
      </Sequence>
      <Sequence from={2170} durationInFrames={40}>
        <TechLabel text="HUB AVSEC" top="20%" left="75%" flip />
      </Sequence>
      <Sequence from={2190} durationInFrames={60}>
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, textAlign: "center" }}>
          <StatusChip text="VECTA  •  ROLE-BASED ACCESS CONTROL" tone="active" />
        </div>
      </Sequence>
      <Sequence from={2222} durationInFrames={22}>
        <Subtitle text={"ONE PLATFORM\nSEPARATED OPERATIONAL ACCESS"} top="70%" fontSize={18} />
      </Sequence>
      <Sequence from={2236} durationInFrames={14}>
        <DataLineWipe durationInFrames={14} />
      </Sequence>

      {/* =========================================================
          SCENE 9 — CATERLINK WORKFLOW (1:15-1:31) — frames 2250-2730
      ========================================================= */}
      <Sequence from={2250} durationInFrames={240}>
        <Footage src={seg("s9a.mp4")} dim />
      </Sequence>
      <Sequence from={2490} durationInFrames={150}>
        <Footage src={seg("s9b.mp4")} dim />
      </Sequence>
      <Sequence from={2640} durationInFrames={90}>
        <Footage src={seg("s9c.mp4")} dim />
      </Sequence>

      <Sequence from={2260} durationInFrames={100}>
        <SectionTitle text="CATERLINK" fontSize={46} top="10%" />
        <Subtitle text="External Driver Interface" delay={26} fontSize={18} top="21%" />
      </Sequence>

      <Sequence from={2320} durationInFrames={400}>
        <div style={{ position: "absolute", top: "80%", left: 0, right: 0, display: "flex", justifyContent: "center", gap: 16 }}>
          {["CREATE TRANSACTION", "QR GENERATED", "AVSEC CHECKPOINT", "VERIFIED", "VECTA"].map((label, i) => (
            <Sequence key={label} from={i * 40} durationInFrames={400 - i * 40}>
              <StatusChip text={label} tone={i === 4 ? "active" : "done"} />
            </Sequence>
          ))}
        </div>
      </Sequence>

      <Sequence from={2640} durationInFrames={90}>
        <Subtitle text="External drivers do not require direct VECTA access." top="90%" fontSize={15} color={VECTA.greyDim} />
      </Sequence>

      <Sequence from={2716} durationInFrames={14}>
        <FadeThroughNavy mode="out" durationInFrames={14} />
      </Sequence>

      {/* =========================================================
          SCENE 10 — TRACEABILITY (1:31-1:37) — frames 2730-2910
      ========================================================= */}
      <Sequence from={2730} durationInFrames={180}>
        <Footage src={seg("s10.mp4")} dim />
      </Sequence>
      <Sequence from={2736} durationInFrames={14}>
        <FadeThroughNavy mode="in" durationInFrames={14} />
      </Sequence>
      <Sequence from={2740} durationInFrames={80}>
        <SectionTitle text="TRACEABILITY" fontSize={42} top="8%" />
      </Sequence>
      <Sequence from={2790} durationInFrames={110}>
        <div style={{ position: "absolute", top: "42%", left: "10%", right: "10%", height: 60 }}>
          <AuditEvent label="TRANSACTION CREATED" index={0} total={5} delay={0} />
          <AuditEvent label="CHECKPOINT VERIFIED" index={1} total={5} delay={14} />
          <AuditEvent label="SEAL ACTION RECORDED" index={2} total={5} delay={28} />
          <AuditEvent label="QR VERIFIED" index={3} total={5} delay={42} />
          <AuditEvent label="TRANSACTION COMPLETED" index={4} total={5} delay={56} />
        </div>
      </Sequence>
      <Sequence from={2860} durationInFrames={50}>
        <div style={{ position: "absolute", top: "62%", left: 0, right: 0, textAlign: "center" }}>
          <StatusChip text="AUDIT TRAIL" tone="active" />
        </div>
      </Sequence>
      <Sequence from={2896} durationInFrames={14}>
        <DataLineWipe durationInFrames={14} />
      </Sequence>

      {/* =========================================================
          SCENE 11 — PILOT → PROPOSED PRODUCTION (1:37-1:47) — frames 2910-3210 (custom)
      ========================================================= */}
      <Sequence from={2910} durationInFrames={300}>
        <NavyBG />
        <Sequence from={0} durationInFrames={90}>
          <SectionTitle text="CURRENT PILOT" fontSize={40} top="14%" />
          <div style={{ position: "absolute", top: "40%", left: 0, right: 0, display: "flex", justifyContent: "center", gap: 60 }}>
            <Subtitle text="Next.js" delay={20} fontSize={24} align="center" />
            <Subtitle text="Supabase" delay={28} fontSize={24} align="center" />
            <Subtitle text="Vercel" delay={36} fontSize={24} align="center" />
          </div>
        </Sequence>

        <Sequence from={80} durationInFrames={14}>
          <DataLineWipe durationInFrames={14} />
        </Sequence>

        <Sequence from={90} durationInFrames={210}>
          <SectionTitle text="PROPOSED PRODUCTION MIGRATION" delay={10} fontSize={34} top="8%" />
          <Sequence from={35} durationInFrames={40}>
            <div style={{ position: "absolute", top: "24%", left: 0, right: 0, textAlign: "center" }}>
              <Subtitle text="Vercel  →  Cloud Run" fontSize={22} />
            </div>
          </Sequence>
          <Sequence from={65} durationInFrames={40}>
            <div style={{ position: "absolute", top: "32%", left: 0, right: 0, textAlign: "center" }}>
              <Subtitle text="Supabase Postgres  →  Cloud SQL" fontSize={22} />
            </div>
          </Sequence>
          <Sequence from={95} durationInFrames={40}>
            <div style={{ position: "absolute", top: "40%", left: 0, right: 0, textAlign: "center" }}>
              <Subtitle text="Supabase Auth  →  AirAsia Google Workspace SSO" fontSize={22} />
            </div>
          </Sequence>

          <Sequence from={130} durationInFrames={80}>
            <SectionTitle text="PROPOSED PRODUCTION ARCHITECTURE" fontSize={26} top="52%" />
            <ArchitectureNode title="AirAsia Google Workspace SSO" x={660} y={640} delay={20} width={380} />
            <ArchitectureConnector x1={850} y1={690} x2={850} y2={730} delay={35} pulse pulseDelay={40} />
            <ArchitectureNode title="VECTA" x={750} y={735} delay={45} width={200} />
            <ArchitectureConnector x1={850} y1={790} x2={850} y2={830} delay={55} pulse pulseDelay={60} />
            <ArchitectureNode title="Cloud Run" x={750} y={835} delay={65} width={200} />
            <ArchitectureConnector x1={850} y1={890} x2={850} y2={930} delay={70} pulse pulseDelay={75} />
            <ArchitectureNode title="Cloud SQL" x={750} y={935} delay={78} width={200} />
          </Sequence>

          <Sequence from={0} durationInFrames={210}>
            <div style={{ position: "absolute", top: "94%", left: 0, right: 0, textAlign: "center" }}>
              <StatusChip text="PROPOSED — NOT YET DEPLOYED" tone="proposed" />
            </div>
          </Sequence>
        </Sequence>

        <Sequence from={286} durationInFrames={14}>
          <DarkDissolveOut durationInFrames={14} />
        </Sequence>
      </Sequence>

      {/* =========================================================
          SCENE 12 — PLATFORM MATURITY (1:47-1:51) — frames 3210-3330
      ========================================================= */}
      <Sequence from={3210} durationInFrames={120}>
        <Footage src={seg("s12.mp4")} dim />
      </Sequence>
      <Sequence from={3216} durationInFrames={14}>
        <FadeThroughNavy mode="in" durationInFrames={14} />
      </Sequence>
      <Sequence from={3220} durationInFrames={55}>
        <SectionTitle text="CORE PLATFORM" fontSize={36} top="8%" />
        <Sequence from={20} durationInFrames={35}>
          <div style={{ position: "absolute", top: "24%", left: 0, right: 0, textAlign: "center" }}>
            <StatusChip text="FUNCTIONAL" tone="active" />
          </div>
        </Sequence>
      </Sequence>
      <Sequence from={3245} durationInFrames={50}>
        <div style={{ position: "absolute", top: "40%", left: 0, right: 0, display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
          <StatusChip text="CHECKPOINT WORKFLOWS ✓" delay={0} tone="done" />
          <StatusChip text="6 SEC REPORTS ✓" delay={6} tone="done" />
          <StatusChip text="ROLE HIERARCHY ✓" delay={12} tone="done" />
          <StatusChip text="CATERLINK ✓" delay={18} tone="done" />
        </div>
      </Sequence>
      <Sequence from={3295} durationInFrames={35}>
        <SectionTitle text="PRODUCTION MATURITY" fontSize={30} top="58%" />
      </Sequence>
      <Sequence from={3316} durationInFrames={14}>
        <FadeThroughNavy mode="out" durationInFrames={14} />
      </Sequence>

      {/* Maturity items continue briefly into scene 13's opening to avoid a
          rushed single-frame list */}
      <Sequence from={3330} durationInFrames={60}>
        <div style={{ position: "absolute", top: "8%", left: 0, right: 0, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          {["LOAD TESTING", "MONITORING", "ALERTING", "INCIDENT RESPONSE", "SLA"].map((label, i) => (
            <Sequence key={label} from={i * 6} durationInFrames={60 - i * 6}>
              <StatusChip text={label} tone="neutral" />
            </Sequence>
          ))}
        </div>
        <Sequence from={35} durationInFrames={25}>
          <Subtitle text={"BUILT  →  VALIDATED  →  EVOLVING"} top="20%" fontSize={20} />
        </Sequence>
      </Sequence>

      {/* =========================================================
          SCENE 13 — COMPLETE ECOSYSTEM (1:51-1:57) — frames 3330-3510
      ========================================================= */}
      <Sequence from={3330} durationInFrames={180}>
        <Footage src={seg("s13.mp4")} />
      </Sequence>
      <Sequence from={3395} durationInFrames={30}>
        <TechLabel text="CATERLINK" top="70%" left="15%" />
      </Sequence>
      <Sequence from={3405} durationInFrames={30}>
        <TechLabel text="AVSEC OPERATIONS" top="20%" left="60%" flip />
      </Sequence>
      <Sequence from={3415} durationInFrames={30}>
        <TechLabel text="SEC REPORTS" top="35%" left="10%" />
      </Sequence>
      <Sequence from={3425} durationInFrames={30}>
        <TechLabel text="CHECKPOINTS" top="75%" left="65%" flip />
      </Sequence>
      <Sequence from={3435} durationInFrames={30}>
        <TechLabel text="ROLE-BASED ACCESS" top="15%" left="12%" />
      </Sequence>
      <Sequence from={3445} durationInFrames={30}>
        <TechLabel text="QR & SEAL VERIFICATION" top="55%" left="68%" flip />
      </Sequence>
      <Sequence from={3455} durationInFrames={30}>
        <TechLabel text="AUDIT TRAIL" top="45%" left="8%" />
      </Sequence>
      <Sequence from={3490} durationInFrames={20}>
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, textAlign: "center", transform: "translateY(-50%)" }}>
          <SectionTitle text="ONE CONNECTED ECOSYSTEM" fontSize={44} />
        </div>
      </Sequence>
      <Sequence from={3496} durationInFrames={14}>
        <FadeThroughNavy mode="out" durationInFrames={14} />
      </Sequence>

      {/* =========================================================
          SCENE 14 — FINAL VECTA CLOSING (1:57-2:05) — frames 3510-3750
      ========================================================= */}
      <Sequence from={3510} durationInFrames={120}>
        <Footage src={seg("s14.mp4")} />
      </Sequence>
      <Sequence from={3630} durationInFrames={120}>
        <Img src={staticFile("vecta/closing-still.jpg")} style={footageStyle} />
      </Sequence>
      <Sequence from={3516} durationInFrames={14}>
        <FadeThroughNavy mode="in" durationInFrames={14} />
      </Sequence>
      {/* The footage already carries VECTA's own correctly-spelled closing
          title card (globe + wordmark + tagline) — we hold on it rather than
          layering a duplicate title on top, which produced doubled text. */}
      <Sequence from={3720} durationInFrames={30}>
        <FadeThroughNavy mode="out" durationInFrames={30} />
      </Sequence>
    </AbsoluteFill>
  );
};
