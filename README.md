# GoSolo (Phase 1 Foundation)

Trust-first solo traveler platform foundation built with Next.js App Router, TypeScript,
Tailwind, shadcn/ui, and Supabase.

## Stack

- Next.js App Router + React + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase Auth + Postgres (RLS)
- Zod + React Hook Form

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create local env file from template:

```bash
copy .env.example .env.local
```

3. Fill values in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. Start dev server:

```bash
npm run dev
```

## Supabase migrations

Phase 1 migration SQL lives in `supabase/migrations/`.

Apply migrations with your preferred Supabase workflow (local CLI or remote SQL editor).
The Phase 1 migration creates only these foundation tables:

- `profiles`
- `user_roles`
- `user_private`

It also sets:

- `handle_new_user` trigger to provision new auth users
- `set_updated_at` trigger for mutable foundation tables
- RLS policies for the three foundation tables

## Admin testing in Phase 1

Admin routes are gated to users with `user_roles.role = 'admin'`.

Promote a user manually for local testing:

```sql
update public.user_roles
set role = 'admin'
where user_id = '<auth_user_uuid>';
```

## Quality checks

```bash
npm run lint
npm run typecheck
```

## Manual QA checklist (Phase 1)

- Signup works
- Login works
- Logout works
- Forgot password request works
- Incomplete users are redirected to `/onboarding`
- Guests cannot access `/dashboard`
- Non-admin users cannot access `/admin`
