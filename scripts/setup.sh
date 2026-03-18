#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

info() { echo -e "${GREEN}[+]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
error() { echo -e "${RED}[x]${NC} $1"; exit 1; }

echo ""
echo "==================================="
echo "  DNA Trait Analyzer — Setup"
echo "==================================="
echo ""

# ----------------------------
# Check prerequisites
# ----------------------------

info "Checking prerequisites..."

command -v node >/dev/null 2>&1 || error "Node.js is not installed. Install it: https://nodejs.org or 'brew install node'"
NODE_VERSION=$(node -v | sed 's/v//' | cut -d. -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
  error "Node.js 18+ is required. You have $(node -v)."
fi
info "  Node.js $(node -v)"

command -v npm >/dev/null 2>&1 || error "npm is not installed."
info "  npm $(npm -v)"

if command -v supabase >/dev/null 2>&1; then
  info "  Supabase CLI $(supabase --version 2>/dev/null || echo 'installed')"
else
  warn "Supabase CLI not found. Install: brew install supabase/tap/supabase"
  warn "Skipping local Supabase setup — you'll need to configure a remote Supabase project."
  SKIP_SUPABASE=true
fi

if command -v stripe >/dev/null 2>&1; then
  info "  Stripe CLI $(stripe version 2>/dev/null | head -1 || echo 'installed')"
else
  warn "Stripe CLI not found. Install: brew install stripe/stripe-cli/stripe"
  warn "Stripe webhook forwarding will not be available in dev mode."
fi

# ----------------------------
# Install dependencies
# ----------------------------

info "Installing npm dependencies..."
npm install

# ----------------------------
# Environment setup
# ----------------------------

if [ ! -f .env.local ]; then
  info "Creating .env.local from .env.example..."
  cp .env.example .env.local
  CREATED_ENV=true
else
  info ".env.local already exists — skipping copy."
  CREATED_ENV=false
fi

# ----------------------------
# Local Supabase
# ----------------------------

if [ "$SKIP_SUPABASE" != "true" ]; then
  info "Starting local Supabase..."

  # Initialize Supabase config if needed
  if [ ! -f supabase/config.toml ]; then
    supabase init 2>/dev/null || true
  fi

  supabase start 2>/dev/null || true

  # Extract connection details
  SUPABASE_STATUS=$(supabase status 2>/dev/null)
  SUPABASE_URL=$(echo "$SUPABASE_STATUS" | grep "API URL" | awk '{print $NF}')
  SUPABASE_ANON_KEY=$(echo "$SUPABASE_STATUS" | grep "anon key" | awk '{print $NF}')
  SUPABASE_SERVICE_KEY=$(echo "$SUPABASE_STATUS" | grep "service_role key" | awk '{print $NF}')

  if [ -n "$SUPABASE_URL" ] && [ -n "$SUPABASE_ANON_KEY" ]; then
    info "Auto-filling Supabase credentials in .env.local..."

    # Update .env.local with local Supabase values
    if [[ "$OSTYPE" == "darwin"* ]]; then
      sed -i '' "s|^NEXT_PUBLIC_SUPABASE_URL=.*|NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}|" .env.local
      sed -i '' "s|^NEXT_PUBLIC_SUPABASE_ANON_KEY=.*|NEXT_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}|" .env.local
      sed -i '' "s|^SUPABASE_SERVICE_ROLE_KEY=.*|SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_KEY}|" .env.local
    else
      sed -i "s|^NEXT_PUBLIC_SUPABASE_URL=.*|NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}|" .env.local
      sed -i "s|^NEXT_PUBLIC_SUPABASE_ANON_KEY=.*|NEXT_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}|" .env.local
      sed -i "s|^SUPABASE_SERVICE_ROLE_KEY=.*|SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_KEY}|" .env.local
    fi

    info "  URL: ${SUPABASE_URL}"
    info "  Anon key: ${SUPABASE_ANON_KEY:0:20}..."
  else
    warn "Could not extract Supabase credentials. Check 'supabase status' manually."
  fi

  # Apply database migrations
  info "Applying database migrations..."
  supabase db push 2>/dev/null || warn "Could not apply migrations — you may need to run 'supabase db push' manually."
fi

# ----------------------------
# Done
# ----------------------------

echo ""
echo "==================================="
echo "  Setup Complete"
echo "==================================="
echo ""

if [ "$CREATED_ENV" = "true" ] || [ "$SKIP_SUPABASE" = "true" ]; then
  warn "You still need to configure these in .env.local:"
  echo ""
  echo "  REQUIRED:"
  echo "    ANTHROPIC_API_KEY     — Get from https://console.anthropic.com/settings/keys"
  echo ""
  echo "  OPTIONAL (for payments):"
  echo "    STRIPE_SECRET_KEY     — Get from https://dashboard.stripe.com/test/apikeys"
  echo "    STRIPE_WEBHOOK_SECRET — Run 'stripe listen' to get this"
  echo "    STRIPE_PRICE_*        — Create products in Stripe Dashboard"
  echo ""
fi

info "To start the dev server, run: ./scripts/dev.sh"
info "Or manually: npm run dev"
echo ""
info "Test files are in /test-data/ — upload them to test each DNA format."
echo ""
