import { selectedNetwork } from "@/config/network";
import { fetchTokenById } from "@/services/rest/elrond/tokens";
import {
  IMaiarTokensPairInfo,
  IOnDexFarm,
  IOneDexOriginalScPairInfo,
} from "@/types/farm.interface";
import BigNumber from "bignumber.js";
import { BigZero } from "./constants";

export const convertEsdtToWei = (
  amount: BigNumber.Value,
  decimals?: number
): BigNumber => {
  if (!amount) amount = "0";
  return new BigNumber(amount)
    .shiftedBy(decimals == null ? 18 : decimals)
    .decimalPlaces(0, BigNumber.ROUND_FLOOR);
};

export const convertWeiToEsdt = (
  amount: BigNumber.Value,
  decimals?: number,
  precision?: number
): BigNumber => {
  if (!amount) amount = "0";
  return new BigNumber(amount)
    .shiftedBy(decimals == null ? -18 : -decimals)
    .decimalPlaces(precision == null ? 4 : precision, BigNumber.ROUND_FLOOR);
};

export const getTokenUsdcPrice = (
  tokenId: string,
  amount: BigNumber,
  onedexPairInfos: any[],
  exchangePairInfos: any[]
): string => {
  try {
    // console.log(tokenId);

    if (tokenId === "EGLD") {
      tokenId = selectedNetwork.tokensID.wegld;
    }

    if (getSymbol(tokenId) === "USDC" || getSymbol(tokenId) === "USDT") {
      return amount.toFixed(0);
    }

    const exchange_token_info = exchangePairInfos.filter(
      (item: any) =>
        item.fsymTokenIdentifier === tokenId && item.tsym === "USDC"
    );
    if (exchange_token_info.length > 0) {
      return amount.multipliedBy(exchange_token_info[0].value).toFixed(5);
    }

    const token_info = onedexPairInfos.filter(
      (item: any) =>
        item.fsymTokenIdentifier === tokenId && item.tsym === "USDC"
    );
    if (token_info.length > 0 && token_info[0].value != "NaN") {
      return amount.multipliedBy(token_info[0].value).toFixed(5);
    }

    return "0";
  } catch (error) {
    return "0";
  }
};

export const getSymbol = (tokenIdentifier: string): string => {
  try {
    const tokenSymbol = tokenIdentifier.split("-")[0].toUpperCase();

    return tokenSymbol;
  } catch (error) {
    return "";
  }
};

export async function calculateAPR(
  farm: IOnDexFarm,
  onedexPairInfos: IMaiarTokensPairInfo[],
  exchangePairInfos: IMaiarTokensPairInfo[],
  pairInfos: IOneDexOriginalScPairInfo[]
) {
  let apr = BigZero;

  const tokenReward = await fetchTokenById(farm.reward_token);
  const reward_token_decimal = tokenReward.decimals;
  for (const pair of pairInfos) {
    if (pair.lp_token_id == farm.lp_token_id) {
      if (
        pair.first_token_id == farm.reward_token &&
        BigZero.lt(pair.lp_token_supply)
      ) {
        apr = new BigNumber(farm.apr_yearly_reward_amount)
          .multipliedBy(100)
          .dividedBy(
            new BigNumber(pair.first_token_reserve)
              .dividedBy(convertWeiToEsdt(new BigNumber(pair.lp_token_supply)))
              .multipliedBy(2)
          );
      } else if (
        pair.second_token_id == farm.reward_token &&
        BigZero.lt(new BigNumber(pair.lp_token_supply))
      ) {
        apr = new BigNumber(farm.apr_yearly_reward_amount)
          .multipliedBy(100)
          .dividedBy(
            new BigNumber(pair.second_token_reserve)
              .dividedBy(convertWeiToEsdt(new BigNumber(pair.lp_token_supply)))
              .multipliedBy(2)
          );
      } else {
        const yearly_reward_amount_value = getTokenUsdcPrice(
          farm.reward_token,
          convertWeiToEsdt(farm.apr_yearly_reward_amount, reward_token_decimal),
          onedexPairInfos,
          exchangePairInfos
        );
        const first_token_reserve_value = getTokenUsdcPrice(
          pair.first_token_id,
          convertWeiToEsdt(pair.first_token_reserve, pair.first_token_decimal),
          onedexPairInfos,
          exchangePairInfos
        );
        if (new BigNumber(first_token_reserve_value).gt("0")) {
          apr = new BigNumber(yearly_reward_amount_value)
            .multipliedBy(100)
            .dividedBy(
              new BigNumber(first_token_reserve_value)
                .dividedBy(
                  convertWeiToEsdt(new BigNumber(pair.lp_token_supply))
                )
                .multipliedBy(2)
            );
        } else {
          const second_token_reserve_value = getTokenUsdcPrice(
            pair.second_token_id,
            convertWeiToEsdt(
              new BigNumber(pair.second_token_reserve),
              pair.second_token_decimal
            ),
            onedexPairInfos,
            exchangePairInfos
          );
          apr = new BigNumber(yearly_reward_amount_value)
            .multipliedBy(100)
            .dividedBy(
              new BigNumber(second_token_reserve_value)
                .dividedBy(
                  convertWeiToEsdt(new BigNumber(pair.lp_token_supply))
                )
                .multipliedBy(2)
            );
        }

        if (
          (getSymbol(pair.first_token_id) === "LEGLD" &&
            getSymbol(pair.second_token_id) === "EGLD") ||
          (getSymbol(pair.first_token_id) === "USDC" &&
            getSymbol(pair.second_token_id) === "USDT") ||
          (getSymbol(pair.first_token_id) === "USDC" &&
            getSymbol(pair.second_token_id) === "EGLD") ||
          (getSymbol(pair.first_token_id) === "USDT" &&
            getSymbol(pair.second_token_id) === "EGLD")
        ) {
          apr = apr.multipliedBy(0.9);
        }
      }
    }
  }

  return apr;
}
