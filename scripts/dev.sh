#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

info() { echo -e "${GREEN}[+]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }

# Track background PIDs for cleanup
PIDS=()

cleanup() {
  echo ""
  info "Shutting down..."
  for pid in "${PIDS[@]}"; do
    if kill -0 "$pid" 2>/dev/null; then
      kill "$pid" 2>/dev/null || true
    fi
  done
  info "Done."
  exit 0
}

trap cleanup INT TERM EXIT

echo ""
echo "==================================="
echo "  DNA Trait Analyzer — Dev Server"
echo "==================================="
echo ""

# ----------------------------
# Check .env.local exists
# ----------------------------

if [ ! -f .env.local ]; then
  warn ".env.local not found. Run ./scripts/setup.sh first."
  exit 1
fi

# ----------------------------
# Start local Supabase if available
# ----------------------------

if command -v supabase >/dev/null 2>&1; then
  SUPABASE_RUNNING=$(supabase status 2>/dev/null | grep "API URL" || true)
  if [ -z "$SUPABASE_RUNNING" ]; then
    info "Starting local Supabase..."
    supabase start 2>/dev/null || warn "Could not start Supabase. Is Docker running?"
  else
    info "Local Supabase is already running."
  fi
else
  warn "Supabase CLI not found — assuming remote Supabase."
fi

# ----------------------------
# Start Stripe webhook forwarding
# ----------------------------

if command -v stripe >/dev/null 2>&1; then
  info "Starting Stripe webhook forwarding..."
  stripe listen --forward-to localhost:3000/api/stripe/webhook &
  PIDS+=($!)
  sleep 2
  echo ""
  warn "Copy the webhook signing secret above into .env.local as STRIPE_WEBHOOK_SECRET"
  echo ""
else
  warn "Stripe CLI not found — webhook forwarding disabled."
  warn "Install: brew install stripe/stripe-cli/stripe"
fi

# ----------------------------
# Start Next.js dev server
# ----------------------------

info "Starting Next.js dev server..."
echo ""
npm run dev &
PIDS+=($!)

# Wait for any background process to exit
wait
