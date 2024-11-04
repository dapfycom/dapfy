import { neon, neonConfig } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

// Configure connection pooling and timeouts
neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    // Insert email into waitlist table using Neon
    const result = await sql`
      INSERT INTO waitlist (email) 
      VALUES (${email}) 
      RETURNING id`;

    return NextResponse.json({
      message: "Email added to waitlist",
      data: { email, id: result[0].id },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);

    console.error("Error adding email to waitlist:", error);

    // Check for unique constraint violation (Neon uses Postgres error codes)
    if (error.code === "23505") {
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
