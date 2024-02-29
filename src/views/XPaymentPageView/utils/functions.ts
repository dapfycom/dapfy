import { selectedNetwork } from "@/config/network";
import { ITransacation } from "@/types/elrond.interface";
export interface IPayment {
  date: Date;
  receiver: string;
  sender: string;
  amount: string;
  decimals: number;
  tokenIdentifier: string;
  identifier: string;
  txHash: string;
}
export const formatPaymentTableData = (
  dataPayments: ITransacation[]
): IPayment[] => {
  const payments: IPayment[] = [];

  dataPayments.forEach((txPayment) => {
    let payment: IPayment;

    if (txPayment.value !== "0") {
      payment = {
        date: new Date(txPayment.timestamp * 1000),
        receiver: txPayment.receiver,
        sender: txPayment.sender,
        amount: txPayment.value,
        decimals: 18,
        tokenIdentifier: selectedNetwork.tokensID.egld,
        identifier: txPayment.txHash,
        txHash: txPayment.txHash,
      };
      payments.push(payment);
    } else {
      if (txPayment?.action) {
        if (
          txPayment.action.category === "esdtNft" &&
          txPayment.action.name === "transfer" &&
          txPayment.action.arguments.transfers.length > 0
        ) {
          txPayment.action.arguments.transfers.forEach((transfer) => {
            const identifier = transfer?.identifier || transfer.token;
            payment = {
              date: new Date(txPayment.timestamp * 1000),
              receiver: txPayment.receiver,
              sender: txPayment.sender,
              amount: transfer.value,
              decimals: transfer.decimals,
              tokenIdentifier: identifier,
              identifier: txPayment.txHash + "-" + identifier,
              txHash: txPayment.txHash,
            };
            payments.push(payment);
          });
        }
      } else {
        console.log({ txPayment });
      }
    }
  });

  return payments;
};
