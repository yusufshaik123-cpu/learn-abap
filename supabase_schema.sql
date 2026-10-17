-- ============================================================
-- Supabase Leaderboard Schema for ABAP Mastery
-- Copy & Run this SQL script in your Supabase SQL Editor
-- (Dashboard -> SQL Editor -> New Query -> Run)
-- ============================================================

create table if not exists public.leaderboard (
  id text primary key,
  username text not null unique,
  display_name text not null,
  role_title text default 'ABAP Developer',
  avatar_color text default 'indigo',
  xp integer default 0,
  streak_days integer default 1,
  lessons_completed integer default 0,
  quizzes_passed integer default 0,
  challenges_solved integer default 0,
  mastery_score integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS)
alter table public.leaderboard enable row level security;

-- Policy 1: Allow public read of leaderboard for all visitors
create policy "Allow public read"
  on public.leaderboard
  for select
  using (true);

-- Policy 2: Allow insert & update using anon key
create policy "Allow anon insert"
  on public.leaderboard
  for insert
  with check (true);

create policy "Allow anon update"
  on public.leaderboard
  for update
  using (true)
  with check (true);
