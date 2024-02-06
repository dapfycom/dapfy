import { verifyAdmins } from "@/lib/mx-utils";
import { NextResponse } from "next/server";
import { z } from "zod";
import { UserAddressHasInteracted } from "./functions";
const dataSchema = z.object({
  from: z.coerce.date(),
  to: z.coerce.date(),
  address: z.string().optional(),
  addressList: z.array(z.string()).optional(),
});
export const POST = async (req: Request) => {
  let payload: {
    from: Date;
    to: Date;
    address?: string | undefined;
    addressList?: string[] | undefined;
  };
  try {
    payload = dataSchema.parse(await req.json());

    if (!payload.addressList && !payload.address) {
      throw new Error("Address or list of address required");
    }
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }

  if (payload.address !== undefined) {
    const hasInteracted = await UserAddressHasInteracted(payload);
    return NextResponse.json({ data: hasInteracted });
  } else if (payload.addressList !== undefined) {
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

    const hasInteracted = await Promise.all(
      payload.addressList.map(async (address) => {
        try {
          return await UserAddressHasInteracted({ ...payload, address });
        } catch (error) {
          console.log(error);

          // if fails put the user inside the list
          return true;
        }
      })
    );

    const interactedList = hasInteracted.map((hasInteracted, i) => {
      // @ts-ignore
      return { address: payload.addressList[i], hasInteracted };
    });
    return NextResponse.json({ data: interactedList });
  }

  return Response.json(
    {
      message: "Internal Error",
    },
    {
      status: 500,
    }
  );
};
