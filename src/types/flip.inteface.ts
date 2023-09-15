export interface IFlipBet {
  id: number | string;
  address: string;
  isHeadBet: boolean;
  result: boolean;
  betAmount: string;
  creationDate: Date;
  txHash: string;
}
