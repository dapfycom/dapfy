import prisma from "@/lib/db";
import { verifyUser } from "@/lib/mx-utils";
import { z } from "zod";

const dataSchema = z.object({
  xid: z.string(),
  email: z.string(),
});

export const POST = async (req: Request) => {
  let reportData;
  try {
    reportData = dataSchema.parse(await req.json());
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }

  const xAccount = await prisma.xAcount.findUnique({
    where: {
      xid: reportData.xid,
    },
    include: {
      user: true,
    },
  });

  // authorization user to this route
  const token = req.headers.get("Authorization")?.split(" ")[1];

  const ok = await verifyUser(
    {
      address: xAccount?.user?.address,
    },
    token
  );
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

  try {
    if (xAccount) {
      await prisma.rewardsEmailReport.create({
        data: {
          email: reportData.email,
          xAccountId: xAccount.id,
        },
      });
    } else {
      return Response.json(
        { error: "There is no x account with that user id" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    if (error?.code === "P2002") {
      return Response.json({ error: "Email already exist" }, { status: 400 });
    }

    return Response.json({ error: "Unknow error" }, { status: 500 });
  }

  return Response.json({ message: "success" }, { status: 200 });
};

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const xid = searchParams.get("xid");
  if (!xid) {
    return Response.json({ error: "No user X account id" }, { status: 400 });
  }

  // authorization user to this route
  const token = req.headers.get("Authorization")?.split(" ")[1];
  const xAccount = await prisma.xAcount.findUnique({
    where: {
      xid: xid,
    },
    include: {
      user: true,
    },
  });

  const ok = await verifyUser(
    {
      address: xAccount?.user?.address,
    },
    token
  );
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

  try {
    const reports = await prisma.rewardsEmailReport.findMany({
      where: {
        xAccount: {
          xid: xid,
        },
      },
    });
    return Response.json({ reports }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }
};

export const DELETE = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return Response.json({ error: "No report id" }, { status: 400 });
  }

  // authorization user to this route
  const token = req.headers.get("Authorization")?.split(" ")[1];
  const xAccount = await prisma.xAcount.findFirst({
    where: {
      rewardsEmailReports: {
        some: {
          id: id,
        },
      },
    },
    include: {
      user: true,
    },
  });

  const ok = await verifyUser(
    {
      address: xAccount?.user?.address,
    },
    token
  );
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

  try {
    await prisma.rewardsEmailReport.delete({
      where: {
        id: id,
      },
    });
    return Response.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }
};
