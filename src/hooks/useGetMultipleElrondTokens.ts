import { selectedNetwork } from "config/network";
import { fetchElrondEconomics } from "services/rest/elrond/network";
import { getFromAllTokens } from "services/rest/elrond/tokens";
import useSWR from "swr";
import { IElrondToken } from "types/elrond.interface";

const useGetMultipleElrondTokens = (tokensIdentifiers: string[]) => {
  const isEgldonTokens = tokensIdentifiers.includes("EGLD");
  const {
    data,
    error,
    isLoading: esdtLoading,
  } = useSWR(
    tokensIdentifiers.length !== 0
      ? [
          "tokens",
          {
            identifiers: tokensIdentifiers.join(","),
          },
        ]
      : null,
    getFromAllTokens
  );

  const {
    data: egldData,
    error: egldError,
    isLoading: egldLoading,
  } = useSWR(
    {
      identifier: isEgldonTokens ? "/economics" : null,
    },
    fetchElrondEconomics
  );

  let finalData: IElrondToken[] = data?.data ? [...data?.data] : [];
  if (isEgldonTokens) {
    if (egldData && finalData.length > 0) {
      if (finalData.findIndex((item) => item.identifier === "EGLD") === -1) {
        finalData.unshift({
          type: "FungibleESDT",
          identifier: "EGLD",
          name: "EGLD",
          ticker: "EGLD",
          decimals: 18,
          assets: {
            svgUrl: "/images/egld.svg",
          },

          price: egldData.price,
          marketCap: egldData.marketCap,
          supply: egldData.totalSupply,
          circulatingSupply: egldData.circulatingSupply,
        });
      }
    }
  }

  const isBskIncluded = tokensIdentifiers.includes(
    selectedNetwork.tokensID.bsk
  );

  if (isBskIncluded && finalData.length > 0) {
    const bskToken = finalData.find(
      (token) => token.identifier === selectedNetwork.tokensID.bsk
    );
    finalData = finalData.filter(
      (t) => t.identifier !== selectedNetwork.tokensID.bsk
    );

    finalData = [
      ...finalData,
      {
        ...bskToken,
        assets: {
          svgUrl: "/images/bsk-logo.svg",
        },
      },
    ];

    console.log("finalData", finalData);
  }

  return {
    tokens: finalData || [],
    isLoading: esdtLoading || egldLoading,
    isError: error || egldError,
  };
};

export default useGetMultipleElrondTokens;
