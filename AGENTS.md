# AGENTS.md - Cursor Project Rules

## Project identity
This project is a trust-first web platform for solo travelers in India to discover compatible co-travelers and collaboratively plan trips.

## Locked stack
- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- shadcn/ui
- Supabase (Auth, Postgres, Storage, Realtime)
- Zod
- React Hook Form
- Razorpay later only

## Non-negotiable rules
1. Do not replace Next.js with React + Vite.
2. Do not redesign the architecture without explicit approval.
3. Build phase by phase only.
4. Do not add AI features in MVP.
5. Do not add payment or subscription logic in MVP.
6. Do not add booking/package logic.
7. Do not introduce Redux unless explicitly requested.
8. Use strict TypeScript.
9. Use Supabase Row Level Security for sensitive data access.
10. Never expose service-role keys to the browser.

## Build style
- Prefer server components by default.
- Use client components only where needed for interactivity.
- Keep route handlers small and purpose-specific.
- Use Zod for schema validation.
- Use feature-based folder organization.
- Keep forms simple and production-minded.
- Mobile-first responsive UI.
- Calm, trustworthy design language.

## Product constraints
- India-only launch
- 18+ only
- No mandatory Aadhaar in MVP
- Platform/intermediary only, not a trip organizer
- Trust and safety are first-class features

## Data and security rules
- RLS on all user-generated tables
- Public profiles expose only intended public fields
- Private data is owner-only unless moderator/admin access is explicitly required
- Room data is member-only
- Reports and moderation data are privileged
- Blocked users must not appear in discovery or room invitation flows where applicable

## Coding workflow in Cursor
- Start each major task in Plan Mode
- Create or update a markdown plan before large changes
- Implement one phase at a time
- After each phase, run lint, typecheck, and relevant tests
- Refactor only within scope; do not add unapproved features

## Phase order
1. Foundation
2. Profile and travel intent
3. Discovery
4. Trip rooms and collaboration
5. Trust and safety
6. Admin and moderation
7. Production hardening

## Before editing code
Review:
- docs/PRD.md
- AGENTS.md
- existing folder structure
- existing migrations

## Deliverable expectations
Every substantial feature should include:
- typed UI
- validation
- loading/error states
- route access checks
- RLS-aware data access
- basic test coverage where practical
