import { ENVIRONMENT } from "@/config/network";
import { gql } from "graphql-request";
import { IESDTInfo, TokenType } from "../type";
import { TOKENS_BETA2 } from "./const-devnet";
import { TOKENS_MAINNET } from "./const-mainnet";
import { farmsDevnet2, farmsMainnet } from "./farms";

const TOKENS_CONFIG = ENVIRONMENT === "devnet" ? TOKENS_BETA2 : TOKENS_MAINNET;
export const TOKENS_MAP = TOKENS_CONFIG.TOKENS_MAP;
export const TOKENS = [...TOKENS_CONFIG.TOKENS, ...TOKENS_CONFIG.LP_TOKENS];

export const ASH_TOKEN: IESDTInfo = TOKENS_MAP.ASH;

export const defaultTokenMapState: Record<string, TokenType> =
  Object.fromEntries(
    TOKENS.map((t) => {
      const token: TokenType = {
        ...t,
        balance: "0",
        valueUsd: 0,
        price: 0,
      };
      return [t.identifier, token];
    })
  );

// wegld
const tokens = {
  devnet: {
    wegld: "WEGLD-d7c6bb",
    wegldContracts: [
      "erd1qqqqqqqqqqqqqpgqd77fnev2sthnczp2lnfx0y5jdycynjfhzzgq6p3rax", //shard0
      "erd1qqqqqqqqqqqqqpgq7ykazrzd905zvnlr88dpfw06677lxe9w0n4suz00uh", //shard1
      "erd1qqqqqqqqqqqqqpgqfj3z3k4vlq7dc2928rxez0uhhlq46s6p4mtqerlxhc", //shard2
    ],
  },
  testnet: {
    wegld: "",
    wegldContracts: [],
  },

  mainnet: {
    wegld: "WEGLD-bd4d79",
    wegldContracts: [
      "erd1qqqqqqqqqqqqqpgqvc7gdl0p4s97guh498wgz75k8sav6sjfjlwqh679jy",
      "erd1qqqqqqqqqqqqqpgqhe8t5jewej70zupmh44jurgn29psua5l2jps3ntjj3",
      "erd1qqqqqqqqqqqqqpgqmuk0q2saj0mgutxm4teywre6dl8wqf58xamqdrukln",
    ],
  },
};
export const WRAPPED_EGLD = tokens[ENVIRONMENT];

export const FARMS =
  (ENVIRONMENT === "devnet" ? farmsDevnet2 : farmsMainnet) || [];

export type GraphOptions = {
  withFC?: boolean;
  withFB?: boolean;
  withFD?: boolean;
  withVE?: boolean;
  withRW?: boolean;
  withPools?: boolean;
  withFarms?: boolean;
  withBlockchain?: boolean;
  withTokens?: boolean;
  withSupply?: boolean;
};
export const queryOptions: { [key in keyof GraphOptions]: string } = {
  withFC: gql`
        farmController(address: $accAddress) {
            address
            timeTotal
            totalWeight
            nextTotalWeight
            farms {
                address
                relativeWeight
                nextRelativeWeight
                farmType
                votedPoint{
                    bias
                    slope
                }
                nextVotedPoint{
                    bias
                    slope
                }
            }
            farmTypes {
                farmType
                name
                weight
                nextWeight
            }
            account{
                voteUserPower
                farms{
                    address
                    lastUserVote
                    voteUserSlope{
                        slope
                        power
                        end
                    }
                }
            }
        }
    `,
  withFB: gql`
        farmBribe(address: $accAddress){
            address
            farms{
                address
                rewards{
                    tokenId
                    rewardPerVote
                    activePeriod
                    reserve
                    claimed
                    total
                }
            }
            account{
                farms{
                    address
                    rewards{
                        tokenId
                        lastUserClaim
                        claimable
                    }
                }
            }
        }
    `,
  withSupply: gql`
        ashSupply
    `,
  withRW: gql`
        rewarder {
            address
            rewardPerSec
        }
    `,
};

export const FARMS_MAP = Object.fromEntries(
  FARMS.map((f) => [f.farm_address, f])
);
