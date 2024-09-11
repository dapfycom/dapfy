import { supabaseAdmin } from "@/lib/supabase-admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("waitlist")
      .insert([{ email }])
      .select();

    if (error) throw error;

    return NextResponse.json({ message: "Email added to waitlist", data });
  } catch (error) {
    console.error("Error adding email to waitlist:", error);
    return NextResponse.json(
      { error: "Failed to add email to waitlist" },
      { status: 500 }
    );
  }
}
