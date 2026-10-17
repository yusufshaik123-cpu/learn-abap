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

-- Initial Seed Data for Global Platform Leaderboard
insert into public.leaderboard (id, username, display_name, role_title, avatar_color, xp, streak_days, lessons_completed, quizzes_passed, challenges_solved, mastery_score)
values
  ('usr-rap-arch', 'rap_architect', 'Senior RAP Specialist', 'RAP Enterprise Architect', 'purple', 3450, 18, 16, 8, 8, 92),
  ('usr-clean-abap', 'clean_coder', 'ABAP Craftsman', 'Clean ABAP Lead', 'emerald', 2890, 14, 14, 7, 6, 84),
  ('usr-cds-wizard', 'core_data_fan', 'CDS Data Modeler', 'SAP S/4HANA Consultant', 'sky', 2150, 9, 11, 5, 5, 75),
  ('usr-subrc-zero', 'subrc_zero', 'Bug Hunter', 'ABAP Quality Engineer', 'amber', 1780, 7, 9, 4, 4, 68),
  ('usr-cloud-dev', 'btp_cloud_dev', 'Cloud Extender', 'BTP Developer', 'indigo', 1250, 5, 6, 3, 3, 55)
on conflict (username) do nothing;
