## Typography Scale Adjustment for 4xl Nav Logo

### Problem
The navbar logo at `text-4xl` (~36px) now competes with or exceeds page headings on smaller viewports, flattening the visual hierarchy.

### Goal
Restore clear descending scale across all heading levels while keeping the 4xl logo.

### Proposed Scale

| Level | Current | Proposed |
|-------|---------|----------|
| Index Hero H1 | `clamp(2.5rem,6vw,4.5rem)` | `clamp(2.75rem,7vw,5rem)` — slightly larger to stay dominant |
| Page Hero H1s | `clamp(2rem,5vw,3.5rem)` | `clamp(2.5rem,6vw,4.5rem)` — clearly above logo |
| Section H2s | `clamp(1.75rem,4vw,3rem)` | `clamp(2rem,5vw,3.5rem)` — clearly above logo |
| Nav Logo | `text-4xl` (36px) | No change |

### Files to Update

1. **src/components/Hero.tsx** — Index hero H1
2. **src/pages/Expertise.tsx** — Expertise hero H1
3. **src/pages/HowItWorksPage.tsx** — How It Works hero H1 + section H2s (3 instances)
4. **src/pages/About.tsx** — About hero H1 + section H2s (3 instances)
5. **src/components/SolutionSection.tsx** — Solution section H2
6. **src/components/ExecutionLayers.tsx** — Execution layers section H2
7. **src/components/Differentiation.tsx** — Differentiation section H2
8. **src/components/FAQSection.tsx** — FAQ section H2
9. **src/pages/ExpertSignup.tsx** — Page title (currently `font-serif`, should switch to `heading-display` with adjusted clamp)

This gives a clean stepped hierarchy: Index Hero (~80px) > Page Heroes (~72px) > Section H2s (~56px) > Nav Logo (~36px), with all levels properly separated at every viewport.