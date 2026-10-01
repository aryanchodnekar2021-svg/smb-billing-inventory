import type { NextAuthOptions } from "next-auth";

/**
 * Authentication foundation (Milestone 0).
 *
 * Decision: use Auth.js (next-auth v4) — a mature, maintained session
 * solution for Next.js — instead of homemade authentication.
 *
 * Status: NOT wired to any provider or database yet. The options object
 * below is the integration point for the future auth milestone
 * (providers + Prisma adapter + protected routes). No credentials,
 * secrets or user handling live here.
 */
export const authOptions: NextAuthOptions = {
  // Providers will be added in the auth milestone, e.g.:
  // providers: [...],
  providers: [],
  session: { strategy: "jwt" },
  pages: {},
};
