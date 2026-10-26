begin;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,

  username text not null unique
    check (username ~ '^[a-z][a-z0-9_]{2,23}$'),

  display_name text not null
    check (char_length(btrim(display_name)) between 1 and 50),

  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

revoke all on table public.profiles from public, anon, authenticated;

grant select on table public.profiles to authenticated;

grant insert (id, username, display_name)
  on public.profiles to authenticated;

grant update (username, display_name)
  on public.profiles to authenticated;

create policy profiles_select_own
  on public.profiles
  for select to authenticated
  using ((select auth.uid()) = id);

create policy profiles_insert_own
  on public.profiles
  for insert to authenticated
  with check ((select auth.uid()) = id);

create policy profiles_update_own
  on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

commit;