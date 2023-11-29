import { sendWelcomeEmail } from "@/lib/emails";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let { email, token } = await req.json();

  if (token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json(
      {},
      {
        status: 404,
      }
    );
  }
  if (!email) {
    email = "armandoc9943@gmail.com";
  }
  try {
    await sendWelcomeEmail(email);

    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.log("Email sending error", error);

    return NextResponse.json({ error });
  }
}
