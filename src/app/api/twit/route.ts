import { writeTweet } from "@/lib/twitter";
import { verifyAdmins } from "../../../lib/mx-utils";
export const POST = async (req: Request) => {
  let { token, text } = await req.json();

  if (!token || !text) {
    return Response.json(
      {
        message: "No text or token found",
      },
      {
        status: 400,
      }
    );
  }

  const ok = verifyAdmins(token);
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
