import { selectedNetwork } from "@/config/network";
import { getRealBalance } from "@/utils/functions/formatBalance";
import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import useGetAccountToken from "./useGetAccountToken";
import useGetTokenPrice from "./useGetTokenPrice";
import useGetUserTokens from "./useGetUserTokens";

const useGetWalletWorth = () => {
  const { userTokens: tokensData } = useGetUserTokens();
  const { accountToken: egldToken } = useGetAccountToken(
    selectedNetwork.tokensID.egld
  );
  const [egldPrice] = useGetTokenPrice(selectedNetwork.tokensID.egld);
  const [totalNetWorth, setTotalNetWorth] = useState<number>(0);

  useEffect(() => {
    if (egldPrice) {
      let total: any = getRealBalance(
        egldPrice * Number(egldToken.balance),
        egldToken.decimals
      );

      if (tokensData.length > 0) {
        tokensData.forEach((token) => {
          if (token.price) {
            total += new BigNumber(
              getRealBalance(token.balance, token.decimals)
            )
              .multipliedBy(token.price)
              .toNumber();
          }
        });
      }

      setTotalNetWorth(total);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [egldPrice, egldToken.balance, egldToken.decimals, tokensData.length]);

  // const tableData = useAppSelector((state) => state.userAccount.tableData.data);
  // const egldData = useAppSelector(
  //   (state) => state.userAccount.egldBalance.data
  // );
  // const balance = useAppSelector((state) => state.userAccount.totalBalance);
  // const [egldPrice] = useGetTokenPrice(toknesID.egld);

  // const [showBalance, setshowBalance] = useState(true);
  // const hideBalance = () => {
  //   setshowBalance((bal) => !bal);
  // };

  // useEffect(() => {
  //   if (egldPrice) {
  //     let total: any = getRealBalance(
  //       egldPrice * egldData.balance,
  //       egldData.decimals
  //     );

  //     if (tableData.length > 0) {
  //       tableData.forEach((token) => {
  //         if (token.price) {
  //           total += // @ts-ignore
  //             getRealBalance(token.balance, token.decimals) * token.price;
  //         }
  //       });
  //     }
  //     dispatch(setTotalBalance(total));
  //   }
  // }, [egldData, tableData, dispatch, egldPrice]);

  // const balanceDisplayed = formatPrecision(balance, 2);

  return {
    netWorth: totalNetWorth,
    isLoading: false,
    error: null,
  };
};

export default useGetWalletWorth;
