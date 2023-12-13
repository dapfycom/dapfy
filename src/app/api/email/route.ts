import { sendWelcomeEmail } from "@/lib/emails";
import { verifyAdmins } from "@/lib/mx-utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let { email } = await req.json();

  // authorization user to this route
  const token = req.headers.get("Authorization")?.split(" ")[1];
  const ok = verifyAdmins(token || "");
  if (!ok) {
    return Response.json(
      {
        message: "invalid signature",
        data: {
          token,
          isValid: ok,
        },
      },
      {
        status: 403,
      }
    );
  }
  // end authorization

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
