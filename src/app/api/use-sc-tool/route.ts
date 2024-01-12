import { selectedNetwork } from "@/config/network";
import { timeStampToSeconds } from "@/lib/date";
import { fetchTransactions } from "@/services/rest/elrond/transactions";
import { NextResponse } from "next/server";
import { z } from "zod";
import { excludeSmartContracts } from "./excluded-sc";
const dataSchema = z.object({
  from: z.coerce.date(),
  to: z.coerce.date(),
  address: z.string(),
});
export const POST = async (req: Request) => {
  let payload;
  try {
    payload = dataSchema.parse(await req.json());
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }

  const results = await fetchTransactions({
    before: timeStampToSeconds(payload.to.getTime()),
    after: timeStampToSeconds(payload.from.getTime()),
    sender: payload.address,
  });

  const scAddressArr = Object.entries(selectedNetwork.scAddress);
  console.log({
    scAddressArr,
  });

  let hasInteracted = false;
  console.log({ results });

  for (let index = 0; index < scAddressArr.length && !hasInteracted; index++) {
    const addressElement = scAddressArr[index];

    if (excludeSmartContracts.includes(addressElement[0])) {
      continue;
    }

    for (let j = 0; j < results.length && !hasInteracted; j++) {
      const tx = results[j];

      if (tx.receiver === addressElement[1]) {
        hasInteracted = true;
      }
    }
  }

  return NextResponse.json({ data: hasInteracted });
};
