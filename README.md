# BizFlow

Billing, inventory and business management SaaS for small Indian businesses.

> **Status: Milestone 0 — SaaS foundation only.** The app shell (sidebar, header,
> dashboard empty state, placeholder routes), design system, Prisma/PostgreSQL
> plumbing and tooling are in place. No business features (billing, POS,
> inventory, products, customers, suppliers, GST, invoices, payments, reports,
> subscriptions) are implemented yet.

## Purpose

Production-oriented starting point for a billing + inventory + customers +
suppliers + reports + GST-ready product for small Indian retail businesses.
This milestone establishes architecture, conventions and empty states so later
milestones can add real features without re-plumbing.

## Technology stack

| Layer      | Choice                                                        |
| ---------- | ------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router) + React 19 + TypeScript               |
| Styling    | Tailwind CSS v4                                               |
| UI         | Hand-rolled reusable components (`src/components/ui`)         |
| Validation | Zod (env + future form/domain validation)                     |
| Auth       | Auth.js / next-auth v4 (decision made; not wired yet)         |
| Database   | PostgreSQL via Prisma ORM (`prisma/schema.prisma`, no models yet) |
| Testing    | Node built-in test runner (`node --test tests/`)              |
| Lint/type  | ESLint (`eslint-config-next`) + `tsc --noEmit`                |

Backend uses Next.js Route Handlers / server modules (`src/server`, `src/app/api`).
No separate backend service.

## Prerequisites

- Node.js 20+ (developed with Node 24)
- npm 10+
- PostgreSQL 15+ (only needed once migrations land; not required to run Milestone 0)

## Installation

```bash
git clone https://github.com/aryanchodnekar2021-svg/smb-billing-inventory.git
cd smb-billing-inventory
npm install
```

## Environment setup

```bash
cp .env.example .env
# Edit .env — DATABASE_URL can stay empty until the database milestone.
```

Required keys (see `.env.example`): `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`.
Never commit `.env`. Never put real credentials in source code.

## Development

```bash
npm run dev
```

Open <http://localhost:3000>. You should see the BizFlow shell with an empty-state
dashboard (₹0 / 0 counts) and placeholder navigation.

## Build

```bash
npm run build
npm run start
```

## Testing

```bash
npm test          # node --test foundation smoke tests
npm run typecheck # tsc --noEmit
npm run lint      # eslint
```

Health check: `GET /api/health` returns `{ "status": "ok", ... }`.

## Project structure

```text
src/
├── app/                  # Routes: dashboard, 8 placeholders, api/health, states
├── components/
│   ├── ui/               # Button, Card, Input, Table/Badge, Empty/Loading/Error states
│   └── layout/           # AppShell, Sidebar, Header, PlaceholderPage
├── config/               # site + navigation
├── lib/                  # utils (cn), format (INR), env (zod validation)
├── server/               # db (Prisma singleton), auth (next-auth options stub)
└── types/                # shared foundation types
prisma/
└── schema.prisma         # PostgreSQL datasource, no models yet
tests/
└── smoke.test.mjs        # foundation assertions
```

## Current status

- [x] Milestone 0: repository preflight, Next.js + TS + Tailwind scaffold, app shell,
      design system, Prisma foundation, env pattern, CI, docs
- [ ] Business features: none yet (products, inventory, billing, GST, … all pending)

## Security notes

- No secrets committed; `.env` is git-ignored and only `.env.example` is tracked.
- Auth is intentionally unwired — no homemade sessions; Auth.js lands in its own milestone.
- `npm audit` reports 3 high-severity advisories in Prisma's transitive `deepmerge-ts`
  dependency (upstream, no safe auto-fix at this pin); tracked as a known issue.
- Do not treat this foundation as a production security review.
