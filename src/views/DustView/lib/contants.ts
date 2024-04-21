import { selectedNetwork } from "@/config/network";

export const toTokensToConvert = [
  selectedNetwork.tokensID.usdc,
  selectedNetwork.tokensID.wegld,
];
export const protocolFee = 0.1;
export const convertSlippage = 3;
export const limitDollarAmount = 30;
export const limitDollarAmountMin = 0.000001;
export const maxAllowedTokensCount = 100;

export const excludeTokens = ["LPAD-84628f", "JOJO-0e7858", "AIX-a00870"];
