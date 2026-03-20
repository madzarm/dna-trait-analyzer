# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Next.js dev server on port 3000
npm run build      # Production build
npm run lint       # ESLint (next core-web-vitals + TypeScript)
npm start          # Serve production build
```

**Local Supabase** (requires Docker + Supabase CLI):
```bash
supabase start              # Start local Supabase
supabase db push            # Apply migrations
supabase status             # Get local URLs and keys
```

**Setup scripts**: `./scripts/setup.sh` (first-time setup), `./scripts/dev.sh` (starts Supabase + Stripe webhooks + Next.js together).

**No test framework is configured.** Sample DNA files for manual testing are in `test-data/`.

## Architecture

**DNA Trait Analyzer** — Next.js 16 App Router application that processes raw DNA files (23andMe, AncestryDNA, MyHeritage, FTDNA) and uses Claude AI + scientific databases to answer questions about any genetic trait.

### Core Pipeline (the critical path)

1. **Upload** (`POST /api/upload`) → `dna-parser.ts` parses CSV via PapaParse, auto-detects format, builds RSID→genotype map → stored in `dna-store.ts` (in-memory, 1-hour TTL)
2. **Analyze** (`POST /api/analyze`) → returns Server-Sent Events stream:
   - `llm-pipeline.ts` uses Claude with web search to find SNPs associated with the queried trait
   - Parallel lookups against SNPedia (`snpedia.ts`), ClinVar (`clinvar.ts`), GWAS Catalog (`gwas-catalog.ts`)
   - Cross-references found SNPs against user's DNA map
   - Claude interprets results with haplotype awareness and evidence weighting
   - Streams progress events, then final `AnalysisResult`

### Key Modules

| File | Role |
|------|------|
| `src/lib/llm-pipeline.ts` | Orchestrates the full research → match → interpret pipeline |
| `src/lib/dna-parser.ts` | Multi-format CSV parser with header auto-detection |
| `src/lib/dna-store.ts` | In-memory session store (Map with 1h TTL cleanup) |
| `src/lib/snpedia.ts` | SNPedia API client (CC BY-NC-SA — excluded in commercial mode) |
| `src/lib/clinvar.ts` | ClinVar/NCBI API client (public domain) |
| `src/lib/gwas-catalog.ts` | GWAS Catalog EMBL-EBI API client |
| `src/lib/types.ts` | Shared TypeScript interfaces (`AnalysisResult`, `SNPMatch`, `SNPData`, etc.) |
| `src/lib/usage.ts` | Free-tier usage tracking (3 free analyses) |
| `src/lib/stripe.ts` | Stripe payment integration |

### Auth & Database

- **Supabase Auth** with email/password + Google OAuth (callback at `/auth/callback`)
- **Supabase PostgreSQL** with RLS on all tables: `profiles`, `reports`, `purchases`, `usage`
- Server-side client (`src/lib/supabase/server.ts`) vs browser client (`src/lib/supabase/client.ts`)
- Middleware at `src/middleware.ts` refreshes auth sessions on every request
- Database trigger auto-creates profile row on user signup

### Payments

Stripe integration with checkout sessions, webhook handler (`/api/stripe/webhook`), and customer portal. Plans: Starter (one-time), Monthly, Annual. Price IDs configured via env vars.

### UI

- **Design**: "Genomic Observatory" — dark-first scientific aesthetic
- **Fonts**: Space Grotesk (display), IBM Plex Sans (body), IBM Plex Mono (SNP data)
- **Stack**: Tailwind CSS v4 + shadcn/ui components (in `src/components/ui/`)
- **Path alias**: `@/*` maps to `src/*`

## Environment Variables

Required in `.env.local` (see `.env.example`):
- `ANTHROPIC_API_KEY` — Claude API key
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase connection
- `SUPABASE_SERVICE_ROLE_KEY` — server-side only, for webhooks

Optional (Stripe):
- `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_STARTER`, `STRIPE_PRICE_MONTHLY`, `STRIPE_PRICE_ANNUAL`

## Key Design Decisions

- **DNA data is never persisted** — stored in-memory only, auto-deleted after 1 hour
- **SSE streaming** for analysis results — not WebSockets — via standard `ReadableStream` in API routes
- **Evidence tiers** (`strong`/`moderate`/`preliminary`) drive how SNP findings are weighted in conclusions
- **Haplotype-aware**: linked SNPs (e.g., APOE e2/e3/e4, TAS2R38 PAV/AVI) are analyzed together, not individually
- **Commercial mode** (`useCommercialSources` flag) excludes SNPedia (CC BY-NC-SA) and uses only public domain sources
