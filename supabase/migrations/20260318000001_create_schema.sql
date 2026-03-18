-- Create profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Create reports table
create table public.reports (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  trait text not null,
  summary text not null,
  confidence numeric not null,
  snp_matches jsonb not null default '[]'::jsonb,
  interpretation text not null,
  disclaimer text not null,
  sources jsonb not null default '[]'::jsonb,
  share_token text unique,
  is_public boolean default false not null,
  created_at timestamptz default now() not null
);

-- Enable RLS on reports
alter table public.reports enable row level security;

create policy "Users can view their own reports"
  on public.reports for select
  using (auth.uid() = user_id);

create policy "Users can insert their own reports"
  on public.reports for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own reports"
  on public.reports for update
  using (auth.uid() = user_id);

create policy "Users can delete their own reports"
  on public.reports for delete
  using (auth.uid() = user_id);

create policy "Anyone can view public reports by share token"
  on public.reports for select
  using (is_public = true and share_token is not null);

-- Index for fast share token lookups
create index idx_reports_share_token on public.reports(share_token) where share_token is not null;

-- Index for user's reports listing
create index idx_reports_user_id_created on public.reports(user_id, created_at desc);
