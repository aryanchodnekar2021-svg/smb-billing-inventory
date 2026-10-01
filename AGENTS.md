# BizFlow — agent notes (M2: multi-tenant DB foundation)

- Stack: Next.js 16 App Router (`src/app`), React 19, TypeScript (strict), Tailwind CSS v4.
- Conventions: `@/*` maps to `src/*`; UI primitives in `src/components/ui`; layout in
  `src/components/layout`; config in `src/config`; helpers in `src/lib`; server-only code
  (Prisma, auth) in `src/server` — never import `src/server` from client components.
- Env: validated in `src/lib/env.ts` (zod); document keys in `.env.example`; never commit `.env`.
- Database: PostgreSQL 16 + Prisma 6. Models: `User`, `Business` (tenant boundary),
  `BusinessMember` (unique `[userId, businessId]`, cascades fan in to join table only),
  `Role` enum (`OWNER|ADMIN|MANAGER|STAFF`, data model only). Migrations live in
  `prisma/migrations` — never hand-write them; use `npx prisma migrate dev --name <name>`.
  Future tenant-owned models MUST reference `Business` via `businessId`.
- Auth: Auth.js (`next-auth` v4) is the chosen approach; `src/server/auth.ts` is a stub.
  Do not build homemade auth. No passwords/sessions stored anywhere.
- Scope guard: auth/authz, billing, POS, inventory, products, customers, suppliers,
  GST, invoices, payments, reports, subscriptions are all still out of scope until
  their milestone is selected.
- Verify with: `npm run typecheck`, `npm run lint`, `npm test` (DB tests need a live
  `DATABASE_URL` and skip otherwise), `npm run build`, `npx prisma validate`,
  `npx prisma migrate status`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
