// Nextjs route, receives the user password to encrypt the private key and create the wallets

import { stripe } from "@/lib/stripe";
import { z } from "zod";

// zod schema for the request body
const dataSchema = z.object({
  amount: z.number().min(1),
  address: z.string().startsWith("erd"),
});

export async function POST(req: Request) {
  //   use zod to validate the request body
  let data;

  try {
    data = dataSchema.parse(await req.json());
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }

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
    success_url: "http://localhost:4242/success",
    cancel_url: "http://localhost:4242/cancel",
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
}
