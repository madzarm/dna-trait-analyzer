# Landing Page Redesign - Crew Plan

## Pipeline

| Phase | Worker | Skills | Output |
|-------|--------|--------|--------|
| 1 | UX Strategist Alpha | marketing-psychology, page-cro | `ux-analysis-alpha.md` |
| 2a | UX Strategist Beta | ux-researcher, page-cro | `ux-synthesis.md` |
| 2b | Copywriter | copywriting, page-cro, copy-editing | `copy-recommendations.md` |
| 3 | Visual Designer | impeccable (all) | Code changes + `design-proposal.md` |
| 4 | Design Critic | impeccable:critique, audit, harden | Code fixes + `design-review.md` |
| 5 | Frontend Engineer | ui-ux-pro-max, frontend-developer | Production-ready code |
| 6 | QA Browser Reviewer | agent-browser | `qa-report.md` |

## Dependency Chain

```
UX-Alpha → UX-Beta ──→ Designer → Critic → Engineer → QA
         → Copywriter ↗
```

## Live Site

https://dna-trait-analyzer.vercel.app/

## Design System

Follow DESIGN-SPEC.md "Helix Noir" aesthetic. Dark-first, bioluminescent teal accents.

## Output Location

All analysis/recommendation docs go in `docs/landing-redesign/`.
Code changes go directly to source files.
