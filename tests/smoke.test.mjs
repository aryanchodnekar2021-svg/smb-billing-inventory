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

  it("prisma foundation has datasource but no business models yet", () => {
    const schema = readFileSync(join(root, "prisma", "schema.prisma"), "utf8");
    assert.match(schema, /datasource db/);
    assert.match(schema, /provider = "postgresql"/);
    assert.doesNotMatch(schema, /model\s+\w+/);
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
