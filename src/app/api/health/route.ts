import { NextResponse } from "next/server";

/**
 * Foundation health endpoint.
 * Returns static status only — no database access in Milestone 0.
 */
export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      app: "bizflow",
      milestone: 0,
      database: "not-provisioned",
    },
    { status: 200 },
  );
}
