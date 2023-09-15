export interface IUserFarmInfo {
  userTokens: {
    reward: string;
    debtLp: string;
    debtNft: string;
  }[];
  lpActive: string;
  lpStopped: string;
  nftActive: string[];
  nftStopped: string[];
  lock: any;
}

export interface IFarmInfo {
  tokenId: string[];
  tokenNonce: string[];
  start: string[];
  end: string[];
  totalRewards: string[];
  perShareLp: string[];
  perShareNft: string[];
  stakedLp: string;
  stakedNft: string;
  block: string;
}
