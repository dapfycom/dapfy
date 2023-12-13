import { writeTweet } from "@/lib/twitter";
import { verifyAdmins } from "../../../lib/mx-utils";
export const POST = async (req: Request) => {
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

  let { text } = await req.json();

  if (!text) {
    return Response.json(
      {
        message: "No text found",
      },
      {
        status: 400,
      }
    );
  }

  writeTweet({
    text: text,
  });
  return Response.json(
    {
      message: "success",
      data: {
        token,
        isValid: ok,
      },
    },
    {
      status: 200,
    }
  );
};
