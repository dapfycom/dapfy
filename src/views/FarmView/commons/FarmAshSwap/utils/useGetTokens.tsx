import useGetAccountToken from "@/hooks/useGetAccountToken";
import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import { MvxApiBaseUrl } from "@/services/rest/elrond";
import { useMemo } from "react";
import useSWR, { SWRConfiguration } from "swr";
import { TOKENS } from "../const/const";
import { useGetAshswapBaseState } from "./hooks";
import { fetcher, setTokenMap } from "./services";

const useGetTokens = (config?: SWRConfiguration) => {
  const accAddress = useAppSelector(selectUserAddress);
  const {
    ashswapBaseState,
    isLoading: isLoadingBasicState,
    error: errorBasicState,
  } = useGetAshswapBaseState();
  const { tokens, pools: rawPoolsV1, poolsV2: rawPoolsV2 } = ashswapBaseState;
  const {
    accountToken: EgldInAccount,
    isLoading: isLoadingEgldAccount,
    error: errorEgldAccount,
  } = useGetAccountToken("EGLD");
  const tokenIds = useMemo(
    () => [
      ...TOKENS.map((t) => t.identifier).filter((t) => t !== "EGLD"),
      // ...pools.map((p) => p.lpToken.identifier),
    ],
    []
  );
  const {
    data,
    mutate,
    isLoading: isLoadingTokensApi,
    error: errorTokensApi,
  } = useSWR<{ balance: string; identifier: string }[]>(
    accAddress
      ? `${MvxApiBaseUrl}/accounts/${accAddress}/tokens?identifiers=${tokenIds}&size=${tokenIds.length}`
      : null,
    fetcher,
    config
  );

  const mappedTokens = setTokenMap(tokens, data || [], EgldInAccount);

  return {
    tokenMap: mappedTokens,
    isLoading:
      isLoadingBasicState || isLoadingEgldAccount || isLoadingTokensApi,
    error: errorBasicState || errorEgldAccount || errorTokensApi,
  };
};

export default useGetTokens;
