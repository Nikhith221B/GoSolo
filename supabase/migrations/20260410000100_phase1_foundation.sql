create extension if not exists "pgcrypto";

create table if not exists public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user' check (role in ('user', 'moderator', 'admin')),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  avatar_url text,
  bio text,
  home_city text,
  travel_style text,
  budget_preference text,
  social_vibe text,
  interests text[] not null default '{}',
  onboarding_completed boolean not null default false,
  profile_completion_percent int not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.user_private (
  user_id uuid primary key references auth.users(id) on delete cascade,
  date_of_birth date,
  is_18_plus_confirmed boolean not null default false,
  phone_number text,
  verification_level text not null default 'basic',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

drop trigger if exists set_user_private_updated_at on public.user_private;
create trigger set_user_private_updated_at
before update on public.user_private
for each row
execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;

  insert into public.user_private (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  insert into public.user_roles (user_id, role)
  values (new.id, 'user')
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

create or replace function public.auth_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select role from public.user_roles where user_id = auth.uid() limit 1),
    'user'
  );
$$;

create or replace function public.auth_user_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.auth_user_role() = 'admin';
$$;

alter table public.profiles enable row level security;
alter table public.user_private enable row level security;
alter table public.user_roles enable row level security;

drop policy if exists "profiles are publicly readable" on public.profiles;
create policy "profiles are publicly readable"
on public.profiles
for select
using (true);

drop policy if exists "users can update own profile" on public.profiles;
create policy "users can update own profile"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "users can read own private row" on public.user_private;
create policy "users can read own private row"
on public.user_private
for select
using (auth.uid() = user_id);

drop policy if exists "users can update own private row" on public.user_private;
create policy "users can update own private row"
on public.user_private
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "users can read own role row" on public.user_roles;
create policy "users can read own role row"
on public.user_roles
for select
using (auth.uid() = user_id);

drop policy if exists "admins can read all roles" on public.user_roles;
create policy "admins can read all roles"
on public.user_roles
for select
using (public.auth_user_is_admin());
