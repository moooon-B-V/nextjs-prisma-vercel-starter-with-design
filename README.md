# nextjs-prisma-vercel-starter-with-design

A production-ready starter for **Next.js + Prisma + Vercel + Neon**, with
a polished design system already wired in. Click "Use this template" above
and ship in minutes — without spending a week building tokens, primitives,
and a theme system from scratch.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmoooon-B-V%2Fnextjs-prisma-vercel-starter-with-design)

## What this is

Everything in
[`nextjs-prisma-vercel-starter`](https://github.com/moooon-B-V/nextjs-prisma-vercel-starter)
— Next.js 16 + Prisma 7 + Tailwind v4 + TypeScript strict mode, deployed
to Vercel with managed Neon Postgres, CI on GitHub Actions, Husky
pre-commit, per-PR Neon DB branches — **plus** a complete, opinionated
design system layered on top:

- **9 primitives** in [`components/ui/`](components/ui/) (Button, Input,
  Textarea, Card, Modal, Pill, Tooltip, Toast, Spinner) — typed,
  ref-forwarding, `cva` variants, no hardcoded hex or px.
- **2 patterns** ([`EmptyState`](components/ui/EmptyState.tsx),
  [`ErrorState`](components/ui/ErrorState.tsx)) — composed from primitives,
  for the two UX situations everyone reinvents badly.
- **4-tier token taxonomy** in [`app/globals.css`](app/globals.css) — base
  tokens, dark-mode overrides, display-style overrides, semantic `--el-*`
  element layer.
- **Two-axis theme system** in
  [`lib/contexts/theme-context.tsx`](lib/contexts/theme-context.tsx) —
  light/dark/system × default/soft display style. FOUC-free init script,
  localStorage persistence, OS-preference sync.
- **A live specimen route at [`/tokens`](app/tokens/page.tsx)** — every
  token rendered as a swatch, every primitive in its variant matrix.
  Toggle theme + display style and watch the system respond via CSS
  variables only — no React re-render on toggle.
- **Inter + Source Serif 4 + JetBrains Mono** wired through `next/font`
  for self-hosted, FOUT-resistant typography.

Read [`docs/design-system.md`](docs/design-system.md) for the canonical
"how to use it" reference (tokens, primitives, patterns, voice & tone,
don'ts), and [`docs/DESIGN.md`](docs/DESIGN.md) for the architectural
spec (token taxonomy, palette/typography/spacing rules, component
implementation notes).

## Why this and not `create-next-app`?

`create-next-app` gives you ~10% of what a real Next.js + Prisma app
needs, and 0% of a design system. This starter gives you the other 90%
of the infrastructure, **plus** the visual layer, with **specific gotchas
already fixed**:

- **`postinstall: prisma generate`** — Vercel's build cache aggressively
  reuses `node_modules`, which stales out Prisma's generated client.
  Without this hook your first deploy after a schema change fails with a
  confusing "Cannot find module '@prisma/client'" error. The fix lives in
  [`package.json`](package.json).
- **Pooled vs. unpooled DATABASE_URL split** — the Vercel-Neon integration
  sets ~10 env vars. The two that matter: `DATABASE_URL` (pooled via
  PgBouncer, fast for runtime queries) and `DATABASE_URL_UNPOOLED`
  (direct, required for Prisma migrations because PgBouncer in
  transaction mode breaks them). [`prisma.config.ts`](prisma.config.ts)
  reads `_UNPOOLED` for migrations, falls back to `DATABASE_URL` for
  local dev. [`lib/db.ts`](lib/db.ts) uses the pooled URL for runtime
  queries.
- **Prisma 7's "config loads on every CLI command" quirk** — `prisma
generate` doesn't need a database connection, but if `prisma.config.ts`
  throws on missing `DATABASE_URL`, even `generate` fails. The config
  block is conditional; CLI commands that need a connection produce
  their own clear errors.
- **pnpm 11 requires Node ≥22.13** — `engines.node: ">=22"` and CI pins
  Node 22.
- **Postgres on host port 5433** — defensive default; many devs already
  have something on 5432. The container internally uses 5432; only the
  host port is shifted.

These took CI failures and Vercel deploy failures to discover. Now they
don't.

## Quickstart

### Option 1: Deploy to Vercel (recommended)

Click the **Deploy with Vercel** button above. Vercel will:

1. Clone this template into your GitHub account
2. Create a Vercel project from the new repo
3. Prompt you to install the **Neon Postgres** integration from Vercel's
   Storage tab — accept it; the integration auto-sets `DATABASE_URL` and
   `DATABASE_URL_UNPOOLED` for both Production and Preview scopes
4. Deploy the placeholder page

Then clone your new repo locally to start building:

```bash
git clone <your-new-repo-url>
cd <your-new-repo>
corepack enable
cp .env.example .env  # then paste your Neon connection string into DATABASE_URL
pnpm install
pnpm dev
```

Visit `http://localhost:3000` for the placeholder, and
`http://localhost:3000/tokens` to see the full design system specimen.

### Option 2: Local-first (Docker Postgres, no Vercel yet)

```bash
git clone <your-new-repo-url>
cd <your-new-repo>
corepack enable
cp .env.example .env  # the default DATABASE_URL points at the Docker DB
pnpm install
./scripts/db-up.sh    # starts Postgres in Docker and applies migrations
pnpm dev              # http://localhost:3000
```

Then connect to Vercel + Neon when you're ready to ship.

## Stack

- **Runtime**: [Node.js](https://nodejs.org) ≥22 (pnpm 11 requires it)
- **Framework**: [Next.js 16](https://nextjs.org) (App Router, React Server Components, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org) (strict mode; `noUncheckedIndexedAccess`, `noImplicitOverride`, `noFallthroughCasesInSwitch`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Design system**: 4-tier token taxonomy + 9 typed primitives + 2 patterns + two-axis theme (light/dark × default/soft). See [`docs/design-system.md`](docs/design-system.md).
- **UI dependencies**: [`@radix-ui`](https://www.radix-ui.com) (Dialog, Tooltip, Toast), [`class-variance-authority`](https://cva.style), [`tailwind-merge`](https://github.com/dcastil/tailwind-merge), [`clsx`](https://github.com/lukeed/clsx), [`lucide-react`](https://lucide.dev)
- **Fonts**: Inter, Source Serif 4, JetBrains Mono via [`next/font/google`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- **Database**: [Postgres 16](https://www.postgresql.org) (local Docker; managed [Neon](https://neon.tech) in production via the [Vercel-Neon integration](https://vercel.com/marketplace/neon))
- **ORM**: [Prisma 7](https://www.prisma.io) with [`@prisma/adapter-pg`](https://www.npmjs.com/package/@prisma/adapter-pg)
- **Lint / format**: [ESLint 9](https://eslint.org) (flat config) + [Prettier 3](https://prettier.io) + [Husky](https://typicode.github.io/husky) pre-commit + [lint-staged](https://github.com/lint-staged/lint-staged)
- **Package manager**: [pnpm](https://pnpm.io) (pinned via `packageManager` field; use `corepack enable`)
- **CI**: [GitHub Actions](https://docs.github.com/actions) — 3 parallel jobs (lint, typecheck, build with Postgres service container)
- **Deploy**: [Vercel](https://vercel.com) with [Neon Postgres](https://neon.tech) (per-PR isolated DB branches for preview deploys)

## Scripts

| Script              | What it does                                 |
| ------------------- | -------------------------------------------- |
| `pnpm dev`          | Start the dev server on `localhost:3000`     |
| `pnpm build`        | Production build (must pass with 0 warnings) |
| `pnpm start`        | Start the production server                  |
| `pnpm lint`         | Run ESLint                                   |
| `pnpm format`       | Run Prettier and write fixes in place        |
| `pnpm format:check` | Run Prettier in check mode (used by CI)      |
| `pnpm typecheck`    | Run `tsc --noEmit`                           |

## Project layout

```
app/          Next.js App Router routes
  globals.css 4-tier design token definitions
  layout.tsx  Root layout (fonts, ThemeProvider, ToastProvider, FOUC init)
  page.tsx    Placeholder home page — replace with your real landing
  tokens/     Live design system specimen route — keep it; delete it; your call.
components/
  ui/         9 primitives + 2 patterns + FormField helper
docs/
  DESIGN.md           Architectural spec of the design system
  design-system.md    Canonical "how to use it" reference
  inspiration/        Source DESIGN.md files (Notion, Figma)
lib/
  contexts/   ThemeProvider (two-axis: pattern × display-style)
  theme/      Theme types + FOUC-prevention init script
  utils/      `cn()` (twMerge + clsx)
  db.ts       Singleton Prisma client with the dev-mode hot-reload guard
prisma/       Prisma schema + migrations. Edit `schema.prisma`, run
              `pnpm prisma migrate dev --name <description>` to generate a
              new migration.
tests/        Add your tests here (Vitest, Playwright, your choice).
scripts/      Dev scripts. `db-up.sh` brings up Docker Postgres + migrations.
public/       Static assets.
.github/
  workflows/  CI definitions.
```

## CI

Runs on every PR and push to `main` via [`.github/workflows/ci.yml`](.github/workflows/ci.yml).
Three parallel jobs:

- **Lint** — `pnpm lint` + `pnpm format:check`
- **TypeScript** — `pnpm prisma generate` then `pnpm typecheck`
- **Build** — `pnpm prisma migrate deploy` then `pnpm build`, against a
  Postgres 16 service container

The Husky pre-commit hook catches lint/format issues before they reach
CI; CI is the backstop. Total runtime targets <3 min on a fresh clone.

## Customizing for your project

After clicking "Use this template," a few things to rename or replace:

1. **`package.json`** — change `"name"` and `"description"`.
2. **`app/page.tsx`** and **`app/layout.tsx`** — replace the placeholder
   content + page metadata.
3. **`docker-compose.yml`** + **`.env.example`** + **`scripts/db-up.sh`**
   \+ **`.github/workflows/ci.yml`** — the DB user/password/name is
   currently `nextjs_prisma_vercel_starter_with_design`; change to match
   your project.
4. **`prisma/schema.prisma`** — delete the `MigrationMarker` placeholder
   once you add your first real model (it exists only so the initial
   migration has something to apply).
5. **`LICENSE`** — replace the copyright holder with your name or org if
   you want, or replace MIT with whatever license fits.

### Customizing the design system

The whole point of the design system is that you don't have to tear it
out — you extend it.

- **Change colors / shape / spacing**: edit the token definitions in
  [`app/globals.css`](app/globals.css). Tokens cascade through everything.
- **Add a new primitive**: drop a new file under `components/ui/`,
  following the patterns already there (cva variants, `cn()`,
  ref-forwarding, JSDoc with examples). Add it to [`/tokens`](app/tokens/page.tsx).
- **Drop the design system entirely**: delete `components/ui/`,
  `app/tokens/`, `lib/contexts/theme-context.tsx`, `lib/theme/`,
  `docs/DESIGN.md`, `docs/design-system.md`, the design-system deps in
  `package.json` (`@radix-ui/*`, `class-variance-authority`, `clsx`,
  `tailwind-merge`, `lucide-react`), the `ThemeProvider` /
  `ToastProvider` / FOUC init script from `app/layout.tsx`, and most of
  `app/globals.css`. At that point you have
  [`nextjs-prisma-vercel-starter`](https://github.com/moooon-B-V/nextjs-prisma-vercel-starter)
  — use that one instead.

## License

[MIT](LICENSE). Fork freely. The copyright notice in LICENSE applies
only to the template files; your additions are yours.
