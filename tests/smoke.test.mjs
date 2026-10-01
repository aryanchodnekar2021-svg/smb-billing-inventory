import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("BizFlow foundation smoke tests", () => {
  it("package.json exposes required scripts", () => {
    const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
    for (const script of ["dev", "build", "lint", "typecheck", "test"]) {
      assert.ok(pkg.scripts[script], `missing script: ${script}`);
    }
  });

  it("all placeholder routes exist", () => {
    const routes = [
      "products",
      "inventory",
      "customers",
      "suppliers",
      "sales",
      "invoices",
      "reports",
      "settings",
    ];
    for (const route of routes) {
      assert.ok(
        existsSync(join(root, "src", "app", route, "page.tsx")),
        `missing route: ${route}`,
      );
    }
  });

  it("prisma schema has the multi-tenant foundation models only", () => {
    const schema = readFileSync(join(root, "prisma", "schema.prisma"), "utf8");
    assert.match(schema, /datasource db/);
    assert.match(schema, /provider = "postgresql"/);
    for (const model of ["model User", "model Business", "model BusinessMember"]) {
      assert.ok(schema.includes(model), `missing model: ${model}`);
    }
    assert.match(schema, /enum Role/);
    for (const forbidden of [
      "model Product",
      "model Customer",
      "model Supplier",
      "model Invoice",
      "model Sale",
      "model Payment",
    ]) {
      assert.ok(!schema.includes(forbidden), `out-of-scope model present: ${forbidden}`);
    }
  });

  it(".env.example documents required keys without secrets", () => {
    const example = readFileSync(join(root, ".env.example"), "utf8");
    for (const key of ["DATABASE_URL", "NEXTAUTH_URL", "NEXTAUTH_SECRET"]) {
      assert.ok(example.includes(key), `missing env key: ${key}`);
    }
    // No real credentials: DATABASE_URL must be empty in the template.
    assert.match(example, /DATABASE_URL=\s*(#|$)/m);
  });
});
