import { z } from "zod";

/**
 * Safe environment configuration pattern.
 *
 * - Server code should read `process.env` through this module.
 * - Missing/invalid values fail fast with a clear error.
 * - Never commit `.env`; see `.env.example` for required keys.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required").optional(),
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().min(1).optional(),
});

function loadEnv() {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    // Log a readable error in development; throw so misconfiguration is loud.
    console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables. See .env.example.");
  }
  return parsed.data;
}

export type AppEnv = z.infer<typeof envSchema>;

export const env: AppEnv = loadEnv();
