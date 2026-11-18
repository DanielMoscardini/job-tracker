# Job Tracker

A small web app to track my job applications. It is a learning project: I want to understand every line, so I write the core code and Claude reviews, explains and helps.

## Features (MVP)
- List applications with filter by status and search by company or role
- Create, edit and delete an application
- Statuses: applied, interview, rejected, offer

## Data model
Application: id, company, role, url, status, appliedAt, notes

Decisions (market standard, can be revisited with a reason):
- `id`: string (UUID, generated with `crypto.randomUUID()`; matches Supabase default)
- `company`, `role`: required, non-empty strings
- `url`, `notes`: optional
- `status`: string literal union derived from a const array, so types, validation and UI share one source of truth:
  `export const STATUSES = ["applied", "interview", "rejected", "offer"] as const;`
  `export type Status = (typeof STATUSES)[number];`
- `appliedAt`: date-only string `YYYY-MM-DD` (avoids timezone problems)
- `createdAt`, `updatedAt`: ISO 8601 timestamps, set by the server

## Stack
Next.js (App Router), TypeScript, Tailwind. Supabase for the database (later in the week). Deploy on Vercel.

## Architecture decisions
- Backend: Route Handlers (`app/api/applications/...`) called from the client with `fetch`. No Server Actions, so the path from click to database stays explicit.
- Data layer: all persistence lives in one module (`lib/applications.ts`) exposing `list`, `getById`, `create`, `update`, `remove`. Routes never touch storage directly.
- Until Supabase: the data layer persists to a local JSON file (`data/applications.json`, git-ignored). Switching to Supabase must only change `lib/applications.ts`.
- Validation: Zod schemas, run on the server in every route. Client-side validation is only for UX.
- Filter and search state lives in URL search params (`?status=interview&q=acme`), not in local state.
- API errors: consistent JSON shape `{ error: string }` with proper HTTP status codes (400, 404, 500).
- Tooling: ESLint + Prettier, strict TypeScript, secrets only in `.env.local` (never committed).

## Out of scope for now
Authentication, AI features, multiple users.

## Roadmap (one feature at a time)
1. Project setup, types, data layer
2. List (GET)
3. Create (POST) and validation
4. Edit and delete
5. Filter and search
6. Replace the data layer with Supabase
7. Deploy on Vercel

## How Claude should work with me
- Reply to me in Portuguese. Code, comments, commits and README in English.
- Always propose a plan first and wait for my approval before writing code.
- I write the core: types, API routes, fetch calls, state logic, validations. You review it, point out bugs and explain why.
- You may write Tailwind styling and repetitive boilerplate, only when I ask.
- One feature at a time. Small commits, with messages I write.
- Before changing any file, tell me what and why. Explain every diff.
- When I get stuck, give a hint first, not the full solution.
- At the end of the project, Claude plants a bug in the code for me to find (see "Done means").

## Done means
I can explain the path from a click to the database in 2 minutes, add a new field end to end without help, and find a bug planted in the code.
