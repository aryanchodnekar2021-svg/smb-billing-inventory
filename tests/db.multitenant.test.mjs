import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Minimal .env loader (no extra dependency): makes `npm test` work for local
 * developers who followed README setup, while CI provides real env vars.
 * Existing process env always wins; values here are dev-only.
 */
function loadLocalEnv() {
  const envFile = join(root, ".env");
  if (!existsSync(envFile)) return;
  for (const line of readFileSync(envFile, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const key = trimmed.slice(0, trimmed.indexOf("=")).trim();
    const value = trimmed.slice(trimmed.indexOf("=") + 1).trim();
    if (key && !(key in process.env)) process.env[key] = value;
  }
}

loadLocalEnv();

const { PrismaClient, Prisma } = await import("@prisma/client");

const VALID_ROLES = ["OWNER", "ADMIN", "MANAGER", "STAFF"];
const runId = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
const emailFor = (tag) => `m2-${tag}-${runId}@bizflow-test.local`;
const slugFor = (tag) => `m2-${tag}-${runId}`;

let db = null;

async function probeDatabase() {
  if (!process.env.DATABASE_URL) return false;
  const client = new PrismaClient();
  try {
    await client.$queryRaw`SELECT 1`;
    db = client;
    return true;
  } catch {
    await client.$disconnect().catch(() => {});
    return false;
  }
}

function requireDb(t) {
  if (!db) {
    t.skip("DATABASE_URL unreachable — run `npx prisma migrate dev` locally to exercise DB tests");
    return false;
  }
  return true;
}

describe("BizFlow multi-tenant database foundation", () => {
  let userA;
  let userB;
  let businessOne;
  let businessTwo;

  before(async () => {
    await probeDatabase();
  });

  after(async () => {
    if (!db) return;
    // Leave no residue: tests must not populate the dev database.
    await db.businessMember.deleteMany({
      where: { user: { email: { contains: runId } } },
    });
    await db.business.deleteMany({ where: { slug: { contains: runId } } });
    await db.user.deleteMany({ where: { email: { contains: runId } } });
    await db.$disconnect();
  });

  it("1. a User can exist", async (t) => {
    if (!requireDb(t)) return;
    userA = await db.user.create({
      data: { email: emailFor("owner"), name: "M2 Owner" },
    });
    assert.ok(userA.id, "user has a stable primary key");
    assert.equal(userA.email, emailFor("owner"));
    assert.ok(userA.createdAt instanceof Date);
    assert.ok(userA.updatedAt instanceof Date);
  });

  it("2. a Business can exist", async (t) => {
    if (!requireDb(t)) return;
    businessOne = await db.business.create({
      data: { name: "M2 Test Store", slug: slugFor("store-one") },
    });
    assert.ok(businessOne.id, "business has a stable primary key");
    assert.equal(businessOne.slug, slugFor("store-one"));
    assert.ok(businessOne.createdAt instanceof Date);
  });

  it("3. a User can become a BusinessMember with a valid role", async (t) => {
    if (!requireDb(t)) return;
    const membership = await db.businessMember.create({
      data: { userId: userA.id, businessId: businessOne.id, role: "OWNER" },
    });
    assert.equal(membership.userId, userA.id);
    assert.equal(membership.businessId, businessOne.id);
    assert.ok(VALID_ROLES.includes(membership.role), `role is valid: ${membership.role}`);
  });

  it("4. the same user cannot be added twice to the same business", async (t) => {
    if (!requireDb(t)) return;
    await assert.rejects(
      db.businessMember.create({
        data: { userId: userA.id, businessId: businessOne.id, role: "ADMIN" },
      }),
      (err) =>
        err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002",
      "duplicate (userId, businessId) violates the composite unique constraint",
    );
  });

  it("5. a user can belong to multiple businesses", async (t) => {
    if (!requireDb(t)) return;
    businessTwo = await db.business.create({
      data: { name: "M2 Second Store", slug: slugFor("store-two") },
    });
    await db.businessMember.create({
      data: { userId: userA.id, businessId: businessTwo.id, role: "ADMIN" },
    });
    const withMemberships = await db.user.findUniqueOrThrow({
      where: { id: userA.id },
      include: { memberships: true },
    });
    assert.equal(withMemberships.memberships.length, 2);
  });

  it("6. a business can have multiple users", async (t) => {
    if (!requireDb(t)) return;
    userB = await db.user.create({
      data: { email: emailFor("staff"), name: "M2 Staff" },
    });
    await db.businessMember.create({
      data: { userId: userB.id, businessId: businessOne.id, role: "STAFF" },
    });
    const withMembers = await db.business.findUniqueOrThrow({
      where: { id: businessOne.id },
      include: { members: { include: { user: true } } },
    });
    assert.equal(withMembers.members.length, 2);
    const emails = withMembers.members.map((m) => m.user.email).sort();
    assert.deepEqual(emails, [emailFor("owner"), emailFor("staff")].sort());
  });

  it("7. memberships traverse both directions (User <-> Business)", async (t) => {
    if (!requireDb(t)) return;
    const membership = await db.businessMember.findFirstOrThrow({
      where: { userId: userB.id, businessId: businessOne.id },
      include: { user: true, business: true },
    });
    assert.equal(membership.user.email, emailFor("staff"));
    assert.equal(membership.business.slug, slugFor("store-one"));
    assert.equal(membership.role, "STAFF");
  });
});
