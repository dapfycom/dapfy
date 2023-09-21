import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import {
  fetchAccountTokenById,
  fetchUserEgldBalance,
} from "@/services/rest/elrond/accounts";
import { useSelector } from "react-redux";
import useSWR from "swr";
const useGetAccountToken = (identifier: string) => {
  const address = useSelector(selectUserAddress);
  const {
    data: elrondTokenData,
    error: elrondTokenError,
    isLoading: elrondTokenLoading,
  } = useSWR(
    address !== "" && identifier !== "EGLD" ? [identifier, address] : null,
    fetchAccountTokenById,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        console.log(error);

        // Never retry on 404.
        if (error.response.status === 404) return;

        // Only retry up to 10 times.
        if (retryCount >= 10) return;

        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );
  const {
    data: egldData,
    error: egldDataError,
    isLoading: egldDataLoading,
  } = useSWR(
    address !== "" && identifier === "EGLD" ? address : null,
    fetchUserEgldBalance
  );

  const data =
    identifier === "EGLD"
      ? {
          identifier,
          nonce: 0,
          balance: "0",
          price: 0,
          decimals: 18,
          ...egldData,
        }
      : elrondTokenData;

  return {
    accountToken: data || {
      identifier,
      balance: "0",
      nonce: 0,
      price: 0,
      decimals: 18,
    },
    error: elrondTokenError || egldDataError,
    isLoading: elrondTokenLoading || egldDataLoading,
  };
};

export default useGetAccountToken;
