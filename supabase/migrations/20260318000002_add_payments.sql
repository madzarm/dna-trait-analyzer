-- Add payment and subscription fields to profiles
alter table public.profiles
  add column stripe_customer_id text unique,
  add column subscription_status text not null default 'free',
  add column subscription_plan text,
  add column credits_remaining integer not null default 3,
  add column subscription_period_end timestamptz;

-- Create purchases table
create table public.purchases (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  stripe_session_id text unique not null,
  product_type text not null,
  amount integer not null,
  status text not null default 'pending',
  created_at timestamptz default now() not null
);

alter table public.purchases enable row level security;

create policy "Users can view their own purchases"
  on public.purchases for select
  using (auth.uid() = user_id);

-- Create usage tracking table
create table public.usage (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  report_id uuid references public.reports(id) on delete set null,
  created_at timestamptz default now() not null
);

alter table public.usage enable row level security;

create policy "Users can view their own usage"
  on public.usage for select
  using (auth.uid() = user_id);

create policy "Users can insert their own usage"
  on public.usage for insert
  with check (auth.uid() = user_id);

-- Index for counting usage
create index idx_usage_user_id on public.usage(user_id);

-- Index for stripe customer lookups
create index idx_profiles_stripe_customer on public.profiles(stripe_customer_id) where stripe_customer_id is not null;
