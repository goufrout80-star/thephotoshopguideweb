-- Run this once in your Supabase project's SQL editor before setting
-- VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY in .env.

create table if not exists sponsorship_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company text not null,
  budget text,
  message text not null
);

alter table sponsorship_inquiries enable row level security;

-- Allows the public anon key to submit new inquiries only —
-- no read/update/delete access from the browser.
create policy "Anyone can submit an inquiry"
  on sponsorship_inquiries
  for insert
  to anon
  with check (true);
