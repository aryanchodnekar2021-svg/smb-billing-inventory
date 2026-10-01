# BizFlow

Billing, inventory and business management SaaS for small Indian businesses.

> **Status: M2 — multi-tenant database foundation.** The app shell (sidebar, header,
> dashboard empty state, placeholder routes), design system, and the PostgreSQL +
> Prisma multi-tenant foundation (`User`, `Business`, `BusinessMember`, `Role`
> enum + first migration) are in place. No business features (billing, POS,
> inventory, products, customers, suppliers, GST, invoices, payments, reports,
> subscriptions) and no authentication/authorization are implemented yet.

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
| Testing    | Node built-in test runner (`npm test` → `node --test "tests/**/*.test.mjs"`) |
| Lint/type  | ESLint (`eslint-config-next`) + `tsc --noEmit`                |

Backend uses Next.js Route Handlers / server modules (`src/server`, `src/app/api`).
No separate backend service.

## Prerequisites

- Node.js 20+ (developed with Node 24)
- npm 10+
- PostgreSQL 16 (local development database — see below)

## Installation

```bash
git clone https://github.com/aryanchodnekar2021-svg/smb-billing-inventory.git
cd smb-billing-inventory
npm install
```

## Environment setup

```bash
cp .env.example .env
# Edit .env — set DATABASE_URL to your local PostgreSQL connection string.
```

Required keys (see `.env.example`): `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`.
Never commit `.env`. Never put real credentials in source code.

## Local database setup

No Docker or cloud database is required. Any local PostgreSQL 16 instance works:

```bash
# 1. Create the role and database (example values — use your own password)
psql -U postgres -d postgres -c "CREATE ROLE bizflow LOGIN PASSWORD '<password>' CREATEDB;"
psql -U postgres -d postgres -c "CREATE DATABASE bizflow OWNER bizflow;"

# 2. Point .env at it
# DATABASE_URL=postgresql://bizflow:<password>@127.0.0.1:5432/bizflow?schema=public

# 3. Apply migrations and generate the client
npx prisma migrate dev
```

Other useful commands:

```bash
npx prisma validate       # validate schema (needs DATABASE_URL set)
npx prisma generate       # regenerate Prisma Client (no live DB needed)
npx prisma migrate status # check applied vs pending migrations
npx prisma studio         # inspect data (dev only, never seed fake production data)
```

Migration workflow: model changes go in `prisma/schema.prisma`, then
`npx prisma migrate dev --name <descriptive_name>` creates and applies a real
migration under `prisma/migrations/`. Never hand-write migration files and never
commit a real `DATABASE_URL`.

## Current database models (M2)

Tenant boundary: `Business`. A user may belong to many businesses via
`BusinessMember`; a business may have many users. `Role` is `OWNER | ADMIN |
MANAGER | STAFF` (data model only — no permission system yet).

| Model          | Key fields                                                                 |
| -------------- | -------------------------------------------------------------------------- |
| User           | id, email (unique), name?, createdAt, updatedAt                            |
| Business       | id, name, slug (unique), createdAt, updatedAt                              |
| BusinessMember | id, userId → User (cascade), businessId → Business (cascade), role, unique(userId, businessId) |

Deleting a user removes only their membership rows; deleting a business removes
only its membership roster — cascades fan in to the join table and can never
destroy unrelated tenant data. Future tenant-owned models (Product, Inventory,
Customer, …) must reference `Business` via `businessId`.

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
├── schema.prisma         # PostgreSQL datasource + User/Business/BusinessMember/Role
└── migrations/           # real applied migrations (init_multi_tenant_foundation)
tests/
├── smoke.test.mjs        # foundation assertions
└── db.multitenant.test.mjs # multi-tenant integrity tests (need live DB; skip otherwise)
```

## Current status

- [x] M1: repository preflight, Next.js + TS + Tailwind scaffold, app shell,
      design system, Prisma foundation, env pattern, CI, docs
- [x] M2: local PostgreSQL, multi-tenant models (User, Business, BusinessMember,
      Role), first real migration, DB integrity tests
- [ ] Auth/authz, products, inventory, billing, GST, … all pending (separate milestones)

## Security notes

- No secrets committed; `.env` is git-ignored and only `.env.example` is tracked.
- Auth is intentionally unwired — no homemade sessions; Auth.js lands in its own milestone.
- `npm audit` reports 3 high-severity advisories in Prisma's transitive `deepmerge-ts`
  dependency (upstream, no safe auto-fix at this pin); tracked as a known issue.
- Do not treat this foundation as a production security review.
