# ML teaching instruments and verification

Four instruments explain calibration residuals, Fisher projection, the ReLU zero stop and HOG block layout. Models and displayed values share one pure function. Calibration uses the same four observations as A1–A6; Fisher uses a declared toy two-class set. Per-sample projected markers occupy parallel tracks to avoid physical overlap, while their along-ruler coordinate remains wᵀx. HOG texture is schematic; this figure computes layout dimensions rather than extracting an image descriptor.

The runtime and geometry audit use the same analytic projected-face painter order (`ml-order.mjs`). Visible convex faces carry affine view depth; projected overlap gives a dependency graph. The independent Anatomy audit checks the actual resulting keys, supports, penetrations and geometry coverage across twelve sampled states. Engraved rail ticks are surface linework, not protruding solids through which a carriage moves.

- `model-checks.json`: 114 numerical checks and 120 intermediate painter states.
- `geometry-audit.json`: twelve representative poses, all categories zero; no claim to enumerate every continuous parameter.
- `browser-checks.json`: sixteen viewport/theme cases, actual controls, keyboard, line ends, reduced motion, timed model updates, paused/offscreen frame suspension.
- Desktop/390px and both-theme 4× PNGs were inspected locally. Mounted SVG path attributes update in place while topology stays constant; a topology change rebuilds only the figure's nodes. No React frame renders.

Independent review found and corrected a Fisher coordinate-origin offset that J alone could not detect. Calibration's initial loss is .75 and fitted loss .225. ReLU has no ordinary derivative at zero. HOG defaults to four blocks ×81 dimensions =324; changing layout changes the MLP input requirement.

Run `node scripts/check-anatomy-ml.mjs`, `node scripts/anatomy/build-ml.mjs --audit`, and (after installing Playwright Chromium) `node scripts/check-anatomy-ml-ui.mjs`. Windows can select Edge with PLAYWRIGHT_CHANNEL=msedge.
