import { NextResponse } from "next/server";

/**
 * Foundation health endpoint.
 * Returns static status only — it never touches the database, so a healthy
 * response does not imply database connectivity (use `prisma migrate status`
 * and the DB integration tests for that).
 */
export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      app: "bizflow",
      milestone: 2,
      database: "provisioned-local",
    },
    { status: 200 },
  );
}
