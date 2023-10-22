import { ENVIROMENT } from "@/config/network";

export const ashSwapConfig = {
  mainnet: {
    apiUrl: "https://aggregator.ashswap.io",
  },
  devnet: {
    apiUrl: "https://aggregator-devnet.ashswap.io",
  },
  testnet: {
    apiUrl: "https://aggregator-testnet.ashswap.io",
  },
};

export const selectedSwapConfig = ashSwapConfig[ENVIROMENT];
