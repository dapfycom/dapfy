export interface IPurchase {
  createdAt: Date;
  product: {
    name: string;
  };
  quantity: number;
  txHash: string;
  totalCost: number;
  id: string;
}
