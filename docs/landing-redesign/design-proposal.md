# Design Proposal: Landing Page Redesign

> **Designer**: Visual Designer (Polecat Obsidian)
> **Date**: 2026-03-25
> **Inputs**: ux-synthesis.md, copy-recommendations.md, DESIGN-SPEC.md (Helix Noir)
> **Scope**: Landing page (primary), Navbar, Footer, MobileStickyBar

---

## Design Philosophy

This redesign prioritizes **conversion clarity** while maintaining the Helix Noir aesthetic. Every change is grounded in the UX synthesis and copy audit findings. The approach is surgical: update copy, fix broken conversion paths, improve visual hierarchy — without disrupting the existing dark-first scientific aesthetic that works well.

---

## Changes Made & Rationale

### 1. Hero Section

**Subheadline**: Reduced from 42 words to 18 words. The original tried to explain process, examples, mechanism, AND benefit in one paragraph. The rewrite uses three short sentences that mirror the product flow: Upload → Ask → Get answers. Each sentence is one idea.

**Primary CTA**: "Upload Your DNA & Start Exploring" → "Analyze My DNA — Free"
- Outcome-focused ("Analyze" not "Upload")
- First-person ("My" increases ownership per Endowment Effect)
- Price anchor ("Free") removes perceived risk
- Replaced Upload icon with DNA icon for brand consistency

**Secondary CTA**: "Try a Demo" → "See a Live Example"
- Changed from outline to filled style for co-equal visual weight (UX synthesis recommendation 2.2)
- "Live Example" sets correct expectations vs. vague "Demo"
- Both CTAs are now substantial, filled buttons — neither is subordinated

**Supporting Copy**: Opacity increased from `/50` to `/70` for legibility. Content shifted from privacy-first to value-first: "3 free analyses included · Results in under 60 seconds · No account required"

**Eyebrow Badge**: "AI-Powered Genetic Analysis" → "AI + Published Research" — more distinctive, emphasizes the two differentiators.

**Provider Strip**: "Works with" → "Compatible with" (more precise), provider text opacity increased from `/40` to `/50`.

### 2. Stats Bar

All four stats rewritten for user-centric language:
- Named the databases (ClinVar, GWAS Catalog, SNPedia) for authority
- "Cited research behind every finding" turns a feature into a trust signal
- "Results in under 60 seconds" is benefit-framed

### 3. Trust Badges

Replaced redundant privacy badge ("Data auto-deleted in 1h" — already said in hero) with value signal ("Ask about any trait — no limits"). All badge text opacity increased from `/60` to `/70` for readability.

### 4. How It Works

- Section heading changed to "Three steps to your first trait analysis" — specific, outcome-oriented, sets expectations
- Step 1: "Drag and drop" is more actionable; "600,000 variants" makes the step feel substantial
- Step 2: "There's no preset list" is the key differentiator, now stated directly; "YOUR question" makes it personal
- Step 3: Title front-loads differentiators ("cited, evidence-graded"); trust line adds verifiability ("PMIDs you can verify")

### 5. Sample Preview

- Heading: "See what you'll get" → "This is what a real analysis looks like" — more direct
- Disclaimer: "Not your data — example only" → "Sample DNA — upload yours for personalized results" — same function, adds micro-CTA
- CTA: "Get your own analysis" → "Try It with Your DNA — Free" — matches emotional peak with personal + free anchor

### 6. Features Section

- Eyebrow: "Capabilities" → "What sets us apart" — creates comparative frame
- All 8 features rewritten to be user-centric:
  - "Ask about any trait — no limits" (differentiator in title)
  - "Your variants, explained by SNPedia" (user-centric framing)
  - "Your data is never stored" (direct claim, not "privacy-first design")
  - "Verify every claim yourself" (user in control)
  - "A direct answer, not a hedge" (shows intellectual honesty)

### 7. Explore Traits

Added descriptive subline: "These are just a few of the traits you can analyze. Ask about anything." — reinforces the "no preset list" differentiator.

CTA: "Upload to explore all" → "Upload your DNA to start →" — direct action with clear outcome.

### 8. Who It's For

- Heading: "Built for the curious" → "If you have a raw DNA file, this is for you" — direct qualification
- All 4 persona descriptions rewritten to lead with pain points then solutions:
  - Genetics Enthusiasts: "Other tools give you a fixed list..."
  - Biohackers: "Your DNA is the foundation of every protocol..."
  - Quantified Self: "Add the one data layer that never changes..."
  - 23andMe Users: "Your raw DNA file is sitting in a downloads folder doing nothing..." (vivid, relatable)

