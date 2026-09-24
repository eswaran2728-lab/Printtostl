import { useEffect } from "react";
import { continueRender, delayRender, staticFile } from "remotion";

// Loading fonts via a bare <style>@font-face</style> tag with
// font-display:block does NOT guarantee the font is ready by the time
// Remotion captures a frame or still — Chromium can paint a fallback-font
// pass before the swap completes, which showed up as a doubled/ghosted
// title (fallback serif rendered underneath the real Noto Sans Tamil /
// Cormorant Garamond glyphs at a different size). Loading each font
// explicitly via the FontFace API and holding the render with
// delayRender/continueRender until every fontFace.load() promise resolves
// is the pattern Remotion's own docs recommend for self-hosted fonts, and
// eliminates the race.
let fontsPromise: Promise<void> | null = null;

function loadFontsOnce(): Promise<void> {
  if (fontsPromise) return fontsPromise;

  const specs: Array<{ family: string; weight: string; url: string }> = [
    { family: "Noto Sans Tamil", weight: "400", url: staticFile("fonts/noto-sans-tamil-tamil-400-normal.woff2") },
    { family: "Noto Sans Tamil", weight: "600", url: staticFile("fonts/noto-sans-tamil-tamil-600-normal.woff2") },
    { family: "Cormorant Garamond", weight: "500", url: staticFile("fonts/cormorant-garamond-latin-500-normal.woff2") },
    { family: "Cormorant Garamond", weight: "600", url: staticFile("fonts/cormorant-garamond-latin-600-normal.woff2") },
  ];

  fontsPromise = Promise.all(
    specs.map(async (spec) => {
      const face = new FontFace(spec.family, `url(${spec.url}) format('woff2')`, {
        weight: spec.weight,
      });
      const loaded = await face.load();
      (document.fonts as FontFaceSet).add(loaded);
    })
  ).then(() => undefined);

  return fontsPromise;
}

/** Blocks this component's frame from being captured until the Tamil and
 * display fonts used by OpeningTitle/FinalCredits are fully loaded. */
export function useNppFonts() {
  useEffect(() => {
    const handle = delayRender("Loading Nee Pona Pinne title fonts");
    loadFontsOnce()
      .then(() => continueRender(handle))
      .catch((err) => {
        console.error("Font load failed", err);
        continueRender(handle);
      });
  }, []);
}
