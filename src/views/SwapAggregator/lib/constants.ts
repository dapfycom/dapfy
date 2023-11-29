import { selectedNetwork } from "@/config/network";
import { Aggregator, ChainId } from "@ashswap/ash-sdk-js/out";

export const integrator =
  "erd1085h6wdckzfkvfftq837mwt2a780dv0p8wcjjpauku7at0dlqswszewvjn"; // your fee wallet address

export const agService = new Aggregator({
  chainId: selectedNetwork.ChainID as ChainId.Mainnet | ChainId.Devnet,
  protocol: integrator,
});
