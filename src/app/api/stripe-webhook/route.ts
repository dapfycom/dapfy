// Nextjs route, receives the user password to encrypt the private key and create the wallets

import prisma from "@/lib/db";
import { sendTokens } from "@/lib/server-mx-transactions";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";

// zod schema for the request body
const dataSchema = z.object({
  amount: z.number().min(1),
  address: z.string().startsWith("erd"),
});

export async function POST(req: Request) {
  try {
    console.log("webhook activated");

    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.ENDPOINT_SECRET!
      );
    } catch (error: any) {
      return new NextResponse(`Webhook Error: ${error.message}`, {
        status: 400,
      });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
      console.log({ data: event.data });

      if (!session?.metadata?.purchaseAttemptId) {
        return new NextResponse("PurchaseAttempt id is required", {
          status: 400,
        });
      }

      const purchaseAttemp = await prisma.purchaseAttempt.update({
        where: {
          id: session.metadata.purchaseAttemptId,
        },
        data: {
          successful: true,
        },
      });

      const user = await prisma.user.findUnique({
        where: {
          id: purchaseAttemp.userId,
        },
      });

      const product = await prisma.product.findUnique({
        where: {
          id: purchaseAttemp.productId,
        },
      });

      if (!user || !product || !purchaseAttemp) {
        return new NextResponse("Mismatch in user/product or purchase attemp", {
          status: 400,
        });
      }

      const txHash = await sendTokens({
        receiver: user.address,
        amount: purchaseAttemp.amount,
        token: product.name,
      });

      if (txHash) {
        console.log("Return to webhook, Tx was send succesfully");
        await prisma.purchase.create({
          data: {
            quantity: purchaseAttemp.amount,
            totalCost: purchaseAttemp.dollarAmount,
            productId: product.id,
            userId: user.id,
            txHash: txHash,
          },
        });

        console.log("Insert in prisma purchase data");

        console.log({
          quantity: purchaseAttemp.amount,
          totalCost: purchaseAttemp.dollarAmount,
          productId: product.id,
          userId: user.id,
          txHash: txHash,
        });
      } else {
        return Response.json(
          { error: "Error: no tx hash was found" },
          {
            status: 500,
          }
        );
      }
    }

    return Response.json(
      { status: "succes" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("ERROR", error);

    return Response.json(
      { error: error },
      {
        status: 500,
      }
    );
  }
}
