# Implementation ledger — 2026-11-04-geodesy-figures

Spec: reports/geodesy-figures-plan.md and approved user plan.
Baseline: 1a76f44. Implementation started from a clean linked worktree on design/folio-classroom-20261102.
Pre-flight: canonical Markdown and figure assets feed publisher; generated docs and public assets must be regenerated after edits. SourceFigure caption slot and locator must remain compatible with existing callers.
Prior design review: https://chatgpt.com/c/6aea8e95-5954-83ec-959d-8fe8b2bdd5bd

## Tasks

- [x] 1. Caption publishing and source locators — dropped-caption regression observed RED, fixed; 20 Node tests PASS.
- [x] 2. Geometric figures and source crops — 11 deterministic SVGs and 10 selected source figures; 31 topics / 55 assets checked.
- [x] 3. Coordinate explanations and all-topic captions — 43 Markdown captions, geometry-first explanations, h/dh notation, legacy headings preserved.
- [x] 4. Mathematics, offline/UI checks, external review
- [ ] 5. Release and offline delivery

Ruling: store the implementation plan under reports rather than docs — docs is published as site pages, while this record serves maintenance.
Independent review: no Critical; found residual dH, two removed automatic headings and clipped source axis labels. All corrected. Two smaller diagram/caption findings also corrected within requested illustration scope.
Mathematics: four Python geodesy scripts PASS, including independently constructed basis, finite height 500.019639528 m, similarity inverse and pivot equivalence.

Final local checks: 255 built pages / 22657 links; 20 Node tests; four Python mathematical checks; 31-topic illustration check; 72 new viewport/theme/keyboard cases; 206 deterministic files, 11 unchanged originals; offline archive CRC and all 121 bytes-to-source comparisons PASS.

Targeted browser review completed: all reported issues resolved, no further substantive issue; mistaken reading of the old north-east-up label withdrawn. Release requested by approved plan; no new integration confirmation required.
