import { ENVIRONMENT } from "@/config/network";

type DappContracts = {
  voteEscrowedContract: string;
  feeDistributor: string;
  farmController: string;
  farmBribe: string;
  farmRouter: string;
  router: string;
  dao: string;
  daoBribe: string;
  aggregator: string;
};
type DappContractConfig = {
  alpha: DappContracts;
  beta: DappContracts;
};

const dappContractMainnet: DappContracts = {
  voteEscrowedContract:
    "erd1qqqqqqqqqqqqqpgq58elfqng8edp0z83pywy3825vzhawfqp4fvsaldek8",
  feeDistributor:
    "erd1qqqqqqqqqqqqqpgqjrlge5rgml6d48tjgu3afqvems88lqzw4fvs9f7lhs",
  farmController:
    "erd1qqqqqqqqqqqqqpgqzhm689ehkacadr7elzkc3z70h6cqmz0q4fvsftax5t",
  farmBribe: "erd1qqqqqqqqqqqqqpgqgulmfcu8prrv2pmx3nqn5stqu3c42fsz4fvsa9rwdl",
  farmRouter: "erd1qqqqqqqqqqqqqpgqe0k2j45f3w9krhx2gl0j8fpg2ksepaea4fvssap9nd",
  router: "erd1qqqqqqqqqqqqqpgqjtlmapv42pcga5nglgfrnpqvkq06wdqx4fvsvw6xpt",
  dao: "erd1qqqqqqqqqqqqqpgqvdkft2eq9zh7cu9tkxartshu764tqe7s4fvsaw99xj",
  daoBribe: "erd1qqqqqqqqqqqqqpgqzsmhsv625er2w6w7rel7kmustn3u838f4fvs36jdmc",
  aggregator: "erd1qqqqqqqqqqqqqpgqcc69ts8409p3h77q5chsaqz57y6hugvc4fvs64k74v",
};

const dappContractDevnet2: DappContracts = {
  voteEscrowedContract:
    "erd1qqqqqqqqqqqqqpgqw9cpgvfessrch3xyk7qfv75nyfve0vlf2ges4qg8z0",
  feeDistributor:
    "erd1qqqqqqqqqqqqqpgq6hpngdfrkpaxjjmwlhqn3pcrgjawgjjw2gessrusrn",
  farmController:
    "erd1qqqqqqqqqqqqqpgqdpzqrkx5xf6svtlhgc48shr2dph8ug0y2gess4z78s",
  farmBribe: "erd1qqqqqqqqqqqqqpgq65jgpx0q8w7sana8k5pweccuzfrv3ucy2ges44ajcz",
  farmRouter: "erd1qqqqqqqqqqqqqpgqxpy9x99pphvgax8kpy626azt6rgpkr7e2gese3fskw",
  router: "erd1qqqqqqqqqqqqqpgqg8nzhgky9w2mj50hhw44u2vnx7d9yzfw2ges2jshtc",
  dao: "erd1qqqqqqqqqqqqqpgqkyd3egsmgsdvjlt8hpql577wqnppn2qx2gesxhrsew",
  daoBribe: "erd1qqqqqqqqqqqqqpgqs88mhhdhnkqumkla0nayz58u45flpea92gesj48vaf",
  aggregator: "erd1qqqqqqqqqqqqqpgqzshqdqcdzdl43vhy7p7q8uhc5xzu5x7zh2usyz5kg6",
};

const dappContract =
  ENVIRONMENT == "devnet" ? dappContractDevnet2 : dappContractMainnet;

export const ASHSWAP_CONFIG = {
  ashApiBaseUrl:
    ENVIRONMENT === "mainnet"
      ? "https://api.ashswap.io"
      : "https://api-devnet2.ashswap.io",
  ashGraphBaseUrl:
    ENVIRONMENT === "mainnet"
      ? "https://api-v2.ashswap.io/graphql"
      : "https://api-v2-devnet2.ashswap.io/graphql",
  dappContract,
  farmWeightVoteDelay: 3600,
} as const;
