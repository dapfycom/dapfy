import { createClient } from "@libsql/client";
import { NextResponse } from "next/server";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    // Insert email into waitlist table
    const result = await client.execute({
      sql: "INSERT INTO waitlist (email) VALUES (?)",
      args: [email],
    });

    return NextResponse.json({
      message: "Email added to waitlist",
      data: { email, id: Number(result.lastInsertRowid) },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error adding email to waitlist:", error);

    // Check for unique constraint violation
    if (error.message?.includes("UNIQUE constraint failed")) {
      return NextResponse.json(
        { error: "Email already exists in waitlist" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to add email to waitlist" },
      { status: 500 }
    );
  }
}
