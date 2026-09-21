# Replacement-audio manifest — AirAsia AVSEC e-Declaration edit

Drop each finished WAV at the path shown below. No code or Remotion project
changes are needed afterwards — the timeline already has a `<Sequence>` +
`<Audio>` slot wired to each exact filename and time range
(`src/AvsecTrainingVideo.tsx`, driven by `src/data/dialogueReplacement.ts`).

Voice: one consistent professional Malaysian-English female voice for all
seven lines (ramp-employee tone — calm, clear, professional; matching the
female presenter heard elsewhere in this video, e.g. 0-19s and 95-108s).

Processing target for each file before dropping it in: 70-90Hz high-pass,
light compression, no clipping, ~-16 LUFS integrated / -1 dBTP true peak,
60-100ms fade in/out.

| # | Filename | Path | Start | End | Target duration | Verified transcript? |
|---|----------|------|-------|-----|------------------|----------------------|
| 1 | female-replacement-01.wav | `public/audio/dialogue/` | 19.00s | 20.03s | 1.03s | No — reconstructed |
| 2 | female-replacement-02.wav | `public/audio/dialogue/` | 20.67s | 26.46s | 5.79s | No — reconstructed |
| 3 | female-replacement-03.wav | `public/audio/dialogue/` | 27.01s | 31.63s | 4.62s | No — reconstructed |
| 4 | female-replacement-04.wav | `public/audio/dialogue/` | 32.06s | 42.56s | 10.50s | No — reconstructed |
| 5 | female-replacement-05.wav | `public/audio/dialogue/` | 43.15s | 48.90s | 5.75s | No — reconstructed |
| 6 | female-replacement-06.wav | `public/audio/dialogue/` | 49.10s | 55.00s | 5.90s | **Yes** — matches burned-in caption |
| 7 | female-replacement-07.wav | `public/audio/dialogue/` | 55.10s | 59.30s | 4.20s | **Yes** — matches burned-in caption |

## Transcript per line

1. "Scan your QR code to confirm gate access."
   *(Visual: ramp employee scans QR at the gate; app shows a green checkmark.)*
2. "Every approval has a validity period, so always check the expiry date and
   time shown on your declaration before you travel."
   *(Visual: calendar graphic with a countdown timer ticking toward expiry.)*
3. "Once your declaration expires, it is locked. Open the e-declaration app
   to renew it before you continue."
   *(Visual: phone shows a locked/expired declaration icon, then the app's
   opening screen.)*
4. "Scan the QR code at your workplace, then confirm your workplace and
   department to continue your declaration."
   *(Visual: employee walks to a QR poster, scans it, fills the
   workplace/department form with numbered steps.)*
5. "Complete each step in order until every item on your checklist shows a
   green check."
   *(Visual: step checklist screen, steps 1-2-3 turning green in sequence.)*
6. "List every personal item you are carrying." *(verbatim, burned-in caption)*
7. "Include the item type, colour, and brand." *(verbatim, burned-in caption)*

**Important — why lines 1-5 are marked "reconstructed, not verified":** this
sandbox has no network access to run cloud speech-to-text (Whisper model
download and Edge TTS are both blocked by the org's egress policy) and I have
no audio-playback capability of my own. Lines 1-5 fall in the stretch of the
male-narrator block that has no burned-in caption to check against, so their
wording above is my best reconstruction from the visible on-screen app flow,
not a verified transcript of the original audio. Please listen to the
original narration for these five lines (still present, unmuted, in the
review render) and correct the wording above before recording, if it
differs. Lines 6-7 are exact because the source video already burns in
matching captions for that stretch.
