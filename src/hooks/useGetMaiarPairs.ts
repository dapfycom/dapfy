import BigNumber from "bignumber.js";
import { selectedNetwork } from "config/network";
import { fetchElrondData } from "services/rest/elrond";
import { fetchMaiarPairs } from "services/rest/elrond/maiar";
import useSwr from "swr";
import { IMexPair } from "types/elrond.interface";
const useGetMaiarPairs = () => {
  //fetch rare price
  const { data: dataPrice } = useSwr<{
    price: number;
  }>(`/tokens/${selectedNetwork.tokensID.rare}?fields=price`, fetchElrondData);
  const {
    data: apiPairs,
    isLoading,
    error,
  } = useSwr<IMexPair[]>("/maiar-pairs", fetchMaiarPairs);

  let pairs: IMexPair[] = apiPairs;
  const rarePrice = dataPrice?.price;
  if (apiPairs && rarePrice) {
    pairs = [
      ...pairs,
      {
        address:
          "erd1qqqqqqqqqqqqqpgqjz5k2a7ed2xtd0d92zt0j8e7aap70y7g2jpsjz5z4r",
        baseId: selectedNetwork.tokensID.usdc,
        basePrice: 1,
        quoteId: selectedNetwork.tokensID.rare,
        quotePrice: new BigNumber(rarePrice)
          .minus(new BigNumber(rarePrice).multipliedBy(0.01))
          .toNumber(),
      },
    ];
  }

  return {
    pairs: pairs || [],
    isLoading,
    error,
  };
};

export default useGetMaiarPairs;
