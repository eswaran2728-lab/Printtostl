// Burned-in captions added by THIS edit. The source video already carries
// its own correctly-styled captions (charcoal semi-transparent chip, white
// text, red/yellow/green highlighted terms) across most of its runtime —
// those are left as-is. Most of the mis-voiced narrator block (19.0-59.3s,
// see dialogueReplacement.ts) has NO burned-in caption of its own, which is
// what this file fills in, using the exact same visual language so the
// result reads as one consistent system. The final two lines of that block
// (49.1-59.3s) are the exception: the source ALREADY burns in matching
// captions there (confirmed verbatim during inspection — see
// dialogueReplacement.ts's `verified: true` lines), so this file does NOT
// duplicate them; an earlier version of this file did, and the result was
// two overlapping copies of the same caption stacked on screen.
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
];

// Sanity check at build time: every gap-fill caption must correspond to an
// UNverified replacement line (i.e. one with no burned-in caption already).
// Verified lines (burned-in caption already exists) must NOT get one of
// these on top, or the result is a duplicated/overlapping caption.
REPLACEMENT_LINES.filter((l) => !l.verified).forEach((line, i) => {
  const cue = GAP_FILL_CAPTIONS[i];
  if (!cue || cue.start !== line.start || cue.end !== line.end) {
    throw new Error(`captions.ts: cue ${i} does not align with dialogueReplacement line ${line.file}`);
  }
});
