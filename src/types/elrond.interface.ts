export interface EsdtPayment {
  amount: string;
  token_identifier: string;
  token_nonce: number;
}

type ElrondType =
  | "NonFungibleESDT"
  | "SemiFungibleESDT"
  | "MetaESDT "
  | "FungibleESDT";

interface IElrondSocial {
  blog?: string;
  twitter?: string;
  whitepaper?: string;
  discord?: string;
  telegram?: string;
}

export interface IElrondNFT {
  identifier: string;
  collection: string;
  timestamp: number;
  attributes: string;
  nonce: number;
  type: ElrondType;
  name: string;
  creator: string;
  royalties?: number;
  uris?: string[];
  url: string;
  media?: {
    url: string;
    fileSize?: number;
    fileType?: string;
    originalUrl?: string;
    thumbnailUrl?: string;
  }[];
  isWhitelistedStorage?: boolean;
  metadata?: {
    description: string;
    compiler?: string;
    attributes?: any[];
  };
  supply?: string;
  ticker: string;
  rarities?: any;

  thumbnailUrl?: string;
  tags?: string[];

  owner?: string;
  balance?: string;
  decimals?: number;
  assets: {
    website?: string;
    description?: string;
    status?: string;
    pngUrl?: string;
    svgUrl?: string;
    ledgerSignature?: string;
    lockedAccounts?: string;
    extraTokens?: string[];
    preferredRankAlgorithm?: string;

    social?: IElrondSocial;
  };
  scamInfo?: {
    type?: string;
    info: string;
  };
  score?: number;
  rank?: number;

  isNsfw?: boolean;

  unlockSchedule?: {
    remainingEpochs: number;
    percent: number;
  }[];
}

export interface IMexPair {
  address?: string;
  id?: string;
  symbol?: string;
  name?: string;
  price?: number;
  baseId: string;
  basePrice: number;
  baseSymbol?: string;
  baseName?: string;
  quoteId?: string;
  quotePrice: number;
  quoteSymbol?: string;
  quoteName?: string;
  totalValue?: number;
  volume24h?: number;
  state?: string;
  type?: string;
}

export interface CollectionTrait {
  name: string;
  occurrenceCount: number;
  occurrencePercentage: number;
  attributes: {
    name: string;
    occurrenceCount: number;
    occurrencePercentage: number;
  }[];
}

export interface IElrondCollection {
  collection: string;
  type: ElrondType;
  name: string;
  ticker: string;
  owner?: string;
  timestamp?: number;
  canFreeze?: boolean;
  canWipe?: boolean;
  canPause?: boolean;
  canTransferNftCreateRole?: boolean;
  roles: [
    {
      address: string;
      canCreate?: boolean;
      canBurn?: boolean;
      canAddQuantity?: boolean;
      canUpdateAttributes?: boolean;
      canAddUri?: boolean;
      roles: string[];
    }
  ];
  canTransfer?: boolean;

  decimals?: number;
  assets?: {
    website: string;
    description: string;
    status: "active" | "inactive ";
    pngUrl: string;
    svgUrl: string;
    ledgerSignature?: string;
    lockedAccounts?: string;
    extraTokens?: string[];
    preferredRankAlgorithm?: string;
    social?: IElrondSocial;
  };

  scamInfo?: {
    type?: string;
    info: string;
  };

  traits: any;
}

export interface IElrondEconomics {
  totalSupply: number;
  circulatingSupply: number;
  staked: number;
  price: number;
  marketCap: number;
  apr: number;
  topUpApr: number;
  baseApr: number;
  tokenMarketCap: number;
}
export interface IElrondStats {
  shards: number;
  blocks: number;
  accounts: number;
  transactions: number;
  refreshRate: number;
  epoch: number;
  roundsPassed: number;
  roundsPerEpoch: number;
}

export interface IElrondToken {
  type: ElrondType;
  identifier: string;
  name: string;
  ticker: string;
  owner?: string;
  decimals: number;
  isPaused?: boolean;
  assets: {
    website?: string;
    description?: string;
    status?: string;
    pngUrl?: string;
    svgUrl: string;
    img?: string;
    static?: {
      src: string;
    };
    social?: {
      email: string;
      twitter: string;
      whitepaper: string;
      coingecko: string;
      discord: string;
      telegram: string;
    };
  };
  transactions?: number;
  accounts?: number;
  canUpgrade?: boolean;
  canMint?: boolean;
  canBurn?: boolean;
  canChangeOwner?: boolean;
  canPause?: boolean;
  canFreeze?: boolean;
  canWipe?: boolean;
  price: number;
  marketCap?: number;
  supply: string | number;
  circulatingSupply: string | number;
}
export interface IElrondAccountToken {
  type?: ElrondType;
  identifier: string;
  name: string;
  ticker: string;
  owner?: string;
  decimals: number;
  isPaused?: boolean;
  assets: {
    website?: string;
    description?: string;
    status?: string;
    pngUrl?: string;
    svgUrl: string;
    social?: {
      email: string;
      twitter: string;
      whitepaper: string;
      coingecko: string;
      discord: string;
      telegram: string;
    };
  };
  transactions?: number;
  accounts?: number;
  canUpgrade?: boolean;
  canMint?: boolean;
  canBurn?: boolean;
  canChangeOwner?: boolean;
  canPause?: boolean;
  canFreeze?: boolean;
  canWipe?: boolean;
  price?: number;
  marketCap?: number;
  supply?: string;
  circulatingSupply?: string;

  minted?: string;
  burnt?: string;
  initialMinted?: string;

  timestamp?: number;
  balance: string;
  valueUsd?: number;
  attributes?: string;
}

export interface IElrondUserAccount {
  address: string;
  balance: string;
  nonce: number;
  shard: number;
  assets?: any;
  code?: string;
  codeHash?: string;
  rootHash?: string;
  txCount: number;
  scrCount: number;
  username?: string;
  developerReward?: string;
  ownerAddress?: string;
  deployedAt?: number;
  isUpgradeable?: boolean;
  isReadable?: boolean;
  isPayable?: boolean;
  isPayableBySmartContract?: boolean;
  scamInfo?: {
    type: number;
    info: string;
  };
}

export type ITransactionStatuts = "success" | "pending" | "invalid" | "fail";
export type ISortOrder = "desc" | "asc";

export interface ITransacation {
  txHash: string;
  gasLimit?: number;
  gasPrice?: number;
  gasUsed?: number;
  miniBlockHash?: string;
  nonce?: number;
  receiver: string;
  receiverShard: number;
  round?: number;
  sender: string;
  senderShard: number;
  signature: string;
  status: ITransactionStatuts;
  value: string;
  fee?: string;
  timestamp: number;
  data?: string;
  function?: string;
  action: {
    category: string;
    name: string;
    description: string;
    arguments: {
      transfers: {
        type: string;
        name: string;
        ticker: string;
        token: string;
        decimals: number;
        value: string;
        identifier: string;
      }[];
      receiver: string;
      functionName: string;
      functionArgs: string[];
    };
  };
  results?: {
    hash: string;
    timestamp: number;
    nonce: number;
    gasLimit: number;
    gasPrice: number;
    value: string;
    sender: string;
    receiver: string;
    data: string;
    prevTxHash: string;
    originalTxHash: string;
    callType: string;
    miniBlockHash: string;
  }[];
}
