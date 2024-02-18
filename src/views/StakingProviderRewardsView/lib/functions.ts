import { fetchTransactions } from "@/services/rest/elrond/transactions";

export const fetchStakingProvidersTransactions = async (
  providers: string[],
  address: string
): Promise<{ results: any[] }[]> => {
  // make batches in every transaction fetch of 10 providers each

  // split providers array into several arrays of 10 elements each
  // fetch transactions for each array of providers
  // merge all transaction data into one array

  const providersBatches: string[][] = providers.reduce(
    (acc, provider, index) => {
      const batchIndex = Math.floor(index / 10);
      if (!acc[batchIndex]) {
        // @ts-ignore
        acc[batchIndex] = [];
      }
      // @ts-ignore
      acc[batchIndex].push(provider);
      return acc;
    },
    []
  );
  console.log({ providersBatches });

  const transactionsData = await Promise.all(
    providersBatches.map(async (batch) => {
      const txs = await fetchTransactions({
        receiver: batch.join(","),
        sender: address,
        status: "success",
        function: "claimRewards",
        withScResults: true,
        size: 50,
        fields: "results",
      });
      return txs;
    })
  );

  console.log({ transactionsData });

  return transactionsData.flat() as { results: any[] }[];
};
