// Burned-in captions added by THIS edit. The source video already carries
// its own correctly-styled captions (charcoal semi-transparent chip, white
// text, red/yellow/green highlighted terms) across most of its runtime —
// those are left as-is. The one caption-less stretch is the mis-voiced
// narrator block from 19.0-59.3s (see dialogueReplacement.ts), which this
// file covers using the exact same visual language so the result reads as
// one consistent system, not a patch.
import { REPLACEMENT_LINES } from "./dialogueReplacement";

export interface CaptionCue {
  start: number; // source-video seconds
  end: number;
  line1: string;
  line2?: string;
  highlight?: string[]; // words rendered in AirAsia red / amber / green
}

export const GAP_FILL_CAPTIONS: CaptionCue[] = [
  { start: 19.0, end: 20.03, line1: "Scan your QR code to confirm gate access." },
  {
    start: 20.67,
    end: 26.46,
    line1: "Every approval has a validity period —",
    line2: "check the expiry date and time before you travel.",
    highlight: ["expiry"],
  },
  {
    start: 27.01,
    end: 31.63,
    line1: "Once expired, your declaration is locked.",
    line2: "Open the e-declaration app to renew it.",
    highlight: ["locked", "renew"],
  },
  {
    start: 32.06,
    end: 42.56,
    line1: "Scan the QR code at your workplace, then confirm",
    line2: "your workplace and department to continue.",
  },
  {
    start: 43.15,
    end: 48.9,
    line1: "Complete each step in order until every item",
    line2: "shows a green check.",
    highlight: ["green"],
  },
  { start: 49.1, end: 55.0, line1: "List every personal item you are carrying." },
  {
    start: 55.1,
    end: 59.3,
    line1: "Include the item type, colour and brand.",
    highlight: ["type", "colour", "brand"],
  },
];

// Sanity check at build time: every gap-fill caption must correspond to a
// replacement line with the same start/end.
REPLACEMENT_LINES.forEach((line, i) => {
  const cue = GAP_FILL_CAPTIONS[i];
  if (!cue || cue.start !== line.start || cue.end !== line.end) {
    throw new Error(`captions.ts: cue ${i} does not align with dialogueReplacement line ${line.file}`);
  }
});
