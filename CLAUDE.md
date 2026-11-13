# CLAUDE.md

@AGENTS.md

## Project

Cyprex Health patient portal — patients book, reschedule and cancel visits. It sits alongside the marketing site https://cyprexhealth.com and must match its brand. **Scope is the patient side only; there is no provider/admin side.** Next.js 16 (App Router), React 19, Tailwind v4, shadcn/ui. No real auth or API yet — screens run on sample data.

## Commands

```bash
npm run dev         # dev server on http://localhost:3000
npm run build       # production build
npm run lint        # eslint
npm run typecheck   # tsc --noEmit
npm run format      # prettier --write
npx shadcn@latest add <component>   # add a shadcn/ui primitive
```

No test runner yet. **Before finishing any change, run `npm run typecheck`, `npm run lint` and `npm run format`, and fix what they report.**

## Structure

```
app/
  layout.tsx                 # root: fonts, metadata, ThemeProvider
  page.tsx                   # public landing (/)
  (auth)/                    # /login, /signup — logo-only header, split brand panel + form card
  (dashboard)/               # /dashboard, /appointments, /services, /profile — patient nav, AppointmentsProvider
components/
  ui/                        # shadcn primitives (generated)
  brand/                     # Logo, Highlight
  layout/                    # TopBar, PatientHeader (nav), PageHeader, SiteFooter
  appointments/              # booking dialog, cards, list, AppointmentsProvider
  auth/                      # login/signup forms
  services/
lib/
  schemas/<concept>.ts       # zod schemas + inferred types (auth.ts, appointments.ts)
  appointments.ts            # time slots, sorting, label lookups
  services.ts                # treatments, each mapped to a bookable visit type
  sample-data.ts             # placeholder patient/provider/appointments (until the API exists)
  format.ts                  # date/time/name formatting (date-fns)
```

- New patient pages go in `(dashboard)/` and get added to `navItems` in `components/layout/patient-header.tsx`. Public pages go in `(auth)/` or the root and must not show the signed-in nav.
- Layouts must render `children`.
- Kebab-case file names. Descriptive component names (`AppointmentsPage`). Default exports only for Next files (page, layout, etc.); named exports elsewhere.
- Always import with `@/` (maps to repo root).

## Next.js 16

- APIs differ from older versions. `node_modules/next/dist/docs/` is not present in this install — when unsure about an API, check nextjs.org/docs (v16), don't rely on memory.
- `params`, `searchParams`, `cookies()`, `headers()` are async — `await` them.
- Request interception goes in `proxy.ts` (not `middleware.ts`).
- Server Components by default. Put `"use client"` on the smallest component that needs state, effects, handlers or browser APIs.
- Every page sets `export const metadata: Metadata = { title: "..." }` (root applies `%s | Cyprex Health`).

## Brand and UI

- Brand comes from cyprexhealth.com. Tokens live in `app/globals.css` (oklch, light + dark). Use tokens only, never raw colors:
  - `primary` brand green · `brand-deep` deep green panels/hero · `heading` heading color · `gold` accents/eyebrows · `secondary`/`accent` mint · `leaf` logo sprout.
- Fonts: Cormorant → `font-heading` (h1–h3 get it automatically), Plus Jakarta Sans → `font-sans`, Playfair Display → `font-logo` (logo only).
- Patterns to reuse rather than reinvent:
  - Page top: `<PageHeader eyebrow title description action />`.
  - Signature heading accent: `<Highlight>` (italic on a mint band) — one per heading at most.
  - Rounded surfaces: cards `rounded-2xl`/`rounded-3xl border bg-card`, pill buttons `rounded-full`.
  - Gold text is for small uppercase eyebrows; gold buttons use `text-gold-foreground` (dark) for contrast.
- Every screen must work in light and dark mode (press `d` to toggle) and down to phone width.
- shadcn style `radix-nova`; primitives from the unified `radix-ui` package. Add primitives with the shadcn CLI, don't hand-write them, and wrap rather than edit `components/ui/`. Use shadcn `Select`/`Calendar`, never native `<select>`/date inputs.
- Icons: `lucide-react`. `cn` from `@/lib/utils`.
- Prettier: no semicolons, double quotes, trailing commas `es5`, sorted Tailwind classes.

## Booking

- Visit types and formats (telehealth / in person) are defined once in `lib/schemas/appointments.ts`; label lookups in `lib/appointments.ts`. Add new services to `lib/services.ts` with a matching visit type.
- Open booking via `<BookVisitButton defaultVisitType? />`; rescheduling reuses `BookingDialog` with an `appointment`. Don't build a second booking form.
- `AppointmentsProvider` / `useAppointments()` hold appointments in memory (reset on full reload). When the API lands, reimplement its internals with react-query and keep the hook's shape.

## Forms

- react-hook-form + zod **v4** via `zodResolver`, rendered with shadcn `Field`, `FieldLabel`, `FieldError` and `Controller`.
- Schemas in `lib/schemas/<concept>.ts`. Export inferred types next to them (`export type LoginInput = z.infer<typeof loginSchema>`) and use those instead of hand-written types.

## Data

- **The backend and API integration are owned by another developer. Don't build an API client, react-query wiring, env config or endpoint contracts unless explicitly asked.** Focus on pages and UI.
- Screens run on `lib/sample-data.ts` via `AppointmentsProvider`. Keep data access behind `useAppointments()` and the `lib/` helpers so the integration can swap it in later.
- Login/signup currently just redirect to `/dashboard` (marked `TODO`).

## TypeScript

- Strict mode. No `any` — use `unknown` and narrow, or derive types from zod.

## Patient data

- Never log patient details, never put them in URLs, never use realistic-looking patient data in code — obvious fakes only (e.g. "Jane Sample").
- Don't present the app as a demo or add "fictional" disclaimers; it's the real product.
- Accessible by default: labelled inputs, keyboard-reachable controls, sufficient contrast.

## Git

- Conventional Commits: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `style:`.
- `AGENTS.md` is regenerated by `next dev` — commit its changes, don't fight them.
