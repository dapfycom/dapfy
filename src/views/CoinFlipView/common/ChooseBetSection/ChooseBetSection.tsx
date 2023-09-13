import { Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import BigNumber from "bignumber.js";
import Card from "components/Card/Card";
import { ENVIROMENT, selectedNetwork } from "config/network";
import useGetAccountToken from "hooks/useGetAccountToken";
import useGetMaiarPairs from "hooks/useGetMaiarPairs";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { useMemo } from "react";
import { formatBalance, formatNumber } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import {
  changeUserAmount,
  selectCoinFlipBetAmount,
  selectCoinFlipTokenStr,
} from "views/CoinFlipView/lib/con-flip-slice";

//bet options
const betOptionsInEgld = [
  0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.7, 1, 2,
];

const ChooseBetSection = () => {
  const dispatch = useAppDispatch();
  const selctedTokenStr = useAppSelector(selectCoinFlipTokenStr);
  const amount = useAppSelector(selectCoinFlipBetAmount);
  const { pairs } = useGetMaiarPairs();
  const { accountToken } = useGetAccountToken(selctedTokenStr);
  const rate = useMemo(() => {
    const pair = pairs.find(
      (p) =>
        (p.baseId === selctedTokenStr &&
          p.quoteId === selectedNetwork.tokensID.wegld) ||
        (p.quoteId === selctedTokenStr &&
          p.baseId === selectedNetwork.tokensID.wegld)
    );
    let rate = 0;
    if (pair) {
      if (selctedTokenStr === pair.baseId) {
        //wegld route

        rate = new BigNumber(pair.quotePrice).div(pair.basePrice).toNumber();
      } else {
        //usdc route

        rate = new BigNumber(pair.basePrice).div(pair.quotePrice).toNumber();
      }
      return rate;
    }
  }, [pairs, selctedTokenStr]);

  const handleChangeUserAmount = (amount: string) => {
    dispatch(changeUserAmount(amount));
  };

  return (
    <Card px="15px" py="30px" w="full" h={"full"}>
      <Flex mb={3}>
        <Text color="white">1. Choose your bet</Text>
      </Flex>
      <Card
        flexDir={"row"}
        justify="space-between"
        px={"15px"}
        py="12px"
        borderRadius={"md"}
        mb={4}
      >
        <Text>Balance:</Text>
        <Text color="primary">
          {formatBalance(accountToken)} {formatTokenI(selctedTokenStr)}
        </Text>
      </Card>

      <Grid templateColumns={"repeat(2, 1fr)"} rowGap={"12px"} columnGap="15px">
        {betOptionsInEgld.map((bet, i) => {
          const value = new BigNumber(bet)
            .multipliedBy(ENVIROMENT === "mainnet" ? rate : 200000)
            .toFixed(2);
          return (
            <GridItem
              key={bet}
              colSpan={betOptionsInEgld.length - 1 === i ? 2 : 1}
            >
              <Card
                key={bet}
                px={"15px"}
                py="15px"
                align="center"
                color="white"
                borderRadius={"md"}
                as={Button}
                h={"auto"}
                w={"full"}
                bg={amount === value ? "primary" : "transparent"}
                onClick={() => handleChangeUserAmount(value)}
              >
                {formatNumber(value)}
              </Card>
            </GridItem>
          );
        })}
      </Grid>
    </Card>
  );
};

export default ChooseBetSection;
