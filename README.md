# DNA Trait Analyzer

**Ask your DNA anything.**

Upload your raw DNA file, type any trait you're curious about, and get an AI-powered genetic analysis backed by real scientific databases. No pre-built trait list. No limits on what you can explore.

## How It Works

**1.** Upload your MyHeritage raw DNA export (CSV with ~609,000 SNPs)

**2.** Type any trait — caffeine metabolism, lactose intolerance, bitter taste perception, muscle fiber composition, anything

**3.** AI researches the genetic basis live, finds relevant SNPs from GWAS studies, fetches real data from SNPedia, and cross-references against your actual genotypes

**4.** Get a personalized, evidence-weighted report with haplotype-aware analysis, confidence scoring, and cited sources

## Features

- **Ask about ANY trait** — not limited to a fixed database. The AI researches genetic associations live using web search across GWAS Catalog, ClinVar, and published studies.

- **Real SNPedia integration** — fetches authoritative genotype descriptions, magnitude scores, and population frequencies directly from the SNPedia API for your exact genotype.

- **Evidence-weighted analysis** — every SNP is classified as strong, moderate, or preliminary evidence. Strong findings drive conclusions; weak ones get honest caveats.

- **Haplotype-aware interpretation** — linked SNPs in the same gene (like TAS2R38 PAV/AVI or APOE e2/e3/e4) are analyzed together as haplotypes, not as contradictory individual signals.

- **609,000 SNPs cross-referenced** — your full MyHeritage raw data is parsed and matched against researched variants. The report shows exactly which SNPs were found in your DNA and which were not.

- **Clear bottom-line answers** — no wishy-washy hedging. You get a direct verdict ("You are likely a fast caffeine metabolizer") backed by the specific genotypes driving that conclusion.

- **Privacy-first design** — DNA data is processed in-memory on the server, never stored permanently, and automatically deleted after 1 hour. Only specific SNP identifiers are used during analysis.

- **Transparent sourcing** — every analysis cites specific studies with PMIDs, effect sizes, and odds ratios so you can verify the science yourself.

## Why This Exists

Services like Promethease and SelfDecode rely on fixed, pre-programmed trait databases — you can only see reports for the traits they decided to build. If a new genetic association is published tomorrow, you wait months (or forever) for them to add it. DNA Trait Analyzer takes a fundamentally different approach: an LLM researches the genetic basis of your question in real time, pulling from the latest published science, then cross-references what it finds against your actual DNA. You ask the questions. The AI does the research. Your genome provides the answers.

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Full-stack React framework (App Router) |
| TypeScript | Type safety across client and server |
| Tailwind CSS + shadcn/ui | Styling and UI components |
| Claude API (Sonnet 4) | SNP research via web search, genotype interpretation |
| SNPedia API | Curated genotype data, magnitude scores, population frequencies |
| PapaParse | CSV parsing for DNA data files |

## Quick Start

**Prerequisites:** Node.js 18+, an [Anthropic API key](https://console.anthropic.com/)

```bash
git clone https://github.com/madzarm/dna-trait-analyzer.git
cd dna-trait-analyzer
npm install
```

Create `.env.local` and add your API key:

```
ANTHROPIC_API_KEY=sk-ant-...
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Architecture

```
Upload CSV ──► Parse with PapaParse ──► Build RSID → genotype Map
                   (dna-parser.ts)           (dna-store.ts, in-memory, 1h TTL)
                         │
                         ▼
              User enters a trait
              (e.g. "caffeine metabolism")
                         │
                         ▼
         Claude Sonnet 4 + web search ──► Finds 3-15 associated SNPs
              (llm-pipeline.ts)           with evidence strength tiers
                         │
                         ▼
         SNPedia API validates SNPs ──► Fetches genotype descriptions,
              (snpedia.ts)               magnitude scores, population
                         │               frequencies, PMIDs
                         ▼
         Cross-reference user DNA ──► Matches researched SNPs against
              (llm-pipeline.ts)        the user's RSID map
                         │
                         ▼
         Claude interprets results ──► Weights by evidence strength,
              (llm-pipeline.ts)        analyzes haplotypes, uses SNPedia
                         │             as ground truth
                         ▼
         Stream results via SSE ──► Progress events + final analysis
              (api/analyze)           returned to the client
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Landing / upload page
│   ├── analyze/page.tsx          # Trait analysis page
│   ├── layout.tsx                # Root layout
│   └── api/
│       ├── upload/route.ts       # DNA file upload endpoint
│       └── analyze/route.ts      # Trait analysis endpoint (SSE)
├── components/
│   ├── UploadDropzone.tsx        # CSV drag-and-drop upload
│   ├── TraitInput.tsx            # Trait query input
│   ├── ResultsCard.tsx           # Analysis results display
│   ├── ConfidenceMeter.tsx       # Confidence score visualization
│   ├── SnpTable.tsx              # SNP matches table
│   └── ui/                      # shadcn/ui primitives
├── lib/
│   ├── dna-parser.ts             # CSV parsing, header validation
│   ├── dna-store.ts              # In-memory session store (1h TTL)
│   ├── llm-pipeline.ts           # Claude research + interpretation
│   ├── snpedia.ts                # SNPedia API client
│   ├── types.ts                  # Shared TypeScript types
│   └── utils.ts                  # Utility functions
```

## API Routes

### `POST /api/upload`

Accepts a DNA CSV file via `multipart/form-data` (field name: `file`). The file must be a `.csv` with headers `RSID, CHROMOSOME, POSITION, RESULT`.

**Response (200):**
```json
{ "sessionId": "uuid-v4", "snpCount": 609424 }
```

**Errors:** 400 if no file, wrong extension, or invalid format.

### `POST /api/analyze`

Accepts JSON: `{ "trait": "caffeine metabolism", "sessionId": "uuid-from-upload" }`

Returns a **Server-Sent Events** stream with progress events followed by a final result:

```
data: {"type":"progress","phase":"research","message":"Searching..."}
data: {"type":"snps_found","snpCount":8}
data: {"type":"progress","phase":"snpedia","message":"Looking up SNPedia..."}
data: {"type":"progress","phase":"interpret","message":"Generating report..."}
data: {"type":"result","data":{"trait":"...","summary":"...","confidence":85,"snpMatches":[...]}}
```

## Disclaimer

This tool is for **educational and entertainment purposes only**. It does not provide medical diagnoses, health advice, or treatment recommendations. Genetic traits are complex and influenced by many factors including environment, lifestyle, and multi-gene interactions. Always consult a qualified healthcare professional or certified genetic counselor for medical guidance.
