# DNA Trait Analyzer -- Frontend Design Specification

> Version 2.0 | Codename: **HELIX NOIR**
> Last updated: 2026-03-18
> Status: Ready for implementation

---

## Table of Contents

1. [Aesthetic Direction](#1-aesthetic-direction)
2. [Color Palette](#2-color-palette)
3. [Typography](#3-typography)
4. [Spacing System](#4-spacing-system)
5. [Shadows & Borders](#5-shadows--borders)
6. [Component Specs](#6-component-specs)
7. [Page Layouts](#7-page-layouts)
8. [Animation Strategy](#8-animation-strategy)
9. [Accessibility](#9-accessibility)

---

## 1. Aesthetic Direction

### Name: **Helix Noir**

### Vibe
Dark laboratory at midnight. Think: the UI of a genome sequencing terminal built for a biotech startup that just raised Series B. Cold, precise, deeply scientific -- but with luminous teal-cyan accents that feel like bioluminescence cutting through deep ocean water. NOT a consumer wellness app. NOT a SaaS dashboard. This is a precision instrument dressed in carbon fiber.

### Key Principles
- **Dark-first**: Deep navy-charcoal backgrounds. Light mode is NOT supported -- this is a deliberate aesthetic choice. The dark palette communicates seriousness, privacy, and scientific authority.
- **Bioluminescent accents**: Teal-green (#0FFBF9 to #14B8A6) used sparingly for interactive elements, data visualization, and focal points. It glows against the dark. It does not wash the page.
- **Data-dense but breathable**: Generous whitespace between sections, but within cards and tables, information is packed tight like a research paper.
- **Monospace for data, humanist for narrative**: Two type worlds that reinforce the science/story duality.
- **Subtle motion**: Nothing bounces. Nothing wobbles. Elements fade in, slide up, and pulse gently -- like readings on a medical instrument.

### What This Is NOT
- No purple gradients. No glass morphism. No rounded-everything pill shapes.
- No playful illustrations or cartoon DNA helices.
- No light/bubbly SaaS aesthetic.
- No generic "AI product" look with rainbow gradients.

---

## 2. Color Palette

All colors defined as CSS custom properties. Implementation uses hex values mapped to Tailwind via `@theme`.

### Core Backgrounds

| Variable | Hex | Usage |
|---|---|---|
| `--bg-base` | `#0B0F1A` | Page background -- near-black with blue undertone |
| `--bg-raised` | `#111827` | Raised surfaces, nav bar, footer |
| `--bg-card` | `#151D2E` | Card backgrounds, dropzones |
| `--bg-card-hover` | `#1A2540` | Card hover state |
| `--bg-input` | `#0D1321` | Input field backgrounds |
| `--bg-overlay` | `rgba(11, 15, 26, 0.85)` | Modal/dialog overlays |

### Borders

| Variable | Hex | Usage |
|---|---|---|
| `--border-default` | `#1E293B` | Default card/section borders |
| `--border-subtle` | `#1A2236` | Subtle dividers inside cards |
| `--border-strong` | `#334155` | Emphasized borders, focused inputs |
| `--border-accent` | `#0D9488` | Accent border (teal, used sparingly) |

### Primary Accent (Teal-Cyan Bioluminescence)

| Variable | Hex | Usage |
|---|---|---|
| `--accent-primary` | `#14B8A6` | Primary buttons, links, active states |
| `--accent-primary-hover` | `#0FFBF9` | Hover glow state -- brighter, almost white-teal |
| `--accent-primary-muted` | `#0D9488` | Subdued accent for borders, secondary elements |
| `--accent-primary-ghost` | `rgba(20, 184, 166, 0.08)` | Ghost button background, subtle highlights |
| `--accent-primary-glow` | `rgba(15, 251, 249, 0.15)` | Box-shadow glow on focused/active accent elements |

### Secondary Accent (Amber-Gold for Warnings/Upgrades)

| Variable | Hex | Usage |
|---|---|---|
| `--accent-secondary` | `#F59E0B` | Pricing highlights, upgrade CTAs, "Popular" badge |
| `--accent-secondary-hover` | `#FBBF24` | Hover state for secondary accent |
| `--accent-secondary-muted` | `rgba(245, 158, 11, 0.12)` | Background tint for upgrade prompts |

### Text

| Variable | Hex | Usage |
|---|---|---|
| `--text-primary` | `#F1F5F9` | Primary body text, headings |
| `--text-secondary` | `#94A3B8` | Secondary text, descriptions |
| `--text-tertiary` | `#64748B` | Placeholder text, disabled labels |
| `--text-muted` | `#475569` | Least important text, timestamps |
| `--text-inverse` | `#0B0F1A` | Text on light/accent backgrounds |

### Semantic Colors

| Variable | Hex | Usage |
|---|---|---|
| `--success` | `#10B981` | Strong evidence badge, success alerts |
| `--success-muted` | `rgba(16, 185, 129, 0.12)` | Success badge background |
| `--warning` | `#F59E0B` | Moderate evidence, caution alerts |
| `--warning-muted` | `rgba(245, 158, 11, 0.12)` | Warning badge background |
| `--error` | `#EF4444` | Error states, destructive actions |
| `--error-muted` | `rgba(239, 68, 68, 0.12)` | Error badge/alert background |
| `--info` | `#3B82F6` | Informational badges, tips |
| `--info-muted` | `rgba(59, 130, 246, 0.12)` | Info badge background |

### Confidence Meter Colors (Gradient Stops)

| Confidence Range | Color | Hex |
|---|---|---|
| 0-19% (Very Low) | Red | `#EF4444` |
| 20-39% (Low) | Orange | `#F97316` |
| 40-69% (Moderate) | Amber | `#F59E0B` |
| 70-89% (High) | Teal | `#14B8A6` |
| 90-100% (Very High) | Bright Cyan | `#0FFBF9` |

The confidence meter bar itself uses a gradient from left to right: `linear-gradient(90deg, #EF4444 0%, #F97316 25%, #F59E0B 50%, #14B8A6 75%, #0FFBF9 100%)` -- but only fills to the confidence percentage. The unfilled portion is `--bg-input` (`#0D1321`).

### Chart / Data Visualization Palette

| Variable | Hex |
|---|---|
| `--chart-1` | `#14B8A6` |
| `--chart-2` | `#3B82F6` |
| `--chart-3` | `#8B5CF6` |
| `--chart-4` | `#F59E0B` |
| `--chart-5` | `#EF4444` |

---

## 3. Typography

### Font Stack

| Role | Google Font | Fallback | CSS Variable |
|---|---|---|---|
| **Display** (headings, hero) | **Space Grotesk** | system-ui, sans-serif | `--font-display` |
| **Body** (paragraphs, UI text) | **DM Sans** | system-ui, sans-serif | `--font-body` |
| **Mono** (SNP IDs, genotypes, code) | **JetBrains Mono** | ui-monospace, monospace | `--font-mono` |

### Why These Fonts
- **Space Grotesk**: Geometric sans with personality. Has the technical authority of a monospace but the readability of a sans. Wide letterforms feel modern and distinctive. Nothing like Inter/Roboto.
- **DM Sans**: Slightly warmer geometric sans for body text. Excellent x-height, great at small sizes, optically balanced. Pairs well with Space Grotesk without competing.
- **JetBrains Mono**: Purpose-built for code/data. Excellent ligatures, distinct character shapes (0 vs O, 1 vs l). Perfect for rs-IDs and genotype strings.

### Google Fonts Import

```typescript
// layout.tsx -- Next.js font imports
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
```

### Type Scale

All sizes in `rem` (base 16px).

| Token | Size | Weight | Line Height | Font | Usage |
|---|---|---|---|---|---|
| `display-xl` | `3rem` (48px) | 700 | 1.1 | Space Grotesk | Hero headline only |
| `display-lg` | `2.25rem` (36px) | 700 | 1.15 | Space Grotesk | Page titles |
| `display-md` | `1.75rem` (28px) | 600 | 1.2 | Space Grotesk | Section headings |
| `display-sm` | `1.25rem` (20px) | 600 | 1.3 | Space Grotesk | Card titles, subsection headings |
| `body-lg` | `1.125rem` (18px) | 400 | 1.6 | DM Sans | Lead paragraphs, hero subtitle |
| `body-md` | `1rem` (16px) | 400 | 1.6 | DM Sans | Default body text |
| `body-sm` | `0.875rem` (14px) | 400 | 1.5 | DM Sans | Secondary text, descriptions |
| `body-xs` | `0.75rem` (12px) | 400 | 1.5 | DM Sans | Captions, fine print, disclaimers |
| `mono-md` | `0.875rem` (14px) | 400 | 1.5 | JetBrains Mono | SNP IDs, genotypes in tables |
| `mono-sm` | `0.75rem` (12px) | 400 | 1.4 | JetBrains Mono | Inline code, small data labels |
| `label-md` | `0.875rem` (14px) | 500 | 1.4 | DM Sans | Form labels, nav items |
| `label-sm` | `0.75rem` (12px) | 500 | 1.4 | DM Sans | Badge text, small labels |

### Letter Spacing

| Context | Letter Spacing |
|---|---|
| Display headings (xl, lg) | `-0.02em` |
| Display headings (md, sm) | `-0.01em` |
| Body text | `0` (normal) |
| Mono/data | `0.02em` |
| Uppercase labels (if any) | `0.05em` |

---

## 4. Spacing System

### 8-Point Grid

All spacing values are multiples of 4px, aligned to an 8-point primary grid. Use the following tokens:

| Token | Value | Tailwind |
|---|---|---|
| `space-0` | `0px` | `p-0` / `m-0` |
| `space-1` | `4px` | `p-1` / `m-1` |
| `space-2` | `8px` | `p-2` / `m-2` |
| `space-3` | `12px` | `p-3` / `m-3` |
| `space-4` | `16px` | `p-4` / `m-4` |
| `space-5` | `20px` | `p-5` / `m-5` |
| `space-6` | `24px` | `p-6` / `m-6` |
| `space-8` | `32px` | `p-8` / `m-8` |
| `space-10` | `40px` | `p-10` / `m-10` |
| `space-12` | `48px` | `p-12` / `m-12` |
| `space-16` | `64px` | `p-16` / `m-16` |
| `space-20` | `80px` | `p-20` / `m-20` |
| `space-24` | `96px` | `p-24` / `m-24` |

### Section Padding

| Context | Vertical Padding | Horizontal Padding |
|---|---|---|
| Page sections (hero, features) | `80px` (`py-20`) | `24px` (`px-6`) |
| Between major sections | `64px` (`py-16`) | -- |
| Card internal padding | `24px` (`p-6`) | `24px` (`p-6`) |
| Card header | `24px` top, `16px` bottom | `24px` sides |
| Navbar | `0` | `24px` (`px-6`) |
| Footer | `48px` (`py-12`) | `24px` (`px-6`) |
| Mobile page padding | -- | `16px` (`px-4`) |

### Container Widths

| Context | Max Width | Tailwind |
|---|---|---|
| Default content | `1120px` | `max-w-5xl` |
| Narrow content (forms, results) | `768px` | `max-w-3xl` |
| Wide content (pricing grid) | `1280px` | `max-w-6xl` |
| Full-bleed sections | `100%` | `w-full` |

---

## 5. Shadows & Borders

### Elevation Levels

| Level | Box Shadow | Usage |
|---|---|---|
| `elevation-0` | `none` | Flat elements, inline content |
| `elevation-1` | `0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.15)` | Cards at rest, inputs |
| `elevation-2` | `0 4px 6px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)` | Cards on hover, dropdowns |
| `elevation-3` | `0 10px 15px rgba(0, 0, 0, 0.35), 0 4px 6px rgba(0, 0, 0, 0.2)` | Modals, popovers |
| `elevation-glow` | `0 0 20px rgba(15, 251, 249, 0.15), 0 0 40px rgba(15, 251, 249, 0.05)` | Accent glow on primary CTAs, focused accent elements |

### Border Radius

| Token | Value | Tailwind | Usage |
|---|---|---|---|
| `radius-none` | `0px` | `rounded-none` | Tables, full-width sections |
| `radius-sm` | `4px` | `rounded-sm` | Badges, small chips |
| `radius-md` | `8px` | `rounded-lg` | Buttons, inputs, small cards |
| `radius-lg` | `12px` | `rounded-xl` | Cards, modals, dropzones |
| `radius-xl` | `16px` | `rounded-2xl` | Hero cards, pricing cards |
| `radius-full` | `9999px` | `rounded-full` | Avatars, step indicators, pills |

### Border Width

| Context | Width |
|---|---|
| Default card/section border | `1px` |
| Emphasized/focused border | `2px` |
| Upload dropzone dashed border | `2px dashed` |
| Active/selected card border | `1px` (but color changes to `--border-accent`) |

---

## 6. Component Specs

### 6.1 Navbar

**Structure**: Fixed to top. Full-width with `--bg-raised` (`#111827`). Bottom border `1px solid --border-default`. Backdrop blur: `backdrop-blur-xl`. Height: `64px` (`h-16`).

**Layout**: `max-w-6xl mx-auto`, flex row, space-between. Left: logo + nav links. Right: auth actions.

**Logo**: "DNA Trait Analyzer" in `Space Grotesk`, `font-semibold`, `text-lg` (`1.125rem`). Color: `--text-primary`. On hover: color transitions to `--accent-primary` over `200ms`.

**Nav Links**: `DM Sans`, `label-md` (14px, weight 500). Color: `--text-secondary`. Hover: `--text-primary`. Active page: `--accent-primary` with a `2px` bottom border in `--accent-primary`, offset by `-1px` from the navbar's bottom border (so they overlap to form one line). Transition: `color 200ms ease, border-color 200ms ease`.

**Auth Buttons**:
- "Sign In": Ghost button (see Button spec below)
- "Sign Up": Primary button (see Button spec below)
- When logged in: email in `--text-tertiary`, "My Reports" link, "Sign Out" outline button

**Mobile** (below `md` breakpoint): Hamburger menu icon (Lucide `Menu` icon, `24px`, `--text-secondary`). Tap opens a slide-in panel from right with `--bg-raised` background, width `280px`, `elevation-3` shadow. Links stacked vertically with `16px` vertical gaps. Close button (Lucide `X`) top-right. Overlay: `--bg-overlay`. Transition: `transform 300ms cubic-bezier(0.4, 0, 0.2, 1)`.

**Z-index**: `z-50`.

```
/* Tailwind reference */
nav: fixed top-0 left-0 right-0 z-50 h-16 bg-[#111827]/95 backdrop-blur-xl border-b border-[#1E293B]
container: max-w-6xl mx-auto px-6 flex items-center justify-between h-full
```

---

### 6.2 Footer

**Structure**: Full-width, `--bg-raised` (`#111827`). Top border `1px solid --border-default`. Padding: `48px 24px` (`py-12 px-6`).

**Layout**: `max-w-6xl mx-auto`. Three columns on desktop (`grid-cols-3`), stacked on mobile.

**Column 1 (Brand)**: Logo text in `Space Grotesk` weight 600, `1rem`. Color: `--text-primary`. Below: one-line tagline "AI-Powered Genetic Trait Analysis" in `body-xs`, `--text-tertiary`. Below that: "For educational purposes only -- not medical advice" disclaimer in `body-xs`, `--text-muted`.

**Column 2 (Links)**: Two sub-columns side by side. "Product" heading (Home, Pricing, Blog) and "Legal" heading (Terms, Privacy, Contact). Heading: `label-sm`, `--text-muted`, uppercase, `letter-spacing: 0.05em`, `mb-3`. Link style: `body-sm`, `--text-secondary`. Hover: `--text-primary`. Transition: `150ms`. Vertical gap between links: `8px`.

**Column 3 (Reserved)**: Empty for now. Can display "Stay updated" email input or social links in the future.

**Bottom bar**: Below columns, separated by `1px solid --border-subtle`, `mt-8 pt-6`. Copyright text in `body-xs`, `--text-muted`. Full width flex between copyright and a placeholder for social icons.

---

### 6.3 Buttons

#### Primary Button
- Background: `--accent-primary` (`#14B8A6`)
- Text: `--text-inverse` (`#0B0F1A`), `DM Sans`, weight 600, `body-sm` (14px)
- Border: none
- Radius: `radius-md` (8px)
- Padding: `10px 20px` (`py-2.5 px-5`)
- Shadow: `elevation-1`
- **Hover**: Background shifts to `--accent-primary-hover` (`#0FFBF9`). Shadow becomes `elevation-glow`. Transform: `translateY(-1px)`. Transition: `all 200ms ease`.
- **Active**: `translateY(0)`, shadow back to `elevation-1`.
- **Disabled**: Opacity `0.4`. No hover effects. Cursor: `not-allowed`.
- **Focus-visible**: `2px` outline in `--accent-primary` with `2px` offset. Outline-style: solid.

#### Outline Button
- Background: `transparent`
- Text: `--text-primary` (`#F1F5F9`), `DM Sans`, weight 500
- Border: `1px solid --border-strong` (`#334155`)
- Radius: `radius-md` (8px)
- Padding: same as primary
- **Hover**: Border color `--accent-primary-muted` (`#0D9488`). Background: `--accent-primary-ghost`. Text: `--accent-primary`.
- **Active**: Background: `rgba(20, 184, 166, 0.12)`.

#### Ghost Button
- Background: `transparent`
- Text: `--text-secondary` (`#94A3B8`)
- Border: none
- **Hover**: Background `rgba(241, 245, 249, 0.05)`. Text: `--text-primary`.

#### Destructive Button
- Background: `--error` (`#EF4444`)
- Text: `#FFFFFF`
- **Hover**: Background: `#DC2626`. Shadow: `0 0 15px rgba(239, 68, 68, 0.3)`.

#### Button Sizes

| Size | Padding | Font Size | Height |
|---|---|---|---|
| `sm` | `6px 12px` | `12px` | `32px` |
| `md` (default) | `10px 20px` | `14px` | `40px` |
| `lg` | `12px 28px` | `16px` | `48px` |

---

### 6.4 Cards

**Background**: `--bg-card` (`#151D2E`)
**Border**: `1px solid --border-default` (`#1E293B`)
**Radius**: `radius-lg` (12px)
**Padding**: `24px` (`p-6`)
**Shadow**: `elevation-1`

**Hover state** (for interactive cards like pricing, "How it works"):
- Border: `--border-strong` (`#334155`)
- Shadow: `elevation-2`
- Background: `--bg-card-hover` (`#1A2540`)
- Transform: `translateY(-2px)`
- Transition: `all 250ms cubic-bezier(0.4, 0, 0.2, 1)`

**Highlighted card** (e.g., "Most Popular" pricing):
- Border: `1px solid --accent-primary-muted` (`#0D9488`)
- Faint glow: `0 0 30px rgba(20, 184, 166, 0.08)` on the card itself
- No additional elevation until hover

**Card Header**: Title in `display-sm` (`Space Grotesk`, 20px, weight 600). Description in `body-sm` (`DM Sans`, 14px), `--text-secondary`.

**Card Content**: `body-md` for text. `16px` gap between content blocks.

---

### 6.5 Inputs

**Background**: `--bg-input` (`#0D1321`)
**Border**: `1px solid --border-default` (`#1E293B`)
**Radius**: `radius-md` (8px)
**Text**: `--text-primary`, `DM Sans`, `body-md`
**Placeholder**: `--text-tertiary` (`#64748B`)
**Height**: `44px` (for consistency with buttons)
**Padding**: `12px 16px`

**Focus**:
- Border: `--accent-primary` (`#14B8A6`)
- Box-shadow: `0 0 0 3px rgba(20, 184, 166, 0.15)`
- Transition: `border-color 150ms ease, box-shadow 150ms ease`

**Error state**:
- Border: `--error` (`#EF4444`)
- Box-shadow: `0 0 0 3px rgba(239, 68, 68, 0.12)`

**Disabled**: Opacity `0.5`. Background: `--bg-base`.

---

### 6.6 UploadDropzone

**Container**: Same as Card spec but with `2px dashed` border in `--border-default`. Radius: `radius-lg` (12px). Min-height: `240px`. Background: `--bg-card`.

**Default state**:
- Center-aligned content. DNA helix icon: use Lucide `Dna` icon in `--accent-primary`, `48px` size. Alternatively, a custom minimal double-helix SVG.
- Title: "Drop your DNA file here" in `display-sm` (`Space Grotesk`, 20px, weight 600), `--text-primary`.
- Subtitle: "Supports 23andMe, AncestryDNA, MyHeritage, and FTDNA" in `body-sm`, `--text-secondary`.
- "Browse files" button: Outline button style. `mt-4`.

**Drag-over state**:
- Border color: `--accent-primary` (`#14B8A6`)
- Border style remains dashed
- Background: `--accent-primary-ghost` (`rgba(20, 184, 166, 0.08)`)
- Subtle pulsing glow: `box-shadow: 0 0 30px rgba(20, 184, 166, 0.1)` animating in/out over `1.5s`
- Scale: `1.01` on the inner content via `transform: scale(1.01)`

**Upload in progress**:
- Replace content with centered DNA spinner (see Animation section 8.3)
- Progress text in `body-sm`, `--text-secondary`. Each new status message fades in below the previous.
- Previous messages: `--text-muted`, current message: `--accent-primary`.

**Error state**: Error message in `--error`, `body-sm`, `font-medium`. Appears below the dropzone content with a `fade-in` animation (`300ms`).

```
/* Tailwind reference */
container: relative min-h-[240px] rounded-xl border-2 border-dashed border-[#1E293B] bg-[#151D2E] transition-all duration-300
drag-over: border-[#14B8A6] bg-[rgba(20,184,166,0.08)] shadow-[0_0_30px_rgba(20,184,166,0.1)]
```

---

### 6.7 TraitInput

**Layout**: Flex row with `12px` gap. Input takes `flex-1`, button is fixed width.

**Input**: Standard input spec (6.5) but with increased height `48px` for prominence. Placeholder: "Type any trait -- caffeine metabolism, eye color, sleep..." in `--text-tertiary`. Font: `DM Sans`, `body-md`.

**Submit button**: Primary button, `lg` size (48px height to match input). Text "Analyze". When analyzing: text changes to "Analyzing..." with a subtle inline spinner (12px circle, spinning, `--text-inverse`). Button enters disabled state.

**Trait suggestion chips**: Below the input row, `8px` gap between chips. Each chip:
- Background: `--accent-primary-ghost` (`rgba(20, 184, 166, 0.08)`)
- Border: `1px solid --border-default` (`#1E293B`)
- Text: `--accent-primary` (`#14B8A6`), `label-sm` (12px, weight 500)
- Radius: `radius-full` (pill shape, `9999px`)
- Padding: `4px 12px`
- Height: `28px`
- **Hover**: Background `rgba(20, 184, 166, 0.15)`. Border: `--accent-primary-muted`. Cursor: `pointer`. Transition `150ms`.
- **Active (mousedown)**: `transform: scale(0.95)`. Transition `100ms`.

**"Try:" label**: `body-sm`, `--text-muted`, displayed inline before chips. `mr-2`.

---

### 6.8 ResultsCard

**Outer wrapper**: `space-y-6` between sub-sections.

**Main card**: Standard card spec (6.4). Internal `space-y-6`. `p-6`.

**Card header**:
- Trait name: `display-md` (`Space Grotesk`, 28px, weight 600), `--text-primary`, `capitalize`.
- Print button: Ghost button with Lucide `Printer` icon (`18px`), positioned absolute top-right of header.
- Summary: `body-md`, `--text-secondary`, `leading-relaxed`. `mt-2`.

**ConfidenceMeter**: See 6.9 below. Placed directly after summary.

**"Your Genetic Profile" section**:
- Section label: `display-sm` (`Space Grotesk`, 20px, weight 600), `--text-primary`. `mb-3`.
- Contains the SnpTable (see 6.10).

**"Detailed Analysis" section**:
- Section label: same as above.
- Analysis text: `body-sm`, `--text-secondary`, `leading-relaxed`, `whitespace-pre-line`. Wrapped in a container with `--bg-input` background, `1px solid --border-subtle` border, `16px` padding, `radius-md`.

**"Research Sources" section**:
- Section label: same.
- Each source: `body-sm`, `--text-secondary`. Bullet character in `--text-muted`. Vertical gap `6px` between items. Left padding `16px` for bullet alignment.

**Disclaimer alert**:
- Background: `--warning-muted` (`rgba(245, 158, 11, 0.12)`)
- Border: `1px solid rgba(245, 158, 11, 0.25)`
- Border-left: `3px solid --warning` (`#F59E0B`) -- overrides left border
- Radius: `0` on left, `radius-md` (8px) on right (`rounded-r-lg`)
- Padding: `16px`
- Title "Important: For Educational Purposes Only": `label-md`, `--warning` (`#F59E0B`), weight 600
- Body text: `body-xs`, `--text-secondary`, `leading-relaxed`

**Action links below card**: `body-sm`, `--accent-primary`. Hover: underline. Separated by `16px` (`space-x-4`). Center-aligned. Hidden in print.

---

### 6.9 ConfidenceMeter

**Layout**: `space-y-3`.

**Header row**: Flex, space-between, `items-center`.
- Left: "Analysis Confidence" in `label-md` (`DM Sans`, 14px, weight 500), `--text-primary`.
- Right: Label text + percentage. The label (e.g., "High confidence") uses the corresponding confidence color from the table below. Percentage in parentheses after label. `label-md`, weight 600.

**Progress bar**:
- Track: `--bg-input` (`#0D1321`), height `10px`, `radius-full`.
- Fill: Uses the full-spectrum gradient `linear-gradient(90deg, #EF4444, #F97316, #F59E0B, #14B8A6, #0FFBF9)` as background, clipped to width matching the confidence percentage.
- The fill animates from `width: 0%` to the target width over `800ms` with `cubic-bezier(0.4, 0, 0.2, 1)` easing on mount.
- At the leading edge of the fill: a `4px` diameter bright circle in the current confidence range color, with `box-shadow: 0 0 8px [current-color]`. This dot sits at the end of the filled portion.

**Color mapping for the label text**:

| Range | Color Variable | Hex | Label |
|---|---|---|---|
| 0-19 | `--confidence-very-low` | `#EF4444` | Very low confidence |
| 20-39 | `--confidence-low` | `#F97316` | Low confidence |
| 40-69 | `--confidence-moderate` | `#F59E0B` | Moderate confidence |
| 70-89 | `--confidence-high` | `#14B8A6` | High confidence |
| 90-100 | `--confidence-very-high` | `#0FFBF9` | Very high confidence |

**Sub-text**: `body-xs`, `--text-muted`. "Based on number of SNPs found, quality of research evidence, and coverage in your DNA data." `mt-1`.

---

### 6.10 SnpTable

**Desktop view** (above `md` breakpoint):

**Table container**: `overflow-x-auto`, `radius-lg` (12px), `1px solid --border-default` border.

**Table header row**:
- Background: `--bg-raised` (`#111827`)
- Text: `label-sm` (12px, weight 500), `--text-muted`, uppercase, `letter-spacing: 0.05em`
- Row height: `40px`
- Bottom border: `1px solid --border-default`
- Padding per cell: `8px 16px`

**Table body rows**:
- Odd rows background: `--bg-card` (`#151D2E`)
- Even rows background: `--bg-card-hover` (`#1A2540`) -- subtle zebra striping
- Hover (any row): background `#1E2D48`, transition `150ms`
- Row height: `48px`
- Border-bottom per row: `1px solid --border-subtle`
- Cell padding: `8px 16px`

**Cell text styles**:
- SNP ID (`rsid`): `JetBrains Mono`, `mono-md` (14px), `--accent-primary` (`#14B8A6`)
- Gene: `DM Sans`, `body-sm` (14px), weight 500, `--text-primary`
- Genotype: `JetBrains Mono`, `mono-md`, `--text-primary`
- Risk Allele: `JetBrains Mono`, `mono-md`, `--text-secondary`
- Effect Size: `body-sm`, `--text-secondary`, max-width `200px` with text ellipsis

**Status badge** ("Present" / "Not present"):
- Present: Background `--success-muted` (`rgba(16, 185, 129, 0.12)`), text `--success` (`#10B981`), border `rgba(16, 185, 129, 0.25)`. Radius: `radius-sm` (4px). Padding: `2px 8px`. Font: `label-sm`.
- Not present: Background `rgba(100, 116, 139, 0.12)`, text `--text-tertiary` (`#64748B`), border `--border-default`. Same radius/padding/font.

**Evidence badges**:
- Strong: Background `--success-muted`, text `--success`, border `rgba(16, 185, 129, 0.25)`
- Moderate: Background `--warning-muted`, text `--warning`, border `rgba(245, 158, 11, 0.25)`
- Preliminary: Background `rgba(249, 115, 22, 0.12)`, text `#F97316`, border `rgba(249, 115, 22, 0.25)`
- All: Radius `radius-sm` (4px), padding `2px 8px`, font `label-sm` (12px, weight 500)

**Mobile card view** (below `md`):
- Each SNP rendered as a mini card: `--bg-card` background, `1px solid --border-default` border, `radius-md` (8px), `16px` padding.
- Top row: rsid (in `--accent-primary`, `mono-md`) left-aligned, status badge right-aligned.
- Grid below: `grid-cols-2`, `gap-x-4 gap-y-1`. Label column: `body-sm`, `--text-muted`. Value column: appropriate font (mono for genotype/allele, body for gene/evidence).
- Effect size: below grid, separated by `1px solid --border-subtle` top border, `pt-2 mt-2`, `body-xs`, `--text-muted`.
- `12px` gap between mobile cards.

---

### 6.11 ConsentGate

**Container**: Standard card spec but with `2px solid --border-strong` border (heavier than default). `radius-xl` (16px). `p-8`.

**Header**: "Before You Upload" in `display-sm` (`Space Grotesk`, 20px, weight 600), `--text-primary`. Optional: Lucide `ShieldCheck` icon (`20px`, `--accent-primary`) inline before the text.

**Intro text**: `body-sm`, `--text-secondary`. `mt-2 mb-6`.

**Checkboxes**: Custom-styled checkboxes.
- Unchecked: `18px` square, `--bg-input` background, `1px solid --border-strong` border, `radius-sm` (4px).
- Checked: Background `--accent-primary` (`#14B8A6`), white (`#FFFFFF`) checkmark SVG inside. Border: `--accent-primary`.
- Transition: `background 150ms ease, border-color 150ms ease`.
- The checkmark SVG animates in with a stroke-dashoffset draw effect over `200ms`.
- Vertical gap between checkbox rows: `16px`.
- Label text: `body-sm`, `--text-secondary`. `<strong>` parts: `--text-primary`, weight 600.
- Hover on entire row: label text shifts to `--text-primary`. Transition `150ms`. Cursor: `pointer`.

**Links** (Terms, Privacy): `--accent-primary`, `underline`, `underline-offset-2`. Hover: `--accent-primary-hover` (`#0FFBF9`).

**CTA button**: Primary button, `lg` size, full width (`w-full`). Text: "I Agree -- Continue to Upload". Disabled until all four checkboxes are checked (standard disabled state: opacity `0.4`). `mt-6`.

---

### 6.12 CookieConsent

**Position**: Fixed bottom, full width. `z-50`.

**Background**: `--bg-raised` (`#111827`) with `backdrop-blur-xl`. Top border: `1px solid --border-default`.

**Layout**: `max-w-6xl mx-auto`, flex row on desktop (stacked `flex-col` on mobile below `sm`). Padding: `16px 24px` (`py-4 px-6`). `items-center` on desktop, `items-start` on mobile.

**Text**: `body-sm`, `--text-secondary`. Link to privacy policy: `--accent-primary`, `underline`, `underline-offset-2`. `flex-1`.

**Buttons**: Gap between text and buttons: `16px`. "Decline" (outline button, `sm` size), "Accept" (primary button, `sm` size). `8px` gap between the two buttons. `shrink-0`.

**Mount animation**: Slides up from bottom on page load. `transform: translateY(100%)` to `translateY(0)` over `400ms` with `cubic-bezier(0.4, 0, 0.2, 1)`.

**Dismiss animation**: Slides back down `translateY(100%)` over `300ms`, then unmounts from DOM.

---

## 7. Page Layouts

### 7.1 Homepage

**Structure**: Full-page vertical scroll. No sidebar. Centered content. Navbar fixed at top (adds `64px` top padding to body or first section to compensate).

#### Hero Section (above the fold)

- Full viewport height minus navbar: `min-h-[calc(100vh-64px)]`, flex column, center content vertically and horizontally.
- **Background**: `--bg-base` with animated particle field behind content (see Animation section 8.4). Particles are `z-0`, content is `z-10`, position relative.
- **Headline**: "Decode Your DNA" in `display-xl` (48px), `Space Grotesk`, weight 700, `--text-primary`. Letter-spacing `-0.02em`. Center-aligned.
- **Subheadline**: `mt-4`. `body-lg` (18px), `--text-secondary`, max-width `560px`, center-aligned. "Upload your raw DNA data and discover what your genes say about any trait -- powered by AI research."
- **Provider badges row**: `mt-6`. Horizontal flex, centered, `8px` gap, `flex-wrap`. Each badge: `radius-full` (pill), `--bg-card` background, `1px solid --border-default`, `body-xs`, `--text-secondary`, padding `6px 14px`.
- **Upload area**: `mt-8`. Full width of `max-w-xl`. Contains ConsentGate wrapping UploadDropzone.
- **Privacy notice**: `mt-6`. `body-xs`, `--text-muted`, centered, `max-w-md mx-auto`.
- **Scroll indicator**: At very bottom of hero section, centered. Lucide `ChevronDown` icon, `24px`, `--text-muted`. Animated with gentle bounce: `translateY(0)` to `translateY(6px)` over `2s`, `ease-in-out`, infinite, alternate. Hidden on mobile via `hidden md:block`.

#### "How It Works" Section

- `py-20`, `--bg-base` background.
- Section heading: `display-md` (`Space Grotesk`, 28px, weight 600), centered, `--text-primary`.
- Below heading: decorative horizontal rule, `48px` wide, `2px` thick, `--accent-primary`, centered, `mt-3 mb-10`.
- Three-column grid: `md:grid-cols-3`, `grid-cols-1`, `gap-6`. `max-w-4xl mx-auto`.
- Each step card: Standard card spec (6.4) with hover effect.
  - Step number: `40px` circle, `--accent-primary` background, `--text-inverse` text, `Space Grotesk` weight 700, `display-sm` (20px). `mx-auto`.
  - Title: `display-sm`, `--text-primary`, centered. `mt-4`.
  - Description: `body-sm`, `--text-secondary`, centered, `leading-relaxed`. `mt-2`.
- **Staggered reveal**: Cards animate in one by one with `150ms` stagger delay (see Animation section 8.1).

#### "Sample Analysis" Section

- `py-20`. Full-width background band in `--bg-raised` (`#111827`) to break visual monotony.
- Section heading: `display-md`, centered, `--text-primary`.
- Decorative rule below (same as How It Works).
- Single card: `max-w-3xl mx-auto`. Standard card spec.
  - Trait title: `display-sm`, `--text-primary`.
  - Subtitle: `body-sm`, `--text-secondary`. `mt-1`.
  - Three stat boxes in a horizontal row: `grid grid-cols-3 gap-3 mt-4`. Each box: `--bg-input` background, `radius-md`, `16px` padding, centered text. Label: `body-xs`, `--text-muted`, `mb-1`. Value: `display-md` (28px), `--accent-primary`, `Space Grotesk` weight 700.
  - Sample analysis text: `mt-4`. Inside a bordered container (`1px solid --border-subtle`, `radius-md`, `16px` padding). `body-sm`, `--text-secondary`, italic.
  - Disclaimer footnote: `mt-3`. `body-xs`, `--text-muted`, italic, centered.

#### "Trust" Section

- `py-20`, back to `--bg-base`.
- No heading -- let the badges speak.
- Three-column grid: `md:grid-cols-3`, `grid-cols-1`, `gap-6`. `max-w-3xl mx-auto`.
- Each item: No card wrapper. Centered text block.
  - Icon: Lucide icon in `--accent-primary`, `32px`. Suggestions: `ShieldCheck` (Never Stored), `GraduationCap` (Educational), `FlaskConical` (AI Research). `mx-auto`.
  - Title: `label-md`, `--text-primary`, weight 600. `mt-3`.
  - Description: `body-xs`, `--text-secondary`, `leading-relaxed`. `mt-1`.

---

### 7.2 Analyze Page

**Background**: `--bg-base`. Padding-top: `64px` for fixed navbar.

**Layout**: `max-w-3xl mx-auto`, `py-12 px-6`.

**Header area**: Flex row, `justify-between`, `items-start`. `mb-8`.
- Left column:
  - "Analyze Your DNA" in `display-lg` (`Space Grotesk`, 36px, weight 700), `--text-primary`.
  - "Ask about any trait to see what your genes say" in `body-sm`, `--text-secondary`. `mt-1`.
- Right: SNP count badge. `radius-full`, `--accent-primary-ghost` background, `1px solid --accent-primary-muted` border. Padding `6px 14px`. Number in `mono-sm` (`JetBrains Mono`, 12px), `--accent-primary`. "SNPs loaded" in `label-sm`, `--text-secondary`. `ml-1`.

**TraitInput**: Full width, per component spec 6.7. `mb-6`.

**Progress state** (while analyzing):
- Standard card (6.4). Center-aligned content. `py-8`.
- DNA spinner (see Animation section 8.3): centered, `40px`, `--accent-primary`.
- Progress messages stack vertically below spinner, `mt-4`. Each new message slides in from below with fade (`300ms`). Current message: `--accent-primary`, `body-sm`. Previous messages: `--text-muted`, `body-sm`, with checkmark prefix. Vertical gap `6px`.

**Error state**: Card with special styling:
- Standard error: `--error-muted` background, `1px solid rgba(239, 68, 68, 0.25)` border, `3px solid --error` left border. Error text: `body-sm`, `--error`. Padding `16px`.
- Usage limit error: Same structure but uses `--accent-secondary` (`#F59E0B`) for left border and `--accent-secondary-muted` background. Error text in `--text-primary`. Includes "View Plans" primary button below text, `mt-3`.

**Results**: ResultsCard component per spec 6.8. Animates in with `fade-up` animation: `opacity: 0, translateY(20px)` to `opacity: 1, translateY(0)` over `500ms`.

---

### 7.3 Pricing Page

**Background**: `--bg-base`. Padding-top: `64px`.

**Layout**: `max-w-6xl mx-auto`, `py-20 px-6`.

**Header**:
- "Simple, Transparent Pricing" in `display-lg`, centered.
- Subtitle: `body-lg`, `--text-secondary`, centered, `max-w-lg mx-auto`. `mt-3`.
- Decorative rule: `48px` wide, `2px`, `--accent-primary`, centered, `mt-4`.

**Success/Cancel alerts**: `max-w-3xl mx-auto`, `mt-8`.
- Success: Background `--success-muted`, border `1px solid rgba(16, 185, 129, 0.25)`, left border `3px solid --success`, `radius-md` right side. Text `body-sm`, `--text-primary`.
- Cancel: Background `rgba(100, 116, 139, 0.08)`, border `1px solid --border-default`. Text `body-sm`, `--text-secondary`.

**Pricing grid**: `mt-12`. `lg:grid-cols-4`, `md:grid-cols-2`, `grid-cols-1`. `gap-6`.

**Each pricing card**: Card spec (6.4) with `radius-xl` (16px). `position: relative` for badge positioning.

**Card internal structure**:
- **Badge** (if present, "Most Popular" / "Save 45%"): `position: absolute`, `top: -12px`, `right: 16px`. Background: `--accent-secondary` (`#F59E0B`) for "Most Popular", `--accent-primary` for "Save 45%". Text: `--text-inverse`, `label-sm`, weight 600. Radius: `radius-full`. Padding: `4px 12px`.
- **Plan name**: `display-sm`, `--text-primary`. `pt-2`.
- **Description**: `body-sm`, `--text-secondary`. `mt-1`.
- **Price block**: `mt-4`. Dollar amount: `display-xl` (48px, or at least `2.5rem`), `--text-primary`, `Space Grotesk` weight 700. Period text: `body-sm`, `--text-muted`, inline after price.
- **Features list**: `mt-4`. `space-y-2`. Each feature: `body-sm`, `--text-secondary`. Checkmark prefix: `--accent-primary` for paid plans, `--text-muted` for free plan. Checkmark character or Lucide `Check` icon, `14px`.
- **CTA button**: `mt-6`. Full-width. "Most Popular" card: Primary button. All other paid: Outline button. Free: Ghost button.

**Highlighted card** (Most Popular):
- Border: `1px solid --accent-primary-muted` (`#0D9488`)
- Background has subtle top-gradient: `linear-gradient(180deg, rgba(20, 184, 166, 0.04) 0%, transparent 40%)`
- Box-shadow: `elevation-glow`
- On hover: border brightens to `--accent-primary`, glow intensifies

**"Manage subscription" link**: Below grid, centered, `mt-6`. `body-sm`, `--text-secondary`, underline on hover. Transition `150ms`.

**FAQ Section**: `mt-20`.
- Heading: `display-md`, centered.
- Decorative rule below.
- Two-column grid: `md:grid-cols-2`, `grid-cols-1`, `gap-x-8 gap-y-6`. `max-w-4xl mx-auto`. `mt-10`.
- Each FAQ: No accordion -- all visible for scannability.
  - Question: `label-md` (14px), weight 600, `--text-primary`.
  - Answer: `body-sm`, `--text-secondary`, `leading-relaxed`. `mt-2`.

---

### 7.4 Auth Pages (Login / Signup)

**Background**: `--bg-base`. Full viewport height.

**Layout**: `min-h-screen`, flex column, center both axes. Padding `24px`.

**Card**: `max-w-md w-full`. Background `--bg-card`, `1px solid --border-default`, `elevation-2`, `radius-xl` (16px), `p-8`.

**Header section**:
- Title: "Sign In" / "Create Account" in `display-md` (`Space Grotesk`, 28px, weight 600), centered, `--text-primary`.
- Subtitle: "Welcome back" / "Start exploring your DNA" in `body-sm`, `--text-secondary`, centered. `mt-2`.

**Google OAuth button** (NEW -- add this to both login and signup):
- Full-width, `48px` height.
- Background: `#FFFFFF`.
- Text: `#1F1F1F`, `DM Sans`, weight 500, `body-md`. "Continue with Google".
- Google "G" logo: official multi-color SVG, `20px`, positioned left of text with `12px` gap.
- Border: `1px solid #DADCE0`.
- Radius: `radius-md` (8px).
- **Hover**: Background `#F7F8F8`. Shadow: `elevation-1`. Transition `150ms`.
- **Active**: Background `#E8E8E8`.
- `mt-6`.

**Divider**: `my-6`. Horizontal rule with centered text overlay.
- Rule: `1px solid --border-default`, full width.
- Text: "or continue with email" in `body-xs`, `--text-muted`. Background: `--bg-card` (to visually "sit on top" of the line). Padding `0 12px`.
- Implementation: flex row with `items-center`. Two `flex-1 h-px bg-[--border-default]` dividers flanking the text.

**Form fields**: Standard input spec (6.5). Labels: `label-md` (`DM Sans`, 14px, weight 500), `--text-primary`, `mb-2` above each input. Vertical gap between form groups: `16px`.

**Submit button**: Primary, `lg`, full-width. `mt-6`.

**Error text**: `body-sm`, `--error`. `mt-4` below submit button. If present, text appears with `fade-in` animation.

**Switch link**: `mt-6`. "Don't have an account? Sign up" / "Already have an account? Sign in". `body-sm`, `--text-secondary`, centered. Link portion: `--accent-primary`, hover: underline.

**Mount animation**: Card fades in and slides up `16px` on mount. `opacity: 0, translateY(16px)` to `opacity: 1, translateY(0)`. Duration `400ms`, `cubic-bezier(0.4, 0, 0.2, 1)`.

---

### 7.5 Reports List Page

**Background**: `--bg-base`. Padding-top: `64px`.

**Layout**: `max-w-4xl mx-auto`, `py-12 px-6`.

**Header**: "My Reports" in `display-lg`. Below: `body-sm`, `--text-secondary`, "Your saved trait analyses." `mt-1`.

**Empty state**: `py-20`, centered.
- Lucide `FileSearch` or `Dna` icon, `64px`, `--text-muted`. `mx-auto`.
- "No reports yet" in `display-sm`, `--text-secondary`. `mt-4`.
- "Analyze a trait to get started" in `body-sm`, `--text-muted`. `mt-2`.
- Primary CTA button "Start Analysis", links to `/`. `mt-6`.

**Reports grid**: `mt-8`. `grid-cols-1 md:grid-cols-2`, `gap-4`. Each report is a clickable card (anchor wrapping card, standard card with hover per 6.4).

**Each report card**:
- Flex row, `items-center`, `gap-4`.
- Left content (grows):
  - Trait name: `display-sm`, `--text-primary`, `capitalize`.
  - Date: `body-xs`, `--text-muted`, `JetBrains Mono`. `mt-1`.
  - Inline metadata row: `mt-2`, flex, `gap-4`.
    - Confidence: `8px` circle (filled, colored per confidence range) + `label-sm` percentage + `label-sm` label text in the confidence color. Example: [teal dot] 72% High.
    - SNP count: `mono-sm`, `--text-secondary`. e.g., "3 SNPs".
- Right: Lucide `ChevronRight` icon, `20px`, `--text-muted`.
- **Hover**: Standard card hover + arrow icon shifts `4px` right via `transform: translateX(4px)`, color changes to `--text-primary`. Transition `200ms`.

**Stagger animation**: Cards appear one by one on page load, `100ms` stagger delay between each. `fade-up` animation.

---

### 7.6 Report Detail Page

**Background**: `--bg-base`. Padding-top: `64px`.

**Layout**: `max-w-3xl mx-auto`, `py-12 px-6`.

**Back link**: Top of page. Ghost button with Lucide `ArrowLeft` icon (`16px`) + "Back to Reports" text. `body-sm`, `--text-secondary`. Hover: `--text-primary`. `mb-6`.

**Header area**:
- Trait name: `display-lg`, `--text-primary`, `capitalize`.
- Metadata row: `mt-3`. Flex row, `gap-4`, `items-center`.
  - Date: `body-xs`, `--text-muted`, `JetBrains Mono`.
  - Share button: Outline button, `sm` size, Lucide `Share2` icon + "Share". On click: generates share link, copies to clipboard, shows a brief toast "Link copied!" (see below).
  - Print button: Ghost button, `sm` size, Lucide `Printer` icon.
  - Delete button: Ghost button, `sm` size, Lucide `Trash2` icon, `--error` color on hover.

**Toast** (for "Link copied"): Fixed, `bottom-6 right-6`. `--bg-card` background, `1px solid --border-default`, `elevation-2`, `radius-md`. Text: `body-sm`, `--text-primary`. `px-4 py-3`. Appears with `fade-up` animation, auto-dismisses after `3s` with fade-out.

**Report content**: Full ResultsCard component (6.8). Animates in with `fade-up`.

---

### 7.7 Shared Report Page

**Background**: `--bg-base`. Padding-top: `64px`.

**Layout**: `max-w-3xl mx-auto`, `py-12 px-6`.

**Top info banner**: `--info-muted` background (`rgba(59, 130, 246, 0.12)`). Border: `1px solid rgba(59, 130, 246, 0.2)`. Radius `radius-md`. Padding `12px 16px`. Flex row, `items-center`, `justify-between`.
- Left: Lucide `Info` icon (`16px`, `--info`) + text: "This report was shared with you." `body-sm`, `--text-secondary`. `ml-2`.
- Right: "Sign Up Free" -- small primary button, links to `/auth/signup`.

**Report content**: Same as ResultsCard but print/share action links are hidden. Read-only view. `mt-6`.

**Bottom CTA card**: `mt-10`. Standard card, centered content, `py-8`.
- "Want your own analysis?" in `display-sm`, `--text-primary`, centered.
- "Upload your DNA data and discover your traits" in `body-sm`, `--text-secondary`, centered. `mt-2`.
- Primary button, `lg` size: "Upload Your DNA". Links to `/`. `mt-4`.

---

### 7.8 Blog Pages

#### Blog Index (`/blog`)

**Layout**: `max-w-4xl mx-auto`, `py-12 px-6`. Padding-top: `64px` for navbar.

**Header**: "Blog" in `display-lg`. "Research, guides, and updates about genetic analysis" in `body-lg`, `--text-secondary`. `mt-2`.

**Post list**: `mt-10`. `space-y-6`. Each post is a clickable card (anchor wrapping).

**Post card** (horizontal on desktop, stacked on mobile):
- `flex flex-col md:flex-row`, `gap-4`. Standard card spec with hover.
- Left (on desktop) / Top (on mobile): Reserved for future post image. For now, a colored gradient placeholder block: `200px` wide (desktop) or `full-width, h-40` (mobile), `radius-md`. Gradient: subtle from `--bg-card` to `--bg-card-hover`.
- Right content:
  - Title: `display-sm`, `--text-primary`. Hover: `--accent-primary`. Transition `150ms`.
  - Excerpt: `body-sm`, `--text-secondary`, 2-line clamp (`line-clamp-2`). `mt-2`.
  - Meta row: `mt-3`. Date in `body-xs`, `--text-muted`. Read time in `body-xs`, `--text-muted`. Separated by a `4px` dot in `--text-muted`.
  - "Read more" link: `label-sm`, `--accent-primary`. Lucide `ArrowRight` icon (`14px`) inline after text. Icon shifts `4px` right on card hover.

#### Blog Post (individual)

**Layout**: `max-w-3xl mx-auto`, `py-12 px-6`.

**Back link**: "Back to Blog" ghost button with Lucide `ArrowLeft`. `mb-6`.

**Title**: `display-lg`, `--text-primary`.

**Meta row**: `mt-3`. Date, read time, author. `body-xs`, `--text-muted`. Separated by dots.

**Article body**: `mt-8`. Prose styling:
- Body text: `body-md`, `--text-secondary`, `leading-relaxed`.
- Line length: ~65 characters optimal. The `max-w-3xl` container handles this.
- `h2` headings: `display-md`, `--text-primary`, `mt-10 mb-4`.
- `h3` headings: `display-sm`, `--text-primary`, `mt-8 mb-3`.
- Links: `--accent-primary`, underline.
- Code inline: `JetBrains Mono`, `mono-sm`, `--accent-primary`, `--bg-input` background, `radius-sm`, padding `2px 6px`.
- Code blocks: `JetBrains Mono`, `--bg-input` background, `1px solid --border-default`, `radius-md`, `16px` padding, `overflow-x-auto`.
- Lists: `body-sm`, `--text-secondary`. Bullet/number in `--text-muted`. `space-y-2`. Left padding `24px`.
- Blockquotes: `border-l-3 border-[--accent-primary]`, `pl-4`, `body-md`, `--text-secondary`, italic.

---

### 7.9 Legal Pages (Terms, Privacy)

**Layout**: `max-w-3xl mx-auto`, `py-12 px-6`. Padding-top: `64px`.

**Title**: `display-lg`, `--text-primary`.

**Last updated**: `body-xs`, `--text-muted`, below title. `mt-2`.

**Content**: `mt-8`. Prose styling similar to blog posts:
- `body-md`, `--text-secondary`, `leading-relaxed`.
- Section headings (`h2`): `display-sm`, `--text-primary`, `mt-8 mb-4`.
- Lists: `body-sm`, `--text-secondary`, standard bullet styling.
- Links: `--accent-primary`, underline.
- Paragraphs: `mb-4` between them.

---

### 7.10 404 Page

**Background**: `--bg-base`.

**Layout**: Full viewport height (`min-h-screen`), flex, center both axes.

**Content** (all centered):
- "404" in massive type: `8rem` (128px), `Space Grotesk`, weight 700, `--border-strong` (`#334155`) -- intentionally very faded. Letter-spacing `-0.04em`.
- "Page Not Found" in `display-md`, `--text-primary`, below the 404. `mt-2`.
- Description: `body-md`, `--text-secondary`, `max-w-md`, centered. "The page you're looking for doesn't exist or has been moved." `mt-3`.
- "Back to Home" primary button, `lg` size. `mt-8`.

**Background element**: A faint, slowly rotating double-helix SVG positioned behind the 404 text. Absolute positioned, centered, `400px` tall. Color: `--accent-primary` at `opacity: 0.03`. Rotation animation: `60s` full revolution, `linear`, `infinite`. `z-0`. Content at `z-10`.

---

## 8. Animation Strategy

All animations respect `prefers-reduced-motion`. When reduced motion is preferred, all animations resolve instantly (see section 9.3).

### 8.1 Page Load / Scroll Reveal

**Technique**: Intersection Observer-based. Elements start invisible (`opacity: 0`) and animate in when they enter the viewport (threshold: `0.1`).

**Default reveal animation** (`fade-up`):
```css
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fadeUp 500ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
```

**Staggered reveals**: For grid items (How It Works cards, pricing cards, report cards), each successive item delays by `150ms`:

```css
.stagger-1 { animation-delay: 0ms; }
.stagger-2 { animation-delay: 150ms; }
.stagger-3 { animation-delay: 300ms; }
.stagger-4 { animation-delay: 450ms; }
```

All staggered items start with `opacity: 0` via initial style, and only animate when their Intersection Observer triggers.

### 8.2 Hover / Interaction Micro-animations

**Buttons**:
- Primary: `translateY(-1px)` on hover, `translateY(0)` on active. Shadow transitions to `elevation-glow`. Duration `200ms`, `ease`.
- Outline: Border color and background transition. `200ms`.
- Ghost: Background fade-in. `150ms`.

**Cards**:
- `translateY(-2px)` on hover. Border and shadow transition simultaneously. Duration `250ms`, `cubic-bezier(0.4, 0, 0.2, 1)`.

**Nav links**: Underline slides in from left on hover:
```css
.nav-link {
  position: relative;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent-primary);
  transition: width 200ms ease;
}
.nav-link:hover::after {
  width: 100%;
}
```

**Trait chips**: `transform: scale(0.95)` on mousedown/active, `100ms`. Background color transition `150ms`.

**Checkboxes**: Background fill transition `150ms`. Checkmark SVG draws in via `stroke-dashoffset` animation, `200ms`.

**Report card arrows**: `transform: translateX(4px)` on card hover, `200ms`.

### 8.3 Progress / Loading Animations

**DNA Spinner** (replaces the generic `border-b-2 border-primary` spinner throughout the app):

A custom SVG spinner representing a simplified double helix. Implementation: 6-8 small circles (`3px` radius) arranged vertically in two interweaving sine-wave columns, all contained in a `40px` viewbox. The entire SVG rotates `360deg` over `1.5s`, `linear`, `infinite`.

```css
@keyframes helixSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.helix-spinner {
  width: 40px;
  height: 40px;
  color: var(--accent-primary);
  animation: helixSpin 1.5s linear infinite;
}
```

**Progress message animation**: Each new message fades in from below:
```css
@keyframes slideInMessage {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```
Duration: `300ms`, `ease-out`. Previous messages simultaneously transition color to `--text-muted` over `300ms`.

**Confidence meter fill**: Animates `width` property from `0%` to target percentage over `800ms` with `cubic-bezier(0.4, 0, 0.2, 1)`. Triggered when the element first enters the viewport via Intersection Observer.

**Skeleton loading** (for loading states on reports list, analyze page initial load):
```css
@keyframes shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
}

.skeleton {
  background: linear-gradient(90deg, #151D2E 25%, #1A2540 50%, #151D2E 75%);
  background-size: 400px 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 8px;
}
```

### 8.4 Hero Background Animation

**Concept**: Animated particle field with faint connecting lines, suggesting a molecular/genomic network. Abstract. Atmospheric. NOT a literal DNA helix.

**Canvas implementation** (preferred):
- HTML5 Canvas element, `position: absolute`, covering full hero section, `z-index: 0`. All hero content at `z-index: 10` with `position: relative`.
- 40-60 particles (small circles, `2px` radius), color: `--accent-primary` at `opacity: 0.15`.
- Each particle drifts slowly in a random direction at `0.2-0.5px` per frame.
- When two particles are within `120px` of each other, draw a connecting line between them. Line color: `--accent-primary` at `opacity: 0.06`. Line opacity decreases linearly as distance approaches `120px`.
- Particles wrap around edges seamlessly.
- Frame rate: Cap at 30fps using `requestAnimationFrame` with frame counting. Pause entirely when `document.hidden === true`.
- **Mobile** (below `md`): Reduce particle count to 20. Or use CSS-only fallback.

**CSS-only fallback** (if canvas is undesirable or for mobile):
- Two or three large radial gradient blobs (`400-600px` diameter) of `--accent-primary` at `opacity: 0.03-0.05`, positioned at different points in the hero.
- Slow drift animation:
```css
@keyframes drift1 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(30px, -20px); }
}
@keyframes drift2 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-20px, 30px); }
}
```
Duration: `20s`, `ease-in-out`, `infinite`, `alternate`. Each blob has a different duration (15s, 20s, 25s) for organic movement.

---

## 9. Accessibility

### 9.1 Color Contrast Ratios

All text must meet WCAG 2.1 AA standards (4.5:1 for normal text, 3:1 for large text).

| Foreground | Background | Approximate Ratio | Passes |
|---|---|---|---|
| `--text-primary` (#F1F5F9) | `--bg-base` (#0B0F1A) | 16.7:1 | AAA |
| `--text-primary` (#F1F5F9) | `--bg-card` (#151D2E) | 13.2:1 | AAA |
| `--text-secondary` (#94A3B8) | `--bg-base` (#0B0F1A) | 7.4:1 | AAA |
| `--text-secondary` (#94A3B8) | `--bg-card` (#151D2E) | 5.9:1 | AA |
| `--text-tertiary` (#64748B) | `--bg-base` (#0B0F1A) | 4.6:1 | AA |
| `--text-tertiary` (#64748B) | `--bg-card` (#151D2E) | 3.7:1 | AA large text only |
| `--text-inverse` (#0B0F1A) | `--accent-primary` (#14B8A6) | 5.8:1 | AA |
| `--accent-primary` (#14B8A6) | `--bg-base` (#0B0F1A) | 6.2:1 | AA |
| `--accent-primary` (#14B8A6) | `--bg-card` (#151D2E) | 4.9:1 | AA |

**Note**: `--text-muted` (#475569) does NOT pass AA on `--bg-base` (~2.9:1 ratio). It is restricted to decorative/non-essential text only (timestamps, ornamental labels, decorative dividers). Any text carrying meaning must use `--text-tertiary` or higher contrast.

### 9.2 Focus States

All interactive elements must have visible focus indicators when navigated via keyboard (`focus-visible`).

**Default focus style** (buttons, links, chips):
```css
:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
  border-radius: inherit;
}
```

**For inputs** (which have border-based focus):
- Replace outline with the border + box-shadow combo from section 6.5: `border-color: var(--accent-primary)` + `box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.15)`. The `3px` ring serves as the visible focus indicator.

**For clickable cards** (report cards, pricing cards):
- On `:focus-visible`: `outline: 2px solid var(--accent-primary)`, `outline-offset: 2px`.

**Skip link**: Hidden link at the very top of `<body>`. Text: "Skip to main content". Visually hidden by default (`sr-only`). On `:focus`: becomes visible. Background: `--accent-primary`. Text: `--text-inverse`, `label-md`, weight 600. Padding: `8px 16px`. Position: `fixed`, `top: 8px`, `left: 8px`. `z-index: 9999`. `radius-md`.

### 9.3 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Static spinner fallback */
  .helix-spinner {
    animation: none;
    opacity: 0.6;
  }

  /* Disable hero particle animation */
  .hero-particles-canvas {
    display: none;
  }
  .hero-bg-fallback {
    display: block; /* Show static gradient instead */
  }

  /* Confidence meter: instant fill, no animation */
  .confidence-fill {
    transition: none;
  }

  /* Cookie consent: no slide animation */
  [data-slot="cookie-consent"] {
    transform: none !important;
  }
}
```

### 9.4 Screen Reader Considerations

- All decorative icons (Lucide icons used for visual flair) must have `aria-hidden="true"`.
- Meaningful icons (e.g., the DNA icon in UploadDropzone) must have `aria-label` describing their purpose.
- **ConfidenceMeter**: Must include `role="meter"`, `aria-valuenow={confidence}`, `aria-valuemin={0}`, `aria-valuemax={100}`, and `aria-label="Analysis confidence: {confidence}%"` on the progress bar element.
- **UploadDropzone**: The drop target must have `role="button"` and `aria-label="Upload DNA file. Drag and drop or click to browse."`.
- **CookieConsent**: Must have `role="dialog"`, `aria-label="Cookie consent"`, and `aria-describedby` pointing to the consent text.
- **Evidence badges** in SnpTable: Color is not the sole indicator -- the text labels "Strong", "Moderate", "Preliminary" carry the meaning.
- **Form errors**: Error messages must be linked to their associated input via `aria-describedby`. The input must also have `aria-invalid="true"` when in error state.
- **Alerts** (success/cancel on pricing, error on analyze): Must use `role="alert"` for dynamic alerts that appear after user action.

### 9.5 Keyboard Navigation

- All interactive elements (buttons, links, inputs, checkboxes, clickable cards, trait chips) must be reachable via Tab in logical document order.
- Tab order must follow visual layout: top-to-bottom, left-to-right.
- Enter activates buttons and links. Space activates buttons and toggles checkboxes.
- Trait suggestion chips must be keyboard-accessible: focusable via Tab, activatable via Enter or Space.
- Mobile menu (when implemented): must trap focus within the menu when open. Escape closes it and returns focus to the hamburger button.
- Escape key closes: mobile menu, share link toast, any future modal dialogs.

---

## Appendix A: Complete CSS Variable Declaration

This is the full set of CSS variables to declare in `globals.css` under `:root`. Since the design is dark-only, no `.dark` class toggle is needed.

```css
:root {
  /* Backgrounds */
  --bg-base: #0B0F1A;
  --bg-raised: #111827;
  --bg-card: #151D2E;
  --bg-card-hover: #1A2540;
  --bg-input: #0D1321;
  --bg-overlay: rgba(11, 15, 26, 0.85);

  /* Borders */
  --border-default: #1E293B;
  --border-subtle: #1A2236;
  --border-strong: #334155;
  --border-accent: #0D9488;

  /* Primary Accent */
  --accent-primary: #14B8A6;
  --accent-primary-hover: #0FFBF9;
  --accent-primary-muted: #0D9488;
  --accent-primary-ghost: rgba(20, 184, 166, 0.08);
  --accent-primary-glow: rgba(15, 251, 249, 0.15);

  /* Secondary Accent */
  --accent-secondary: #F59E0B;
  --accent-secondary-hover: #FBBF24;
  --accent-secondary-muted: rgba(245, 158, 11, 0.12);

  /* Text */
  --text-primary: #F1F5F9;
  --text-secondary: #94A3B8;
  --text-tertiary: #64748B;
  --text-muted: #475569;
  --text-inverse: #0B0F1A;

  /* Semantic */
  --success: #10B981;
  --success-muted: rgba(16, 185, 129, 0.12);
  --warning: #F59E0B;
  --warning-muted: rgba(245, 158, 11, 0.12);
  --error: #EF4444;
  --error-muted: rgba(239, 68, 68, 0.12);
  --info: #3B82F6;
  --info-muted: rgba(59, 130, 246, 0.12);

  /* Confidence */
  --confidence-very-low: #EF4444;
  --confidence-low: #F97316;
  --confidence-moderate: #F59E0B;
  --confidence-high: #14B8A6;
  --confidence-very-high: #0FFBF9;

  /* Charts */
  --chart-1: #14B8A6;
  --chart-2: #3B82F6;
  --chart-3: #8B5CF6;
  --chart-4: #F59E0B;
  --chart-5: #EF4444;

  /* Typography */
  --font-display: var(--font-space-grotesk), system-ui, sans-serif;
  --font-body: var(--font-dm-sans), system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-1: 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.15);
  --shadow-2: 0 4px 6px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
  --shadow-3: 0 10px 15px rgba(0, 0, 0, 0.35), 0 4px 6px rgba(0, 0, 0, 0.2);
  --shadow-glow: 0 0 20px rgba(15, 251, 249, 0.15), 0 0 40px rgba(15, 251, 249, 0.05);
}
```

---

## Appendix B: Tailwind Theme Extension

Map CSS variables to Tailwind utility classes. Add to the `@theme inline` block in `globals.css`:

```css
@theme inline {
  --color-bg-base: var(--bg-base);
  --color-bg-raised: var(--bg-raised);
  --color-bg-card: var(--bg-card);
  --color-bg-card-hover: var(--bg-card-hover);
  --color-bg-input: var(--bg-input);

  --color-border-default: var(--border-default);
  --color-border-subtle: var(--border-subtle);
  --color-border-strong: var(--border-strong);
  --color-border-accent: var(--border-accent);

  --color-accent: var(--accent-primary);
  --color-accent-hover: var(--accent-primary-hover);
  --color-accent-muted: var(--accent-primary-muted);
  --color-accent-ghost: var(--accent-primary-ghost);

  --color-accent-secondary: var(--accent-secondary);

  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-tertiary: var(--text-tertiary);
  --color-text-muted: var(--text-muted);
  --color-text-inverse: var(--text-inverse);

  --color-success: var(--success);
  --color-success-muted: var(--success-muted);
  --color-warning: var(--warning);
  --color-warning-muted: var(--warning-muted);
  --color-error: var(--error);
  --color-error-muted: var(--error-muted);
  --color-info: var(--info);
  --color-info-muted: var(--info-muted);

  --font-sans: var(--font-body);
  --font-display: var(--font-display);
  --font-mono: var(--font-mono);
}
```

This enables Tailwind classes like: `bg-bg-card`, `text-text-primary`, `border-border-default`, `text-accent`, `font-display`, `font-mono`, etc.

---

## Appendix C: Component-to-File Mapping

Developer reference for which files need changes:

| Component | File | Key Changes |
|---|---|---|
| Root Layout | `src/app/layout.tsx` | Replace Geist fonts with Space Grotesk + DM Sans + JetBrains Mono. Remove dark/light toggle. Apply dark body styles. |
| Global CSS | `src/app/globals.css` | Complete rewrite: new CSS variables, animation keyframes, remove light theme `:root`/`.dark` split, add print overrides, add reduced-motion rules. |
| Navbar | `src/components/Navbar.tsx` | Fixed position, `h-16`, new bg/border colors, mobile hamburger menu, animated underline links. |
| Footer | `src/components/Footer.tsx` | Three-column layout, expanded content, new colors, bottom bar with copyright. |
| UploadDropzone | `src/components/UploadDropzone.tsx` | Replace emoji with Lucide `Dna` icon, new border/bg colors, drag-over glow animation, DNA helix spinner. |
| ConsentGate | `src/components/ConsentGate.tsx` | Custom styled checkboxes with animated checkmarks, new card styling, shield icon. |
| TraitInput | `src/components/TraitInput.tsx` | Taller input (48px), pill-shaped suggestion chips with accent-primary styling. |
| ResultsCard | `src/components/ResultsCard.tsx` | New section typography (Space Grotesk headings), redesigned disclaimer alert with left border, analysis text container. |
| ConfidenceMeter | `src/components/ConfidenceMeter.tsx` | Gradient progress bar, animated fill, leading-edge glow dot, new confidence color mapping. |
| SnpTable | `src/components/SnpTable.tsx` | Dark table header, zebra-striped rows, teal rsid text, updated badge colors for dark theme. |
| CookieConsent | `src/components/CookieConsent.tsx` | Slide-up mount animation, new colors. |
| Homepage | `src/app/page.tsx` | Full hero redesign with particle background, staggered card reveals, "Sample Analysis" in contrast band section, trust section with icons. |
| Analyze | `src/app/analyze/page.tsx` | New header layout, DNA helix spinner, fade-up results animation. |
| Pricing | `src/app/pricing/page.tsx` | Floating badge positioning, highlighted card glow/gradient, updated card styling. |
| Login | `src/app/auth/login/page.tsx` | Add Google OAuth button, email divider, card mount animation. |
| Signup | `src/app/auth/signup/page.tsx` | Same changes as Login. |
| Reports List | `src/app/reports/page.tsx` | Two-column card grid with mini confidence dots, staggered load animation, empty state redesign. |
| Report Detail | `src/app/reports/[id]/page.tsx` | Back link, metadata bar with share/print/delete actions, toast for copy. |
| Shared Report | `src/app/share/[token]/page.tsx` | Info banner, bottom CTA card. |
| Blog Index | `src/app/blog/page.tsx` | Horizontal post cards, updated typography. |
| Blog Posts | `src/app/blog/*/page.tsx` | Prose styling with new typography and colors. |
| Legal | `src/app/legal/*/page.tsx` | Updated prose styling. |
| 404 | `src/app/not-found.tsx` | Massive 404 text, rotating helix background SVG. |
| New: Skip Link | `src/components/SkipLink.tsx` | **New file**. Accessibility skip-to-content link. |
| New: DNA Spinner | `src/components/DnaSpinner.tsx` | **New file**. Reusable SVG helix spinner component. |
| New: Hero Particles | `src/components/HeroParticles.tsx` | **New file**. Canvas-based particle field for homepage hero. |

---

## Appendix D: Implementation Priority

Recommended order of implementation to see results fastest:

1. **Foundations**: `globals.css` (variables, keyframes, base styles), `layout.tsx` (fonts, body classes)
2. **Navbar + Footer**: These frame every page -- do them first for instant visual impact
3. **Homepage**: Hero section, How It Works, Sample Analysis, Trust badges
4. **Core analysis flow**: UploadDropzone, ConsentGate, TraitInput, ConfidenceMeter, SnpTable, ResultsCard
5. **Pricing page**: Cards, highlighted state, FAQ
6. **Auth pages**: Login + Signup with Google OAuth button
7. **Reports**: List page, detail page, shared report page
8. **Blog**: Index + post styling
9. **Legal + 404**: Prose updates, 404 background animation
10. **Polish**: Hero particle canvas, stagger animations, reduced-motion testing, accessibility audit

---

*End of Design Specification -- Helix Noir v2.0*
