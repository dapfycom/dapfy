export interface IMoneyMarket {
  htokenI: string;
  tokenI: string;
  mmScAddress: string;
  childScAddress: string;
}

export interface IMoneyMarketReward {
  moneyMarket: IMoneyMarket;
  rewards: string;
}

export interface IMoneyMarketDeposit {
  moneyMarket: IMoneyMarket;
  depositAmount: string;
}

export interface IMoneyMarkeTvl {
  moneyMarket: IMoneyMarket;
  tvl: string;
}
