# Earth-observation implementation and verification

The implementation covers 21 embedded teaching figures with **20 unique modes**. R7 and I5 use exactly the same terrain model and apparatus. Sources, derivations and original anchors remain in the lessons; the figures are teaching instruments, not substitutes for the original-source figures or full engineering simulators.

## Content changes

- Geodesy follows stations P/Q through reference, position, local scale, route, observation reduction and coordinate propagation. The 45° latitude example and a complete short reduction chain occur before the long derivations. The Gauss derivation now starts from the midpoint; the original start-point differentiation is retained in an expandable supporting section.
- Remote sensing follows the same field through energy, radiation, platform geometry and sampling. New lesson prose, exam summary, and R1–R7 figure controls/captions support Chinese and English. Figure `lang=en/both` is supplied by the shared component.
- InSAR follows the same slope from complex echo to SLC and interpretation conditions. Historical material is optional, while derivations remain continuous. The scope remains the supplied first three lectures.
- Three concise review pages preserve formula conditions, typical calculation routes and common confusions, with links from course overviews.
- GeodesyLab now explicitly identifies h=0 length coefficients and gives the constant-height alternatives.

## Evidence

| Evidence | Result and scope |
| --- | --- |
| `numerical-checks.json` | 53 checks passed; hand-computable references, exact identities, model conditions, and finite control extremes |
| `geometry-audit.json` | 60 actual sampled states passed: default and first-control extremes of each mode; 63–80 recorded physical parts per instrument |
| `cache-equivalence.json` | Nine changed poses give identical per-part keys and complete SVG strings with caching enabled and disabled |
| `browser-checks.json` | 40 mode/theme states, keyboard increment, 80 desktop/390px screenshots; zero line-end problems, script errors or horizontal overflow |
| `language-checks.json` | 14 remote-sensing English/bilingual mode states passed on390px; English visible controls, titles, readouts and captions contain no Chinese remainder |
| `performance-checks.json` | Measured median synchronous input→DOM: frame10.4 ms, latitude38.3 ms, phase73.2 ms, chirp10.6 ms, energy11.1 ms on this machine |
| `contact-*.png` | All mode screenshots reviewed together in both themes and both widths |
| `*-4x.png` | Representative enlarged rotary, globe, midpoint, optical, phase and terrain assemblies in both themes |

The renderer and audit use the **same complete0.25px ray-cast ordering and actual keys**. Optional kit caches retain the same physical geometry results, never a different order. The raster cache keeps at most160 names with one current shape per name; the pair cache is capped at4096 entries. Other kit users do not enable these caches by default. No relaxed tolerances or ignored interlocks were used to clear the audit.

## Explicit model boundaries

- The G5 route figure is an exact **sphere** demonstration, while the detailed lesson derives ellipsoidal geodesics. G7 demonstrates the midpoint Taylor term with q(B)=cos B; it is not a complete Gauss solver.
- The latitude figure uses the selected flattening for its body and numbers. Its height stylus is magnified200 times. The orbit-height stroke is exaggerated; period and speed use the actual circular two-body input. J2 and actual local revisit are not simulated.
- Thermal radiance is emission-only, per μm; brightness temperature is obtained by Planck inversion. The scanner distinguishes instantaneous footprint from sample spacing and product GSD.
- Phase uses s1s2* and ΔR=R2−R1. Penetration distinguishes amplitude, one-way power and two-way return power. The chirp shows finite-duration correlation rather than claiming all zero crossings equal1/B.
- Terrain is a two-dimensional section. Signed ω is separate from nonnegative local incidence; full terrain occlusion requires a separate ray-visibility model.
- The64-pixel speckle sample sums32 equal-amplitude random-phase scatterers. Its exact finite-model variance is31/(32M);1/M is the fully-developed limit. Coherence is a finite-window estimator, and N=1 has the known unit-magnitude degeneracy.
- These checks sample important states; they do not exhaust the continuous parameter space. Cold initial geometry computation can take roughly1–2 seconds; the recorded performance numbers measure subsequent control updates.

The dedicated localhost8793 server is closed after verification. No commit, push, merge or deployment was performed by this subtask.
