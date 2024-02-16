import prisma from "@/lib/db";
import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.json();

  // Extract the Tradesilvania signature from the request headers
  const signature = req.headers.get("tradesilvania-signature") as string;
  const requestBody = JSON.stringify(body);
  const tsPublicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqJ8G5/Gw+mhhgEUpX7JT
9XoaAlFMS6wBorMMQasKWT4IabGoTT/GHewGBpfQceRxnJGgwwmOwnP/Vyrnd6ay
KB+/Qz/KUVb3rj5bXtzNmC6h+URZA6NPEAc+eQvi49yIbnZ9rBz1uNzgGpSEOrNP
ja0jkN1N9F1bgnu85FARvX6AAa/trrPuBUtHvQh2nAy5I83wsCVbHu8bNqp66nh0
YZ064vxo8pgm+J+m4hmB2nbcNcvCkTdaBbIO4q0yD/8oIXTFUoyU6PN+MJ955BH5
Aoi/O1uhY5I+zRsOOISCfGzTCh6XcMzynvABCATETb1K5MKXxIKFsaE/juySbkSC
tQIDAQAB
-----END PUBLIC KEY-----`;

  const verifier = crypto.createVerify("RSA-SHA512");
  verifier.update(requestBody);
  verifier.end();

  const isVerified = verifier.verify(tsPublicKey, signature, "base64");

  if (!isVerified) {
    return Response.json({ message: "Invalid signature." }, { status: 401 });
  }
  console.log({ body });

  try {
    await prisma.tradesilvaniaTransaction.create({
      data: {
        amountFrom: body.amountFrom,
        amountTo: body.amountTo,
        assetFrom: body.assetFrom,
        assetTo: body.assetTo,
        networkTo: body.networkTo,
        orderType: body.orderType,
        rampOrderId: body.rampOrderId,
        status: body.status,
        additionalTo: body.additionalTo,
        externalCustomerId: body.externalCustomerId,
        externalTransactionId: body.externalTransactionId,
        paymentType: body.paymentType,
        payoutBlockchainId: body.payoutBlockchainId,
        user: {
          connect: {
            address: body.addressTo,
          },
        },
      },
    });
    return Response.json({ message: "success" });
  } catch (error) {
    return Response.json({ message: "Error creating ticket" }, { status: 500 });
  }
}
