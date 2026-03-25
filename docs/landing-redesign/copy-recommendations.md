# Copy Recommendations: DNA Trait Analyzer

> **Author**: Senior Conversion Copywriter (Copy Audit & Rewrite)
> **Date**: 2026-03-25
> **Dependency**: Built on UX Strategy Alpha analysis (`ux-analysis-alpha.md`)
> **Scope**: All user-facing copy across landing page, pricing, navigation, analyze, auth, and blog pages

---

## Tone & Voice Guidelines (Applied Throughout)

- **Scientific but accessible** — precise language, no jargon without context
- **Confident, not arrogant** — "Your DNA reveals..." not "Our revolutionary AI..."
- **Privacy-first, woven naturally** — mention once per section max, never lead with it
- **Dark premium "Helix Noir" aesthetic** — copy should feel like a research instrument, not a wellness app
- **Power words**: discover, reveal, decode, explore, uncover, understand
- **Banned words**: revolutionary, amazing, cutting-edge, innovative, unlock the secrets, game-changing

---

## 1. Landing Page (`src/app/page.tsx`)

### 1.1 Hero Section (lines 236–325)

#### Eyebrow Badge (line 242–244)

**Current:**
```
AI-Powered Genetic Analysis
```

**Issues:** Generic. Could describe any AI genetics product. Doesn't differentiate.

**Recommended:**
```
AI + Published Research
```

**Rationale:** Emphasizes the two things that make this product unique — AI capability combined with real cited research. Shorter, more distinctive. Communicates credibility immediately.

---

#### Headline (lines 248–251)

**Current:**
```
Ask Your DNA Anything.
```

**Issues:** None. This is strong — curiosity-driven, concise, passes the 5-second test. Keep as-is.

**Recommended:** No change.

---

#### Subheadline (lines 254–259)

**Current:**
```
Upload your raw DNA file and ask about any trait — caffeine metabolism, lactose
intolerance, bitter taste perception, athletic potential. Our AI researches the
genetics live, cross-references your actual DNA, and gives you evidence-backed
answers in minutes.
```

**Issues:**
- 42 words — too long for System 1 processing
- Tries to explain process, examples, mechanism, AND benefit in one paragraph
- "Our AI researches the genetics live" is company-centric, not user-centric
- Buries the payoff ("evidence-backed answers in minutes") at the end

**Recommended:**
```
Upload your raw DNA file. Ask about any trait. Get evidence-backed answers
in under 60 seconds.
```

**Rationale:** 18 words. Three clear steps that mirror the product flow. Ends with the benefit and a specific timeframe. Each sentence is one idea. Visitors can process this in 2 seconds.

**Alternative A (curiosity-forward):**
```
From caffeine metabolism to eye color — discover what your genes actually say,
backed by published research.
```

**Alternative B (loss-aversion framing):**
```
Your raw DNA file holds answers about hundreds of traits. Upload it and find out
what you've been missing.
```

---

#### Primary CTA (line 268–269)

**Current:**
```
Upload Your DNA & Start Exploring
```

**Issues:**
- 6 words — too long for a button
- Ampersand combines two actions, increasing perceived commitment
- Feature-focused ("upload") instead of outcome-focused
- Demands the scariest action (file upload) before motivation is built

**Recommended:**
```
Analyze My DNA — Free
```

**Rationale:** Outcome-focused ("Analyze" not "Upload"), first-person ("My" increases ownership), and the price anchor ("Free") reduces perceived risk. The dash separates the action from the risk-reversal.

**Alternative A:**
```
See What Your DNA Says
```
Curiosity-driven, lower commitment feel. Good for A/B testing against the direct version.

**Alternative B:**
```
Upload Your DNA — It's Free
```
Keeps the direct "upload" language but adds the critical price anchor.

---

#### Secondary CTA (lines 271–280)

**Current:**
```
Try a Demo
```

**Issues:** Vague. "Demo" could mean a video, a walkthrough, or a sales presentation. Doesn't communicate what happens.

**Recommended:**
```
See a Live Example
```

**Rationale:** Sets the right expectation — the user will see a real analysis running. "Live" communicates interactivity. No ambiguity about what they'll experience.

**Alternative:**
```
Try Caffeine Analysis — Free
```
Specific and tangible. Names the exact trait they'll explore. Creates concrete curiosity.

---

#### Supporting Copy (lines 284–296)

**Current:**
```
Free to start · No genetic counselor needed · Data auto-deleted in 1 hour
```
*(Rendered at `text-xs text-muted-foreground/50` — 50% opacity)*

**Issues:**
- At 50% opacity, this critical trust information is nearly invisible
- "No genetic counselor needed" is an odd reassurance — implies complexity
- "Data auto-deleted in 1 hour" is privacy-centric where value should lead

**Recommended:**
```
3 free analyses included · Results in under 60 seconds · No account required
```

**Rationale:** Leads with the free offer (quantified — "3" is specific and creates urgency), then the speed benefit, then friction reduction. All three are value-forward. Privacy messaging is handled elsewhere.

**Note for designer:** Increase opacity from `/50` to `/70` minimum. Trust signals must be legible.

---

#### "See example results" Link (lines 289–295)

**Current:**
```
See example results
```
*(At 40% opacity)*

**Issues:** Too dim. Users won't notice it. The preview section is the strongest on the page — this link should pull people toward it.

**Recommended:**
```
See a sample analysis ↓
```

**Rationale:** "Sample analysis" is more descriptive than "example results." The arrow hints at scroll direction. Should be at least 60% opacity.

---

#### Provider Strip (lines 299–312)

**Current:**
```
Works with: 23andMe  AncestryDNA  MyHeritage  FTDNA
```

**Issues:** Good as-is. Answers "does this work with my data?" immediately. Minor improvement: make the label clearer.

**Recommended:**
```
Compatible with: 23andMe · AncestryDNA · MyHeritage · FTDNA
```

**Rationale:** "Compatible with" is more precise than "Works with." Adding dots improves scannability. No substantive change needed.

---

### 1.2 Stats Bar (lines 331–354)

**Current:**
```
609,000+ SNPs cross-referenced | 3 research databases | 3-tier evidence grading | <60s per analysis
```

