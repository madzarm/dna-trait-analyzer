# Development Setup

Local development guide for the DNA Trait Analyzer.

## Prerequisites

- **Node.js 18+** — `brew install node` or [nodejs.org](https://nodejs.org)
- **Supabase CLI** — `brew install supabase/tap/supabase`
- **Stripe CLI** (optional, for payments) — `brew install stripe/stripe-cli/stripe`
- **Docker** (required by Supabase CLI) — [docker.com](https://www.docker.com/products/docker-desktop)

## Quick Start

```bash
# One-command setup: installs deps, starts Supabase, configures .env.local
./scripts/setup.sh

# Add your Anthropic API key to .env.local
# ANTHROPIC_API_KEY=sk-ant-...

# Start dev server (Supabase + Stripe webhooks + Next.js)
./scripts/dev.sh
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Manual Setup

If you prefer to set things up step by step:

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in:

| Variable | Required | Where to get it |
|----------|----------|-----------------|
| `ANTHROPIC_API_KEY` | Yes | [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | `supabase status` or Supabase dashboard |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | `supabase status` or Supabase dashboard |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | `supabase status` or Supabase dashboard |
| `STRIPE_SECRET_KEY` | No | [dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys) |
| `STRIPE_WEBHOOK_SECRET` | No | Output of `stripe listen` |
| `STRIPE_PRICE_*` | No | Create in Stripe Dashboard |

### 3. Start local Supabase

```bash
supabase start
supabase db push    # Apply database migrations
```

Copy the URL, anon key, and service role key from `supabase status` into `.env.local`.

### 4. Start the dev server

```bash
npm run dev
```

### 5. Stripe webhook forwarding (optional)

In a separate terminal:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the webhook signing secret into `.env.local` as `STRIPE_WEBHOOK_SECRET`.

## Testing with Sample Files

Sample DNA files are provided in `/test-data/` for each supported format:

| File | Format | Description |
|------|--------|-------------|
| `sample-23andme.txt` | 23andMe | Tab-separated, `rsid/chromosome/position/genotype` |
| `sample-ancestry.txt` | AncestryDNA | Tab-separated, `rsid/chromosome/position/allele1/allele2` |
| `sample-myheritage.csv` | MyHeritage | Comma-separated, quoted fields |
| `sample-ftdna.csv` | FTDNA | Comma-separated, `RSID/CHROMOSOME/POSITION/RESULT` |

Each file contains ~21 valid SNPs (plus 2 no-calls) covering well-known variants:

- **rs762551** (CYP1A2) — caffeine metabolism
- **rs4988235** (MCM6/LCT) — lactose tolerance
- **rs1801133** (MTHFR) — folate metabolism
- **rs12913832** (HERC2/OCA2) — eye color
- **rs9939609** (FTO) — obesity risk
- **rs429358 + rs7412** (APOE) — Alzheimer's risk haplotype
- **rs4680** (COMT) — dopamine/pain sensitivity
- And more

Upload any of these files on the home page to test the parser and analysis pipeline.

## Stripe Test Mode

When testing payments, use these Stripe test card numbers:

| Card Number | Result |
|-------------|--------|
| `4242 4242 4242 4242` | Success |
| `4000 0000 0000 3220` | Requires 3D Secure |
| `4000 0000 0000 0002` | Declined |

Use any future expiry date, any 3-digit CVC, and any billing zip code.

## Troubleshooting

### "Neither apiKey nor config.authenticator provided" at build time

The Stripe SDK requires `STRIPE_SECRET_KEY` to be set. If you're not using Stripe, set it to any placeholder value in `.env.local`:

```
STRIPE_SECRET_KEY=sk_test_placeholder
```

### Supabase won't start

Make sure Docker Desktop is running. Then:

```bash
supabase stop
supabase start
```

### "Session expired" when analyzing

DNA data is stored in memory and expires after 1 hour. Re-upload your file.

### Database migration errors

Reset your local database and re-apply:

```bash
supabase db reset
```

### Port 3000 already in use

```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```
