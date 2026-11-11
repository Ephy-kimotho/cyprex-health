# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Cyprex Health — a web app where patients book appointments with providers. Early stage: currently a Next.js 16 (App Router) + shadcn/ui scaffold with dependencies installed but little feature code yet.

## Commands

```bash
npm run dev         # start dev server (next dev)
npm run build       # production build
npm run lint        # eslint (flat config, next core-web-vitals + typescript)
npm run typecheck   # tsc --noEmit
npm run format      # prettier --write on all .ts/.tsx
npx shadcn@latest add <component>   # add a shadcn/ui component into components/ui/
```

No test runner is configured yet.

## Stack notes

- **Next.js 16.4 / React 19.3** — APIs differ from older versions; check `node_modules/next/dist/docs/` before using a Next API (see AGENTS.md).
- **Tailwind CSS v4** — no `tailwind.config`; theme tokens (oklch CSS variables, light/dark) live in `app/globals.css`. Use semantic tokens (`bg-primary`, `text-muted-foreground`, etc.) rather than raw colors.
- **shadcn/ui** (`components.json`: style `radix-nova`, RSC enabled, lucide icons). Primitives come from the unified `radix-ui` package (e.g. `import { Slot } from "radix-ui"`).
- **`cn`** is the `cn` npm package (a clsx + tailwind-merge replacement), re-exported from `lib/utils.ts`. Import it from `@/lib/utils`.
- **Theming**: `components/theme-provider.tsx` wraps `next-themes` (class-based) and adds a `d` hotkey to toggle dark mode.
- **Fonts** (`app/layout.tsx`): Inter → `--font-sans`, Space Grotesk → `--font-heading`, Geist Mono → `--font-mono`.
- **Data fetching**: `@tanstack/react-query` and `axios` are installed but not wired up yet (no `QueryClientProvider` in the layout).
- Path alias `@/*` maps to the repo root.
- Prettier: no semicolons, double quotes, trailing commas `es5`, tailwind class sorting (also inside `cn()` and `cva()`).

## Conventions

### Forms and validation
- All forms use **react-hook-form** with **zod** validation via `zodResolver` from `@hookform/resolvers/zod`. Zod is **v4**.
- Zod schemas live in `lib/schemas/<concept>.ts`, one file per domain concept — e.g. auth schemas in `lib/schemas/auth.ts`, patient schemas in `lib/schemas/patients.ts`, appointment schemas in `lib/schemas/appointments.ts`.
- Export inferred types alongside schemas (`export type LoginInput = z.infer<typeof loginSchema>`) and reuse those types instead of hand-writing form/value types.

### Formatting utilities
- Display/formatting helpers (dates, times, names, phone numbers, currency, etc.) go in `lib/format.ts`. Use `date-fns` for date/time formatting.
