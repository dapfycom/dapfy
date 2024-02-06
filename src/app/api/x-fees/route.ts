import { fetchTransactions } from "@/services/rest/elrond/transactions";
import BigNumber from "bignumber.js";
import { z } from "zod";
const dataSchema = z.object({
  address: z.string(),
});

export const POST = async (req: Request) => {
  try {
    let data: { address: string };
    try {
      data = dataSchema.parse(await req.json());
    } catch (error) {
      return Response.json({ error: error }, { status: 400 });
    }

    const transactions = await fetchTransactions({
      sender: data.address,
      size: 10000,
    });

    const xfees = transactions.reduce((acc, tx) => {
      return new BigNumber(acc).plus(tx.fee || 0);
    }, new BigNumber(0));

    return Response.json(
      {
        xfees: xfees.dividedBy(new BigNumber(10).pow(18)).toString(),
        transactions: transactions.length,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }
};
