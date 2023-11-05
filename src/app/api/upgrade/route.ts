// Nextjs route, receives the user password to encrypt the private key and create the wallets

import { selectedNetwork } from "@/config/network";
import { host } from "@/config/urls";
import prisma from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { getTokensByDollarAmount } from "@/utils/functions/tokens";
import { dollarMaxAmount } from "@/views/UpgradeView/config";
import { z } from "zod";

// zod schema for the request body
const dataSchema = z.object({
  amount: z.number().max(dollarMaxAmount).min(1),
  address: z.string().startsWith("erd"),
});

const success_url = host + process.env.SUCCESS_PATH;
const cancel_url = host + process.env.CANCEL_PATH;

export async function POST(req: Request) {
  console.log("success_url", success_url);
  console.log("cancel_url", cancel_url);

  try {
    //   use zod to validate the request body
    let data;

    try {
      data = dataSchema.parse(await req.json());
    } catch (error) {
      return Response.json({ error: error }, { status: 400 });
    }
    // Fetch or create the user if it doesn't exist
    let user = await prisma.user.findUnique({
      where: {
        address: data.address,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          address: data.address,
        },
      });
    }

    // Fetch the product from the database
    const product = await prisma.product.findUnique({
      where: {
        name: selectedNetwork.tokensID.bsk,
      },
    });

    if (!product) {
      console.error("Product BSK-TOKEN not found in database");

      return Response.json(
        { error: "Internal Error, please contact an admin" },
        { status: 500 }
      );
    }

    const amountToSend = await getTokensByDollarAmount(
      product.name,
      data.amount
    );

    // Create purchage attempt
    const purchaseAttempt = await prisma.purchaseAttempt.create({
      data: {
        successful: false,
        userId: user.id,
        productId: product.id,
        dollarAmount: data.amount,
        amount: amountToSend, // fix in prod
      },
    });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Dapfy Premium",
            },
            unit_amount: Number(data.amount) * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: success_url,
      cancel_url: cancel_url,
      metadata: {
        purchaseAttemptId: purchaseAttempt.id,
      },
    });

    if (session.url) {
      return Response.json(
        { url: session.url },
        {
          status: 200,
        }
      );
    } else {
      return Response.json(
        { error: "Not valid redirect url" },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.error("Error in upgrade", error);
    return Response.json(
      { error: "Sorry we couldnt process your request" },
      { status: 500 }
    );
  }
}
