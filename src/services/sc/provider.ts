import { selectedNetwork } from "@/config/network";
import { ProxyNetworkProvider } from "@multiversx/sdk-network-providers/out";

export const provider = new ProxyNetworkProvider(
  selectedNetwork.network.gatewayAddress,
  {
    timeout: 30000,
  }
);