### 9. Testimonials

- Heading: "From our beta testers / What early users discovered" — more specific and honest
- All 3 testimonials rewritten with specific details:
  - Sarah: Names 8 traits and specific features used
  - James: Specific comparison with Promethease (GWAS studies)
  - Maya: Names a specific trait (earwax type) and concrete proof (three SNPs)
- Removed generic role labels ("Genetics Enthusiast", "Biohacker") — replaced with simple "via Reddit/Product Hunt/Twitter"

### 10. Comparison Table

- Heading: "Why users switch from Promethease and SelfDecode" — names competitors for SEO value, frames as migration story
- Price row: "Free to start, then $0.99/trait" (leads with free); Promethease adds "(no free tier)"; SelfDecode shows annual price
- Free tier row: Added "no card required"

### 11. FAQ

- Removed "entertainment" from medical disclaimer (undermines scientific credibility)
- Standardized timing: "under 60 seconds" as primary claim (matches hero stat)
- Updated Promethease comparison with specific numbers ($538/year)
- Privacy answer: "in memory" and "within 1 hour" are more specific
- Export answer: "full citations and SNP details" + "public link" (more accurate)

### 12. Pricing Teaser

"Your first 3 analyses are free" — ownership-framed and specific. Added "No credit card. No account required." to remove two major objections inline.

### 13. Upload CTA (Bottom)

"Your DNA file is ready. Are you?" — creates gentle urgency, assumes user has a file (true for anyone who scrolled this far). Names providers for reassurance. Restates free offer.

### 14. Navbar (Critical Fix)

**This was the #1 quick win identified in the UX synthesis.** "Get Started" linked to `/auth/signup` — users clicking "Get Started" expect to START, not register. Changed to "Analyze DNA" linking to `/analyze` (both desktop and mobile menus).

### 15. Footer

- Brand description: Added "Discover what your DNA says about you" — warmer, more engaging
- Trust signals: Led with value ("Evidence-graded results") instead of privacy ("Data auto-deleted in 1 hour")

### 16. MobileStickyBar

Updated to match hero CTA language: "Analyze My DNA — Free" + "Live Example"

### 17. Accessibility

Added `aria-expanded` attribute to FAQ accordion buttons (flagged in UX synthesis section 3.5).

---

## Design Constraints Followed

- **Helix Noir aesthetic**: All changes maintain dark-first, teal-cyan accent palette
- **No new components**: Worked within existing shadcn/ui component library
- **Tailwind CSS v4**: All styling uses existing Tailwind classes
- **Space Grotesk / DM Sans / JetBrains Mono**: Font usage unchanged
- **No glass morphism, no purple gradients**: Maintained carbon-fiber instrument aesthetic
- **Subtle motion only**: No new animations added; existing fade/slide preserved

---

## What Was NOT Changed (And Why)

1. **ConsentGate timing**: UX synthesis disagreed with Alpha on moving consent after file selection. Legal risk with genetic data (GDPR Article 9). Visual redesign of ConsentGate is a separate task.
2. **Pricing page**: Time-boxed to landing page as primary focus. Pricing copy improvements noted in copy-recommendations.md for follow-up.
3. **Blog post inline CTAs**: Requires new component creation — filed as separate work.
4. **Desktop sticky CTA**: Requires new component and scroll behavior — separate task.
5. **Inline upsell at usage limit**: Requires checkout integration, not just copy — separate task.
6. **Loss aversion framing**: Avoided for health-adjacent contexts per UX synthesis section 2.3. Used curiosity framing instead.
7. **Fabricated social proof**: No fake user counts added per UX synthesis section 2.4. Will use real metrics when available.

---

## Metrics to Watch

| Change | Expected Impact | How to Measure |
|--------|----------------|----------------|
| Navbar CTA → /analyze | +30% hero-to-analyze navigation | Click tracking on nav CTA |
| Co-equal demo CTA | +20% demo starts | Demo start events |
| Subheadline rewrite | Reduced bounce rate | Time on page, scroll depth |
| Sample preview CTA | +15% upload intent from preview section | CTA click tracking |
| Supporting copy opacity fix | Trust signal visibility | Heat map analysis |
| FAQ timing standardization | Reduced confusion | Support ticket volume |

---

## Build Verification

`npm run build` passes with zero errors after all changes.