**Issues:**
- "609,000+ SNPs" is meaningless to most users
- "3 research databases" is underwhelming without names
- "3-tier evidence grading" is a feature, not a benefit
- Stats describe the system, not the user outcome

**Recommended:**
```
609,000+ variants analyzed | ClinVar · GWAS Catalog · SNPedia | Cited research behind every finding | Results in under 60 seconds
```

**Rationale:**
- "Variants analyzed" is slightly more accessible than "SNPs cross-referenced"
- Naming the databases creates authority (ClinVar and GWAS Catalog are trusted names)
- "Cited research behind every finding" turns a feature into a trust signal
- "<60s per analysis" → "Results in under 60 seconds" is benefit-framed

---

### 1.3 Social Proof Badges (lines 359–384)

**Current:**
```
Data auto-deleted in 1h | Peer-reviewed sources | No account required
```

**Issues:**
- "Data auto-deleted in 1h" is the second repetition of privacy messaging (it's in the hero too)
- Two of three badges are friction/privacy reducers, not value signals
- Over-indexing on privacy primes anxiety

**Recommended:**
```
Ask about any trait — no limits | Backed by peer-reviewed research | No account required
```

**Rationale:** Replaces the redundant privacy badge with a value signal ("Ask about any trait — no limits") that highlights the key differentiator. Keeps the two strongest badges: research authority and friction reduction.

---

### 1.4 How It Works (lines 389–466)

#### Section Heading (lines 393–398)

**Current:**
```
How it works
See what your DNA can tell you
```

**Issues:** The subheading "See what your DNA can tell you" is vague. It doesn't promise anything specific.

**Recommended:**
```
How it works
Three steps to your first trait analysis
```

**Rationale:** Specific ("three steps"), outcome-oriented ("first trait analysis"), and sets expectations for what follows.

---

#### Step 1 (lines 403–410)

**Current:**
```
Title: Upload your raw DNA file
Description: Download your raw DNA export from 23andMe, AncestryDNA, MyHeritage, or FamilyTreeDNA. It takes 30 seconds. Your file is processed instantly—no waiting.
Trust: Data is processed in memory and auto-deleted within 1 hour.
```

**Issues:** Description is 30 words and includes instruction ("Download your raw DNA export from...") that belongs in help docs, not marketing. "It takes 30 seconds" competes with "<60s per analysis" stat.

**Recommended:**
```
Title: Upload your raw DNA file
Description: Drag and drop your raw data export from 23andMe, AncestryDNA, MyHeritage, or FTDNA. Your file is parsed instantly — we identify over 600,000 genetic variants.
Trust: Processed in memory only. Never stored. Auto-deleted in 1 hour.
```

**Rationale:** "Drag and drop" is more actionable than "download your export." Adding the "600,000 variants" figure makes the step feel substantial. Trust line is tightened to three punchy clauses.

---

#### Step 2 (lines 413–419)

**Current:**
```
Title: Ask about any trait you're curious about
Description: Don't see what you want to know? Ask anyway. Type your question — "Can I taste bitter flavors?" "Am I a night owl?" "How fast is my metabolism?" — and our AI goes to work researching the genetics.
Trust: AI researches published studies and SNP databases in real-time.
```

**Issues:** Description is 45 words. The examples are good but the framing ("Don't see what you want to know?") implies a limitation before showing the strength. "Our AI goes to work" is company-centric.

**Recommended:**
```
Title: Ask any question about your traits
Description: Type what you're curious about — caffeine sensitivity, sleep patterns, bitter taste, athletic potential. There's no preset list. Our AI searches published genetics research in real time to answer YOUR question.
Trust: Cross-references ClinVar, GWAS Catalog, and published studies live.
```

**Rationale:** Title is shortened. "There's no preset list" is the key differentiator — stated directly. "YOUR question" makes it personal. Trust line names the specific databases for authority.

---

#### Step 3 (lines 422–428)

**Current:**
```
Title: Get evidence-backed answers in minutes
Description: No guesswork. You get a clear analysis of which genes influence your trait, how strong the science is, and exactly which SNPs in your DNA drive the conclusion. Every finding is cited with the research it's based on.
Trust: Every result is backed by ClinVar, GWAS Catalog, and published research.
```

**Issues:** The key differentiator ("Every finding is cited") is buried at the end of 44 words. "In minutes" conflicts with the "<60s" stat elsewhere. Trust line repeats the description.

**Recommended:**
```
Title: Get cited, evidence-graded results
Description: Every finding comes with the specific SNPs in your DNA, the published research behind it, and a clear confidence rating — strong, moderate, or preliminary. No guesswork. No vague percentages.
Trust: Every claim links to published studies with PMIDs you can verify.
```

**Rationale:** Title front-loads the differentiators ("cited, evidence-graded"). Description leads with specificity (what you get) rather than burying it. Trust line adds verifiability ("PMIDs you can verify") — powerful for a scientifically literate audience.

---

### 1.5 Sample Preview (lines 471–641)

#### Section Heading (lines 484–494)

**Current:**
```
Sample result
See what you'll get
```

Right-side text: "Real example analysis. Upload your DNA to get personalized results like this."

**Issues:** "See what you'll get" is generic. The right-side text is fine but could be more motivating.

**Recommended:**
```
Sample result
This is what a real analysis looks like
```

Right-side text: "This example uses sample DNA. Upload yours to see your own results."

**Rationale:** "This is what a real analysis looks like" is direct and sets expectations. Right-side text pivots from "this is a sample" to "upload yours" — redirecting desire.

---

#### "Not your data — example only" (line 512)

**Current:**
```
Not your data — example only
```

**Issues:** Necessary disclaimer but could redirect desire instead of just disclaiming.

**Recommended:**
```
Sample DNA — upload yours for personalized results
```

**Rationale:** Same disclaimer function but adds a micro-CTA that channels the user's interest.

---

#### Preview CTA Button (lines 629–635)

**Current:**
```
Get your own analysis
```

**Issues:** Good intent but generic. This is the highest-intent moment on the page — after seeing a compelling, concrete preview, users want THEIR version. The CTA should match that emotional peak.

**Recommended:**
```
Try It with Your DNA — Free
```

**Rationale:** "Try It" mirrors the demo they just saw. "Your DNA" makes it personal. "Free" removes the last barrier. This button should be styled as primary (filled, not outline) since it appears at peak motivation.

---

### 1.6 Features Section (lines 647–729)

#### Section Heading (lines 649–656)

**Current:**
```
Capabilities
Built for real genetics
```

**Issues:** "Built for real genetics" is strong — keep it. "Capabilities" as a label is generic.

**Recommended:**
```
What sets us apart
Built for real genetics
```

**Rationale:** "What sets us apart" creates a comparative frame that makes each feature feel like a competitive advantage.

---

#### Feature Rewrites (user-centric framing)

**Current → Recommended** (title + description rewrites):

**Feature 1:**
- Current: "Ask about any trait" / "Unlike fixed-database tools, there's no trait list to browse. Ask us anything — new research is discovered every day, and our AI pulls the latest findings."
- Recommended: "Ask about any trait — no limits" / "There's no preset list of traits. You type the question; our AI searches the latest published genetics research to answer it. New studies are discovered daily."
- Rationale: Leads with the differentiator. "You type the question" puts the user in the driver's seat.

**Feature 2:**
- Current: "Real SNPedia data" / "We pull authoritative genotype descriptions, magnitude scores, and population frequencies directly from SNPedia. You get the ground truth about your variants."
- Recommended: "Your variants, explained by SNPedia" / "See what SNPedia — the largest genotype wiki — says about your specific variants. Magnitude scores, population frequencies, and clinical relevance for every match."
- Rationale: "Your variants" is user-centric. Naming SNPedia's role ("largest genotype wiki") adds authority context for non-experts.

**Feature 3:**
- Current: "Evidence-weighted analysis" / "Every SNP is classified: strong, moderate, or preliminary evidence. Strong findings drive conclusions. Weak ones get honest caveats."
- Recommended: "Every finding is evidence-graded" / "Strong, moderate, or preliminary — every SNP match is rated by the strength of published research behind it. Strong evidence drives conclusions. Weak evidence gets honest caveats."
- Rationale: Front-loads the three tiers. "Published research behind it" adds specificity.

**Feature 4:**
- Current: "Haplotype-aware interpretation" / "Linked SNPs like APOE e2/e3/e4 or TAS2R38 PAV/AVI are analyzed together as haplotypes, not as contradictory individual signals."
- Recommended: "Haplotype-aware — linked genes analyzed together" / "SNPs that work together (like APOE e2/e3/e4 for Alzheimer's risk, or TAS2R38 PAV/AVI for bitter taste) are interpreted as a group, not as contradictory signals."
- Rationale: Subtitle adds a plain-language explainer. Parenthetical gives concrete examples with trait names so non-experts understand why this matters.

**Feature 5:**
- Current: "609,000 SNPs cross-referenced" / "Your full raw data is parsed and matched against researched variants. You see exactly which SNPs were found in your DNA and which were not."
- Recommended: "609,000+ variants cross-referenced" / "Your entire raw data file is parsed and compared against known genetic associations. You see exactly which variants were found in your DNA — and which weren't."
- Rationale: Minor polish. "Known genetic associations" is clearer than "researched variants."

**Feature 6:**
- Current: "Privacy-first design" / "DNA data is processed in-memory on the server, never stored permanently, and automatically deleted after 1 hour. We can't sell what we don't keep."
- Recommended: "Your data is never stored" / "DNA files are processed in memory, never written to disk, and automatically deleted within 1 hour. We can't sell what we don't keep."
- Rationale: Title is a clear, direct claim. "Never written to disk" is more precise than "never stored permanently" (which implies it IS stored temporarily). Keeps the strong closing line.

**Feature 7:**
- Current: "Transparent sourcing" / "Every analysis cites specific studies with PMIDs, effect sizes, and odds ratios so you can verify the science yourself."
- Recommended: "Verify every claim yourself" / "Every finding cites the specific studies it's based on — PMIDs, effect sizes, and odds ratios included. Nothing is a black box."
- Rationale: Title puts the user in control. "Nothing is a black box" contrasts with competitors that don't show their work.

**Feature 8:**
- Current: "Clear bottom-line answers" / "No wishy-washy hedging. You get a direct verdict backed by the specific genotypes driving that conclusion."
- Recommended: "A direct answer, not a hedge" / "You get a clear conclusion backed by the exact genotypes in your DNA that drive it. When the science is uncertain, we say so directly."
- Rationale: "When the science is uncertain, we say so directly" builds more trust than claiming zero hedging. It shows intellectual honesty.

---

### 1.7 Explore Traits Section (lines 734–882)

#### Section Heading (lines 747–753)

**Current:**
```
Explore
What will you discover?
```

**Issues:** Good. Curiosity-driven question. Keep it.

**Recommended:** No change to heading. Add a subline:

```
Explore
What will you discover?
These are just a few of the traits you can analyze. Ask about anything.
```

**Rationale:** Reinforces the "no preset list" differentiator and invites users to think beyond the displayed cards.

---

#### "Upload to explore all" link (lines 754–760)

**Current:**
```
Upload to explore all
```

**Issues:** "Explore all" is vague. What is "all"?

**Recommended:**
```
Upload your DNA to start →
```

**Rationale:** Direct action with a clear outcome.

---

### 1.8 Who It's For Section (lines 887–939)

#### Section Heading (lines 890–896)

**Current:**
```
Who it's for
Built for the curious
```

**Issues:** "Built for the curious" is good but could be more specific.

**Recommended:**
```
Who it's for
If you have a raw DNA file, this is for you
```

**Rationale:** Direct qualification. Everyone with a raw file immediately self-selects. More actionable than "the curious."

---

#### Persona Copy Rewrites

**Genetics Enthusiasts:**
- Current: "Finally, a tool that doesn't limit your questions. Explore genetic associations at the speed of research, not the speed of corporate feature releases."
- Recommended: "Other tools give you a fixed list of traits. We let you ask about anything — and our AI searches the latest published research to answer it. No waiting for feature updates."
- Rationale: Starts with the pain point (fixed lists) before presenting the solution. More concrete.

**Biohackers:**
- Current: "Connect your DNA to your optimization efforts. Understand your genetic baseline for sleep, metabolism, athletic response, and more. Build protocols around your genes."
- Recommended: "Your DNA is the foundation of every protocol. Understand your genetic baseline for caffeine metabolism, sleep chronotype, vitamin absorption, and muscle fiber composition — then optimize accordingly."
- Rationale: "Foundation of every protocol" speaks biohacker language. Specific trait names are more compelling than generic categories.

**Quantified Self Practitioners:**
- Current: "Close the loop. You have data from Oura, Whoop, MyFitnessPal, and Levels. Now add your genetic blueprint. Understand what's genetic vs. what you can change."
- Recommended: "You track with Oura, Whoop, and Levels. Now add the one data layer that never changes — your genetics. Understand what's hardwired vs. what you can optimize."
- Rationale: "One data layer that never changes" is a strong positioning statement. "Hardwired vs. what you can optimize" is more precise than "genetic vs. what you can change."

**23andMe / AncestryDNA Users:**
- Current: "You downloaded your raw file. It's been sitting there. Now it has a purpose. Ask your questions. Get real answers."
- Recommended: "Your raw DNA file is sitting in a downloads folder doing nothing. Upload it here. In 60 seconds, you'll know things about your genetics that 23andMe never told you."
- Rationale: Vivid, relatable opening ("downloads folder doing nothing"). Strong loss-aversion framing. "Things 23andMe never told you" creates specific curiosity and competitive positioning.

---

### 1.9 Testimonials Section (lines 944–1007)

#### Section Heading (lines 956–962)

**Current:**
```
From early users
What people are saying
```

**Issues:** "What people are saying" is generic. The eyebrow "From early users" is fine and honest.

**Recommended:**
```
From our beta testers
What early users discovered
```

**Rationale:** "Beta testers" is more specific and honest than "early users" (given the weak attribution). "What early users discovered" implies outcomes rather than opinions.

---

#### Testimonial Rewrites

**Note:** The UX analysis flagged these testimonials as having weak credibility signals (first-name-only, generic roles, unverifiable sources). The recommended fix is to source real testimonials. If that's not possible yet, the copy below improves specificity.

**Testimonial 1:**
- Current: "Finally, a tool that answers the questions I actually have." — Sarah M., Genetics Enthusiast, Reddit
- Recommended: "I asked about 8 different traits in my first session — caffeine, sleep, bitter taste, lactose. No other tool lets me just type a question and get real research back." — Sarah M., via Reddit
- Rationale: Adds specificity (8 traits, named examples) which increases believability. Removes "Genetics Enthusiast" label which sounds fabricated.

**Testimonial 2:**
- Current: "I've used Promethease and SelfDecode. This is 10x simpler and way more thorough." — James L., Biohacker, Product Hunt
- Recommended: "I ran Promethease on my 23andMe file last year. DNA Trait Analyzer found the same SNPs plus dozens more from GWAS studies that Promethease doesn't cover." — James L., via Product Hunt
- Rationale: Specific comparison with a concrete claim. "Dozens more from GWAS studies" names the mechanism. Still competitive but factual rather than hyperbolic ("10x simpler").

**Testimonial 3:**
- Current: "I asked about a trait I've never seen in any other DNA tool. It gave me citations to the actual research. This is the future." — Maya P., Citizen Scientist, Twitter
- Recommended: "I asked about earwax type — yes, that's genetic. Got back three SNPs with citations to the actual studies. No other tool would even attempt that question." — Maya P., via Twitter
- Rationale: Names the specific (and memorable) trait. "Three SNPs with citations" is concrete proof. "No other tool would even attempt that question" is a powerful competitive claim.

---

### 1.10 Comparison Table (lines 1012–1140)

#### Section Heading (lines 1015–1021)

**Current:**
```
How we compare
DNA Trait Analyzer vs. competitors
```

**Issues:** "How we compare" is fine. "DNA Trait Analyzer vs. competitors" is functional.

**Recommended:**
```
How we compare
Why users switch from Promethease and SelfDecode
```

**Rationale:** Names the competitors directly (builds SEO value) and frames the comparison as a migration story, not a feature checklist.

---

#### Price Row (lines 1107–1118)

**Current:**
```
DNA Trait Analyzer: $0.99/trait or $9.99–$99/mo
Promethease: $5–10 once
SelfDecode: $9.99–$538/mo
```

**Issues:** Our pricing looks more expensive than Promethease and comparable to SelfDecode. This undermines the competitive win.

**Recommended:**
```
DNA Trait Analyzer: Free to start, then $0.99/trait
Promethease: $5–10 once (no free tier)
SelfDecode: $97–$538/year
```

**Rationale:** Leading with "Free to start" anchors on the free tier. Adding "(no free tier)" to Promethease highlights our advantage. Showing SelfDecode's annual price makes the gap dramatic.

---

#### Free Tier Row (lines 1120–1135)

**Current:**
```
DNA Trait Analyzer: 3 free analyses
Promethease: [X]
SelfDecode: [X]
```

**Issues:** Good content. Could be more prominent.

**Recommended:**
```
DNA Trait Analyzer: 3 free analyses — no card required
Promethease: [X]
SelfDecode: [X]
```

**Rationale:** "No card required" removes the last objection. Bold or highlight this row.

---

### 1.11 FAQ Section (lines 1145–1193)

#### Section Heading (lines 1148–1154)

**Current:**
```
FAQ
Common questions
```

**Recommended:** No change. Clean and functional.

---

#### FAQ Copy Rewrites

**Q: "Is this a medical diagnostic tool?"**
- Current: "No. DNA Trait Analyzer is for educational and entertainment purposes. It shows associations between genetics and traits, not diagnoses. Always consult a healthcare provider for medical decisions."
- Recommended: "No. DNA Trait Analyzer is for educational purposes only. We show published genetic associations — not diagnoses or medical advice. For health decisions, consult your doctor."
- Rationale: Removes "entertainment" (undermines scientific credibility). Tighter language.

**Q: "What DNA file formats do you support?"**
- Current: "23andMe, AncestryDNA, MyHeritage, FamilyTreeDNA, and any CSV with RSID, Chromosome, Position, Genotype columns. Upload takes 30 seconds."
- Recommended: "We support raw data exports from 23andMe, AncestryDNA, MyHeritage, and FTDNA. Any standard CSV with RSID, Chromosome, Position, and Genotype columns also works. Upload and parsing take about 30 seconds."
- Rationale: Minor cleanup. "Raw data exports" is more precise than just listing names.

**Q: "How is my privacy protected?"**
- Current answer is good — keep it. It's detailed and specific.
- Recommended: No change.

**Q: "Why should I use this instead of Promethease or SelfDecode?"**
- Current: "Promethease has a fixed database — you can only explore pre-built traits. SelfDecode costs $500+ for annual access. We research ANY trait live using the latest GWAS studies, give you haplotype-aware interpretation, and start at just $0.99 per trait with a free tier included."
- Recommended: "Promethease only shows pre-built results from its fixed database — you can't ask new questions. SelfDecode charges up to $538/year. We research any trait in real time using the latest GWAS and ClinVar data, provide haplotype-aware analysis, and start with 3 free analyses. Per-trait pricing begins at $0.99."
- Rationale: More specific numbers. "You can't ask new questions" is more pointed than "fixed database." Leads with the free tier.

**Q: "Can I ask about complex traits like intelligence or personality?"**
- Current answer is good. Honest, specific, builds trust.
- Recommended: No change.

**Q: "How long does an analysis take?"**
- Current: "Typically 2–5 minutes from upload to results. Most of that is our AI researching GWAS studies and SNPedia. We show progress updates as we go."
- Recommended: "Most analyses complete in under 60 seconds. For complex traits that require more research, it may take 2–3 minutes. You'll see real-time progress updates as the analysis runs."
- Rationale: Leads with the fast case. "Under 60 seconds" is more specific and matches the hero stat.

**Q: "What if a trait isn't in SNPedia?"**
- Current answer is good and honest.
- Recommended: No change.

**Q: "Can I export my results?"**
- Current: "Yes. Results are downloadable as PDF with all citations. You can also share individual analyses on social media."
- Recommended: "Yes. Every analysis can be downloaded as a PDF with full citations and SNP details. You can also share individual results via a public link."
- Rationale: "Full citations and SNP details" is more specific. "Public link" is more accurate than "social media."

---

### 1.12 Pricing Teaser (lines 1198–1231)

**Current:**
```
Start free, upgrade when ready
3 free analyses included. Then $0.99/trait or unlimited from $14.99/mo.
```

**Issues:** Functional but missing urgency and specificity.

**Recommended:**
```
Your first 3 analyses are free
No credit card. No account required. Then $0.99 per trait, or go unlimited from $14.99/mo.
```

**Rationale:** "Your first 3 analyses are free" is ownership-framed and specific. Adding "No credit card. No account required." removes two major objections inline.

---

### 1.13 Upload CTA Section (lines 1236–1271)

**Current:**
```
Heading: Ready to explore your genetics?
Subtext: Upload your raw DNA data and get AI-powered trait insights in minutes.
Footer: Processed securely in memory. Auto-deleted within 1 hour.
```

**Issues:**
- "Ready to explore your genetics?" is a cliché question headline
- "AI-powered trait insights" is generic marketing language
- This is the bottom of a long page — copy needs to be action-driving, not introductory

**Recommended:**
```
Heading: Your DNA file is ready. Are you?
Subtext: Upload your raw data from 23andMe, AncestryDNA, MyHeritage, or FTDNA. Your first 3 analyses are free.
Footer: Your data is processed in memory and auto-deleted within 1 hour. Never stored.
```

**Rationale:** "Your DNA file is ready. Are you?" creates gentle urgency and assumes the user has a file (which they do if they've scrolled this far). Subtext names the providers (reassurance) and restates the free offer. Footer is one clean privacy statement.

---

### 1.14 Mobile Sticky Bar (`src/components/MobileStickyBar.tsx`)

**Current:**
```
Upload DNA — Free | Demo
```

**Issues:** Strong. Action-oriented with price anchor.

**Recommended:**
```
Analyze My DNA — Free | Live Example
```

**Rationale:** "Analyze My DNA" is outcome-focused. "Live Example" is clearer than "Demo" — sets the right expectation.

---

## 2. Pricing Page (`src/app/pricing/page.tsx`)

### 2.1 Page Header (lines 330–341)

**Current:**
```
Pricing
Simple, Transparent Pricing
Unlock the secrets in your DNA. Start free, upgrade when you need more.
```

**Issues:**
- "Unlock the secrets" is banned language (per our tone guidelines — vague, overused)
- "Simple, Transparent Pricing" is a cliché
- No anchoring or competitive context

**Recommended:**
```
Pricing
Start free. Pay only when you want more.
3 trait analyses included at no cost, no credit card required. Upgrade anytime for unlimited access.
```

**Rationale:** Leads with the free offer. "Pay only when you want more" positions upgrades as optional, reducing pressure. Specific ("3 trait analyses, no credit card") beats generic ("simple, transparent").

---

### 2.2 Plan Descriptions

#### Free Plan (lines 36–50)

**Current:**
```
Name: Free
Description: Try it out with a few analyses
Features: 3 trait analyses, All DNA formats supported, Basic SNP matching, Educational disclaimers included
CTA: Get Started
```

**Issues:**
- "Try it out" is dismissive of the product's value
- "Basic SNP matching" implies a lesser experience
- "Educational disclaimers included" is a negative (necessary but shouldn't be a selling point)
- CTA links to "/" (home) instead of /analyze

**Recommended:**
```
Name: Free
Description: Explore your DNA with 3 full analyses
Features:
  - 3 trait analyses — no card required
  - All DNA file formats (23andMe, Ancestry, etc.)
  - Full SNP matching with evidence grading
  - Cited research for every finding
CTA: Start Analyzing — Free
CTA link: /analyze
```

**Rationale:** "3 full analyses" (not "basic" or "try it out"). Features match the paid experience. CTA is action-oriented with price anchor. Link goes to /analyze, not home.

---

#### Per Trait Plan (lines 51–65)

**Current:**
```
Name: Per Trait
Description: Pay only for what you use
Features: 1 trait analysis per purchase, All DNA formats supported, Full SNP matching, ClinVar + GWAS data
CTA: Buy Single Trait
```

**Issues:**
- "1 trait analysis per purchase" is awkward
- "Buy Single Trait" sounds like buying an item, not analyzing DNA
- Description is fine

**Recommended:**
```
Name: Per Trait
Description: Pay per analysis, no commitment
Features:
  - One analysis per purchase
  - All DNA file formats supported
  - Full SNP matching with evidence grading
  - ClinVar + GWAS Catalog data sources
CTA: Analyze One Trait — $0.99
```

**Rationale:** CTA states the price inline so users don't need to scan back. "No commitment" reinforces the flexibility.

---

#### Starter Pack (lines 66–82)

**Current:**
```
Name: Starter
Description: For curious explorers who want more
Features: 20 trait analyses, All DNA formats supported, Enhanced SNP matching, ClinVar + GWAS data, Downloadable reports
CTA: Buy Starter Pack
```

**Issues:**
- "For curious explorers who want more" is vague
- "Enhanced SNP matching" implies the free tier is degraded (it shouldn't)
- Good value prop but not articulated

**Recommended:**
```
Name: Starter Pack
Description: 20 analyses at 50% off per-trait pricing
Features:
  - 20 trait analyses (save $9.81 vs. per-trait)
  - All DNA file formats supported
  - Full SNP matching with evidence grading
  - ClinVar + GWAS Catalog data sources
  - Downloadable PDF reports
CTA: Get 20 Analyses — $9.99
```

**Rationale:** Description quantifies the savings. "$9.81 savings" makes the value concrete. CTA includes quantity and price.

---

#### Monthly Plan (lines 84–102)

**Current:**
```
Name: Monthly
Badge: Most Popular
Description: Unlimited access for ongoing discovery
Features: Unlimited trait analyses, All DNA formats supported, Enhanced SNP matching, ClinVar + GWAS data, Downloadable reports, Priority processing
CTA: Subscribe Monthly
```

**Issues:**
- "Most Popular" has no evidence to support it (UX analysis flag)
- "Enhanced SNP matching" creates a false tier distinction
- "Priority processing" is vague

**Recommended:**
```
Name: Monthly
Badge: Unlimited
Description: Analyze as many traits as you want, every month
Features:
  - Unlimited trait analyses
  - All DNA file formats supported
  - Full SNP matching with evidence grading
  - ClinVar + GWAS Catalog data sources
  - Downloadable PDF reports
  - Faster analysis processing
CTA: Go Unlimited — $14.99/mo
```

**Rationale:** Replace "Most Popular" with "Unlimited" — a factual badge instead of an unsubstantiated claim. "Faster analysis processing" is clearer than "Priority processing." CTA includes the price.

---

#### Annual Plan (lines 103–122)

**Current:**
```
Name: Annual
Badge: Save 45%
Description: Best value for dedicated users
Features: [same as monthly + Early access to new features]
CTA: Subscribe Annually
```

**Issues:**
- "Save 45%" is good but there's no anchoring (no crossed-out price)
- "Best value for dedicated users" is generic
- Users must calculate savings themselves

**Recommended:**
```
Name: Annual
Badge: Best Value — Save 45%
Description: $8.25/mo billed annually (vs. $14.99/mo monthly)
Features:
  - Everything in Monthly
  - Early access to new features
  - Annual billing: $99/year
CTA: Go Unlimited — $99/year
```

**Rationale:** Description shows the monthly-equivalent price with explicit comparison. "$8.25/mo" is the anchor that makes $14.99 feel expensive by contrast. Badge combines "Best Value" with the savings percentage.

---

### 2.3 Pricing FAQ Rewrites

**Q: "Which DNA testing services are supported?"**
- Recommended: No change — clear and complete.

**Q: "Is my DNA data stored?"**
- Current: "Your DNA data is processed securely on the server and automatically deleted after your session ends. We never store your full genome data permanently. Only analysis reports are saved to your account if you choose to keep them."
- Recommended: "Your DNA file is processed in memory and automatically deleted within 1 hour. We never store your raw genetic data. Only your analysis reports are saved — and only if you have an account."
- Rationale: "In memory" and "within 1 hour" are more specific. "Only if you have an account" addresses the "No account required" flow.

**Q: "What counts as one analysis?"**
- Recommended: No change — already clear and simple.

**Q: "Can I upgrade or downgrade my plan?"**
- Recommended: No change — standard and clear.

**Q: "Is this medical advice?"**
- Recommended: Same as landing page FAQ rewrite (remove "entertainment").

**Q: "What data sources power the analysis?"**
- Current: "We use peer-reviewed research from ClinVar, GWAS Catalog, and published genomic studies. Our AI synthesizes findings from multiple sources to provide comprehensive trait analyses."
- Recommended: "Analyses draw from ClinVar (clinical variant database), the GWAS Catalog (genome-wide association studies), and published genomic research. Every finding cites the specific studies it's based on."
- Rationale: Parenthetical explainers help users who don't know what ClinVar or GWAS means. "Every finding cites" adds the differentiator.

---

## 3. Navigation (`src/components/Navbar.tsx`)

### 3.1 Desktop "Get Started" CTA (lines 124–128)

**Current:**
```
Get Started → links to /auth/signup
```

**Issues (critical):** "Get Started" implies starting to use the product, but it goes to a signup page. Users who click expecting to analyze DNA end up on a registration form. Account creation is NOT required to start analyzing.

**Recommended:**
```
Analyze DNA → links to /analyze
```

**Rationale:** Direct, action-oriented, and links to the actual product. Account creation should happen after first value delivery (Fogg Behavior Model: deliver value before asking for commitment).

**Alternative:**
```
Try Free → links to /analyze
```
Shorter, includes the price anchor.

---

### 3.2 Mobile "Get Started" CTA (lines 218–226)

**Current:**
```
Get Started → links to /auth/signup
```

**Recommended:** Same fix — change to "Analyze DNA" linking to /analyze.

---

## 4. Footer (`src/components/Footer.tsx`)

### 4.1 Brand Description (lines 27–30)

**Current:**
```
AI-powered genetic trait analysis backed by published research. For educational purposes only.
```

**Issues:** Functional. Could be slightly warmer.

**Recommended:**
```
Discover what your DNA says about you — powered by AI and published genetics research. For educational purposes only.
```

**Rationale:** Adds "Discover what your DNA says about you" which is more engaging as a brand summary while keeping the factual claims.

---

### 4.2 Trust Signals Column (lines 86–104)

**Current:**
```
Data auto-deleted in 1 hour | ClinVar & GWAS Catalog sources | Peer-reviewed citations
```

**Issues:** "Data auto-deleted in 1 hour" appears here too (5th repetition across the site). The footer is fine for a single privacy mention, but the first trust signal should be value-oriented.

**Recommended:**
```
Evidence-graded results | ClinVar & GWAS Catalog data | Your data is never stored
```

**Rationale:** Leads with a value signal. "Your data is never stored" is a stronger, simpler privacy statement than "Data auto-deleted in 1 hour."

---

## 5. Analyze Page (`src/app/analyze/page.tsx`)

### 5.1 Upload State — No Session (lines 171–199)

**Current:**
```
Get Started
Analyze Your DNA
Upload your raw DNA file to start asking questions about your genetic traits.
Footer: Processed securely in memory. Auto-deleted within 1 hour.
```

**Issues:**
- Generic heading and subtext
- No trust signals or trait previews
- Users arriving here from "Get Started" need reassurance, not just instructions

**Recommended:**
```
Get Started
Analyze Your DNA
Upload your raw data file from 23andMe, AncestryDNA, MyHeritage, or FTDNA. Discover traits like caffeine metabolism, sleep patterns, eye color, and more — backed by published research.
Footer: Your data is processed in memory only. Never stored. Auto-deleted in 1 hour.
```

**Rationale:** Names the providers (compatibility reassurance), lists specific traits (desire building), and adds "backed by published research" (authority). Footer is tightened.

---

### 5.2 Session Active — Heading (lines 276–283)

**Current:**
```
What do you want to discover?
Your DNA is loaded. Ask about any trait — from caffeine metabolism to eye color to sleep patterns.
```

**Issues:** Good. Inviting and specific.

**Recommended:** No change. This copy works well.

---

### 5.3 Privacy Reassurance (lines 290–295)

**Current:**
```
Your DNA data is processed in memory only. Auto-deleted within 1 hour.
```

**Recommended:** No change. Appropriate for this context (reassurance while the session is active).

---

### 5.4 Progress Messages Header (lines 305–307)

**Current:**
```
Analyzing your DNA
```

**Issues:** Good — clear and accurate.

**Recommended:** No change.

---

### 5.5 Error Message (lines 348–357)

**Current:**
```
{error}
Try a different trait or upload your DNA file again.
```

**Issues:** Generic recovery suggestion. Could be more helpful.

**Recommended:**
```
{error}
Try rephrasing your question, or ask about a different trait. If this keeps happening, re-upload your DNA file.
```

**Rationale:** "Rephrasing" is the most likely fix (bad query). Escalation path ("re-upload") is last resort, not first suggestion.

---

### 5.6 Usage Limit Hit (lines 360–378)

**Current:**
```
{error}
Upgrade your plan to continue exploring your genetic traits.
[View Plans →]
```

**Issues (critical — flagged in UX analysis):** At the moment of highest motivation (just hit a wall), users see a generic "upgrade" message with a link to a separate page. No pricing information, no quick options.

**Recommended:**
```
You've used your 3 free analyses — nice exploring!

Keep discovering what your DNA says:

[Analyze one more trait — $0.99]   [Get 20 analyses — $9.99]   [Go unlimited — $14.99/mo]

Or view all plans →
```

**Rationale:** Positive framing ("nice exploring" not "you've hit a limit"). Three inline options at different price points. Users can upgrade in one click without leaving the page. "View all plans" is the fallback for comparison shoppers.

**Note for developer:** This requires inline checkout integration, not just copy changes.

---

### 5.7 Timer Tooltip (line 270)

**Current:**
```
1h (no tooltip/explanation)
```

**Issues:** Users may panic: "Do I lose everything in 1 hour?"

**Recommended tooltip text:**
```
Your DNA data is kept in memory for 1 hour, then automatically deleted for privacy. Re-upload anytime to start a new session.
```

**Rationale:** Explains what happens, why, and how to recover. Reduces anxiety.

---

## 6. Auth Pages

### 6.1 Signup Page (`src/app/auth/signup/page.tsx`, lines 168–177)

**Current:**
```
Get started
Create your account
Begin uncovering what your DNA says about you.
```

**Issues:**
- "Begin uncovering what your DNA says about you" implies signup is required to start. It's not — users can analyze 3 traits without an account.
- No value proposition for WHY to create an account.

**Recommended:**
```
Create an account
Save your reports and track your analyses
Already analyzed a trait? Create an account to save your results, download reports, and access your analysis history.
```

**Rationale:** Explains the value of creating an account (save, download, history). "Already analyzed a trait?" acknowledges users who've already used the product without signing up — which is the ideal flow.

---

### 6.2 Login Page (`src/app/auth/login/page.tsx`, lines 118–128)

**Current:**
```
Welcome back
Sign in to your account
Pick up where you left off with your genetic exploration.
```

**Issues:** "Pick up where you left off with your genetic exploration" is generic.

**Recommended:**
```
Welcome back
Sign in to your account
Access your saved reports and continue analyzing.
```

**Rationale:** Specific value ("saved reports, continue analyzing") instead of vague ("genetic exploration").

---

### 6.3 Signup Success Message (lines 114–121)

**Current:**
```
Check your email
We've sent a confirmation link to {email}. Click the link to activate your account and start exploring.
```

**Issues:** "Start exploring" is vague.

**Recommended:**
```
Check your email
We've sent a confirmation link to {email}. Click the link to activate your account and access your saved analyses.
```

**Rationale:** Ties back to the value proposition of signing up (saved analyses).

---

## 7. Blog Page (`src/app/blog/page.tsx`)

### 7.1 Page Header (lines 61–71)

**Current:**
```
Blog
Research & Guides
Guides and insights on DNA analysis and genetic traits.
```

**Issues:** Good. Clean and functional.

**Recommended:** No change.

---

### 7.2 Blog Post Inline CTAs (NOT currently present)

**Issues (flagged in UX analysis):** Blog posts have zero product CTAs. Users reading "What to Do With Your 23andMe Raw Data" are the exact target audience but are never prompted to try the product.

**Recommended:** Add contextual CTA cards within each blog post. Copy by post:

**"What to Do With Your 23andMe Raw Data in 2026":**
```
[CTA Card]
Ready to analyze your 23andMe data?
Upload your raw file and get evidence-backed trait insights in under 60 seconds. 3 free analyses included.
[Analyze My DNA — Free →]
```

**"Best Promethease Alternative: AI-Powered DNA Analysis":**
```
[CTA Card]
See how DNA Trait Analyzer compares
Upload the same raw file you used with Promethease. Ask about any trait — not just what's in a fixed database.
[Try It Free →]
```

**"Understanding Your MTHFR Gene Variants":**
```
[CTA Card]
Check your MTHFR variants now
Upload your raw DNA file and ask about MTHFR. You'll see your exact genotype, the published research, and what it means.
[Analyze My MTHFR Status — Free →]
```

**Rationale:** Each CTA is contextually matched to the blog post topic. Specific trait mentions (MTHFR, 23andMe data) create immediate desire to act. All include the "free" anchor.

---

## 8. Cross-Cutting Copy Issues

### 8.1 Privacy Over-Indexing

"Auto-deleted in 1 hour" or equivalent appears in:
1. Hero supporting copy
2. Social proof badges
3. How It Works step 1
4. Features section
5. FAQ section
6. Upload CTA footer
7. Footer trust signals
8. Analyze page (multiple locations)

**Recommended reduction:** Maximum 3 mentions across the entire landing page:
1. FAQ (detailed explanation)
2. Upload CTA footer (contextual reassurance at point of action)
3. One inline badge

Remove from: hero supporting copy (replace with value), social proof badges (replace with value), features section (reframe title), footer (reframe).

### 8.2 Inconsistent Timing Claims

- Hero stats: "<60s per analysis"
- How It Works step 1: "30 seconds" (for upload)
- Hero subheadline: "evidence-backed answers in minutes"
- FAQ: "Typically 2–5 minutes from upload to results"

**Recommended standardization:**
- Upload/parsing: "about 30 seconds"
- Simple trait analysis: "under 60 seconds"
- Complex trait analysis: "2–3 minutes"
- Use "under 60 seconds" as the primary marketing claim (covers most cases)

### 8.3 "Enhanced" vs "Basic" vs "Full" SNP Matching

The pricing page implies tiered quality: "Basic SNP matching" (Free) vs "Enhanced SNP matching" (paid). If the analysis quality is the same, this is misleading and undermines the free tier's ability to convert users.

**Recommended:** Use "Full SNP matching with evidence grading" for ALL tiers. Differentiation should be on quantity (number of analyses), not quality.

---

## Appendix: Copy String Quick Reference

For the Visual Designer and Frontend Engineer — ready-to-implement strings:

### Hero
| Element | Copy |
|---------|------|
| Eyebrow | `AI + Published Research` |
| Headline | `Ask Your DNA Anything.` (no change) |
| Subheadline | `Upload your raw DNA file. Ask about any trait. Get evidence-backed answers in under 60 seconds.` |
| Primary CTA | `Analyze My DNA — Free` |
| Secondary CTA | `See a Live Example` |
| Supporting | `3 free analyses included · Results in under 60 seconds · No account required` |
| Example link | `See a sample analysis ↓` |
| Provider strip | `Compatible with: 23andMe · AncestryDNA · MyHeritage · FTDNA` |

### Stats Bar
| Stat | Copy |
|------|------|
| 1 | `609,000+ variants analyzed` |
| 2 | `ClinVar · GWAS Catalog · SNPedia` |
| 3 | `Cited research behind every finding` |
| 4 | `Results in under 60 seconds` |

### Trust Badges
| Badge | Copy |
|-------|------|
| 1 | `Ask about any trait — no limits` |
| 2 | `Backed by peer-reviewed research` |
| 3 | `No account required` |

### Navbar CTA
| Element | Copy | Link |
|---------|------|------|
| Desktop | `Analyze DNA` | `/analyze` |
| Mobile | `Analyze DNA` | `/analyze` |

### Pricing Page Header
| Element | Copy |
|---------|------|
| Label | `Pricing` |
| Heading | `Start free. Pay only when you want more.` |
| Subtext | `3 trait analyses included at no cost, no credit card required. Upgrade anytime for unlimited access.` |

### Pricing CTAs
| Plan | CTA |
|------|-----|
| Free | `Start Analyzing — Free` |
| Per Trait | `Analyze One Trait — $0.99` |
| Starter | `Get 20 Analyses — $9.99` |
| Monthly | `Go Unlimited — $14.99/mo` |
| Annual | `Go Unlimited — $99/year` |

### Upload CTA Section
| Element | Copy |
|---------|------|
| Heading | `Your DNA file is ready. Are you?` |
| Subtext | `Upload your raw data from 23andMe, AncestryDNA, MyHeritage, or FTDNA. Your first 3 analyses are free.` |
| Footer | `Your data is processed in memory and auto-deleted within 1 hour. Never stored.` |

### Mobile Sticky Bar
| Element | Copy |
|---------|------|
| Primary | `Analyze My DNA — Free` |
| Secondary | `Live Example` |

### Footer Trust Column
| Signal | Copy |
|--------|------|
| 1 | `Evidence-graded results` |
| 2 | `ClinVar & GWAS Catalog data` |
| 3 | `Your data is never stored` |
