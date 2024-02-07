import { writeTweet } from "@/lib/twitter";
import axios from "axios";
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
  try {
    const data = await writeTweet({
      text: text,
    });

    await axios.post("https://report.dapfy.com/report-tweet");
    return Response.json(
      {
        message: data.detail,
        data,
      },
      {
        status: data.status,
      }
    );
  } catch (error) {
    console.log("Error", error);
    return Response.json(
      {
        message: "Error",
        error,
      },
      {
        status: 500,
      }
    );
  }
};
