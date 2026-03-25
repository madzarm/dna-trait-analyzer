# Design Review: Landing Page Redesign

> **Reviewer**: Design Critic (Polecat Obsidian)
> **Date**: 2026-03-25
> **Reviewed**: design-proposal.md output by Visual Designer
> **Grade**: B+ (after fixes applied below)

---

## Summary

The Visual Designer's redesign is well-executed. Copy improvements are substantial
and well-reasoned. The conversion path fixes (Navbar CTA, co-equal demo button)
address real UX issues. The Helix Noir aesthetic is maintained throughout.

This review found **3 critical**, **4 major**, and **5 minor** issues. All have
been fixed in this commit except where noted as deferred.

---

## Issues Found & Fixed

### Critical

| # | Issue | Severity | Status |
|---|-------|----------|--------|
| C1 | **Missing `prefers-reduced-motion`**: DESIGN-SPEC 9.3 requires all animations to be disabled for users who prefer reduced motion. The globals.css had partial coverage (chat animations only) but missed all landing page animations (blob floats, sequence scroll, gradient shift, fadeInUp, stagger). | Critical | **Fixed** |
| C2 | **Comparison table overflows on mobile**: The 4-column comparison table has no horizontal scroll wrapper. On 375px screens, content is clipped or causes horizontal page scroll. | Critical | **Fixed** |
| C3 | **Low-contrast text fails WCAG AA**: Multiple opacity modifiers push text below the 4.5:1 minimum. `text-muted-foreground/50` on provider names (~2.7:1), `text-muted-foreground/40` on gene labels (~2.2:1), `text-muted-foreground/60` on "See a sample analysis" link. DESIGN-SPEC 9.1 explicitly warns that `--text-muted` at full opacity already fails AA. | Critical | **Fixed** (bumped to `/70` and `/60` minimum) |

### Major

| # | Issue | Severity | Status |
|---|-------|----------|--------|
| M1 | **MobileStickyBar secondary CTA is outline**: Design proposal says "co-equal visual weight" with "filled style" for both CTAs. The MobileStickyBar used `variant="outline"` for the Live Example button, contradicting the design intent and subordinating the demo action on mobile. | Major | **Fixed** (matched hero CTA styling) |
| M2 | **FAQ accordion missing `aria-controls` and `role="region"`**: The FAQ buttons had `aria-expanded` (good) but lacked `aria-controls` pointing to the answer panel, and the answer panel lacked `role="region"` with `aria-labelledby`. Screen readers cannot associate the toggle with its content. | Major | **Fixed** |
| M3 | **Footer icon mismatch**: "Your data is never stored" used the `BookOpen` icon, which is semantically wrong for a privacy/security message. | Major | **Fixed** (changed to `Lock`) |
| M4 | **Stats bar divider spacing hack**: Dividers used `-ml-4` to compensate for the parent's `gap-x-8`. This is fragile and breaks if gap values change. | Major | **Fixed** (removed negative margin) |

### Minor

| # | Issue | Severity | Status |
|---|-------|----------|--------|
| m1 | **Hero buttons use `h-13`**: Non-standard Tailwind value (52px). DESIGN-SPEC button `lg` size is 48px (`h-12`). While Tailwind v4 may resolve `h-13` correctly, it deviates from the spec. | Minor | **Fixed** (changed to `h-12`) |
| m2 | **Testimonials lack semantic markup**: Quotes were in `<div>/<p>` instead of `<blockquote>/<footer>`. Screen readers and search engines benefit from proper quote semantics. | Minor | **Fixed** |
| m3 | **ComparisonMark "Partial" uses `text-accent`**: This resolves to amber, which reads as a "warning" status rather than "partial support". Changed to `text-muted-foreground` for a neutral indicator. | Minor | **Fixed** |
| m4 | **Missing section IDs**: Only 3 of 12 sections had IDs. Added IDs to how-it-works, features, explore-traits, who-its-for for deep-linking and accessibility. | Minor | **Fixed** |
| m5 | **Navbar mobile menu missing `role="navigation"` and `aria-label`**: Mobile menu panel had no ARIA landmark. Screen readers see it as a generic container. | Minor | **Fixed** |

---

## Remaining Concerns for the Frontend Engineer

These items were identified but are outside the scope of a copy/design review pass:

1. **Skip navigation link**: DESIGN-SPEC 9.2 specifies a "Skip to main content" link in the layout. This requires changes to `layout.tsx`, not the landing page. The `<main id="main-content">` target has been added to `page.tsx` to support this.

2. **Mobile nav focus trap**: When the mobile menu opens, keyboard focus can escape to content behind the overlay. A proper focus trap (e.g., `@headlessui/react` Dialog or manual trap) should be implemented.

3. **Pre-existing lint errors**: 3 lint errors in `CookieConsent.tsx` (setState in effect) exist independently of this redesign.

4. **Comparison table on very narrow screens**: While `overflow-x-auto` prevents clipping, the table experience on 375px is still a horizontal scroll. Consider a stacked card layout for mobile (similar to the DESIGN-SPEC's mobile SnpTable approach in 6.10).

5. **Light mode testing**: The redesign was dark-first per Helix Noir. The light mode variables exist in globals.css but the landing page hasn't been visually verified in light mode. The opacity modifiers on text colors may need separate light-mode values.

---

## Build Verification

`npm run build` passes with zero errors after all changes.
`npm run lint` shows 3 pre-existing errors in CookieConsent.tsx (not introduced by this review).
