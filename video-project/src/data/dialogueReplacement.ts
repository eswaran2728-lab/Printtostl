// Replacement-audio manifest for the confirmed male-narrator-over-B-roll
// block (19.0s-59.3s of the ORIGINAL source video).
//
// Lines 6 and 7 are VERBATIM: they match on-screen burned-in captions that
// already exist in the source footage for that span, so the wording is
// certain. Lines 1-5 cover the portion of the block that has NO burned-in
// caption to verify against, and no on-device speech-to-text was available
// in this sandbox (network access for Whisper/cloud ASR is blocked by org
// policy, and this agent has no audio-playback capability of its own) —
// their transcript is a professional RECONSTRUCTION from the visible app
// flow (QR scan -> validity countdown -> expiry lock -> renewal -> workplace
// QR/step form -> item checklist), not a verified transcript. Flagged below
// with verified: false. Re-listen to the original narration for these five
// lines before recording final replacement audio, and edit the `text`
// field here if the actual wording differs — nothing else in the project
// needs to change afterwards.
//
// Each entry's `start`/`end` are exact source-video seconds (30fps-aligned)
// bounded by measured natural speech pauses (RMS gaps), so the WAV supplied
// for a line should be trimmed/paced to fit within `durationSec` (a little
// under is fine; Remotion will not stretch it). Filenames are fixed — drop
// the finished WAV at that path in public/audio/dialogue/ and no code
// changes are required to pick it up.
export interface ReplacementLine {
  file: string; // public/audio/dialogue/<file>
  start: number; // source-video seconds
  end: number;
  durationSec: number;
  text: string;
  verified: boolean;
  voice: "ramp" | "avsec"; // which of the two consistent female voices to use
  visualContext: string;
}

export const REPLACEMENT_LINES: ReplacementLine[] = [
  {
    file: "female-replacement-01.wav",
    start: 19.0,
    end: 20.03,
    durationSec: 1.03,
    text: "Scan your QR code to confirm gate access.",
    verified: false,
    voice: "ramp",
    visualContext: "Ramp employee scans QR at the gate; app shows a green checkmark.",
  },
  {
    file: "female-replacement-02.wav",
    start: 20.67,
    end: 26.46,
    durationSec: 5.79,
    text: "Every approval has a validity period, so always check the expiry date and time shown on your declaration before you travel.",
    verified: false,
    voice: "ramp",
    visualContext: "Calendar graphic with a countdown timer ticking toward expiry.",
  },
  {
    file: "female-replacement-03.wav",
    start: 27.01,
    end: 31.63,
    durationSec: 4.62,
    text: "Once your declaration expires, it is locked. Open the e-declaration app to renew it before you continue.",
    verified: false,
    voice: "ramp",
    visualContext: "Phone shows a locked/expired declaration icon, then the app's opening screen.",
  },
  {
    file: "female-replacement-04.wav",
    start: 32.06,
    end: 42.56,
    durationSec: 10.5,
    text: "Scan the QR code at your workplace, then confirm your workplace and department to continue your declaration.",
    verified: false,
    voice: "ramp",
    visualContext: "Employee walks to a QR poster, scans it, then fills the workplace/department form with numbered steps.",
  },
  {
    file: "female-replacement-05.wav",
    start: 43.15,
    end: 48.9,
    durationSec: 5.75,
    text: "Complete each step in order until every item on your checklist shows a green check.",
    verified: false,
    voice: "ramp",
    visualContext: "Step checklist screen: steps 1, 2, 3 turning green in sequence.",
  },
  {
    file: "female-replacement-06.wav",
    start: 49.1,
    end: 55.0,
    durationSec: 5.9,
    text: "List every personal item you are carrying.",
    verified: true,
    voice: "ramp",
    visualContext: "Overhead shot of phone, watch, wallet, keys, knife; matches burned-in caption verbatim.",
  },
  {
    file: "female-replacement-07.wav",
    start: 55.1,
    end: 59.3,
    durationSec: 4.2,
    text: "Include the item type, colour, and brand.",
    verified: true,
    voice: "ramp",
    visualContext: "Same overhead shot, checklist items turning green; matches burned-in caption verbatim.",
  },
];

export const REPLACEMENT_VOICE_BRIEF = {
  voiceName: "Professional Malaysian-English female voice (to be supplied by user)",
  tone: "Calm, clear, professional — matching the ramp-employee presenter heard elsewhere in this video (e.g. the 0-19s and 95-108s segments).",
  pace: "Match durationSec per line; slow slightly rather than speeding unnaturally to fit.",
  processing: "70-90Hz high-pass, light compression, no clipping, -16 LUFS integrated, -1 dBTP true peak, short 60-100ms crossfade in/out.",
};
