import { selectedNetwork } from "@/config/network";
import useGetMultipleElrondTokens from "@/hooks/useGetMultipleElrondTokens";
import useGetTokenPrice from "@/hooks/useGetTokenPrice";
import {
  formatBalance,
  formatBalanceDollar,
} from "@/utils/functions/formatBalance";
import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { useGetPayments } from "../../utils/hooks";
export default function TotalAmount() {
  const { payments } = useGetPayments();
  const [egldAmount, setEgldAmount] = useState("0");
  const [esdtDollarValue, setEsdtDollarValue] = useState("0");

  const tokensSet = new Set<string>(
    payments.map((payment) => payment.tokenIdentifier)
  );
  const [egldPrice] = useGetTokenPrice(selectedNetwork.tokensID.egld);
  const tokensIdentifiers = Array.from(tokensSet);

  const { tokens } = useGetMultipleElrondTokens(tokensIdentifiers);

  useEffect(() => {
    if (tokens?.length > 0 && payments.length > 0) {
      const egldPayments = payments.filter(
        (payment) => payment.tokenIdentifier === selectedNetwork.tokensID.egld
      );

      const egldTokenValue = egldPayments.reduce((acc, item) => {
        return acc.plus(item.amount);
      }, new BigNumber(0));

      setEgldAmount(egldTokenValue.toString());

      const esdtPayments = payments.filter(
        (payment) => payment.tokenIdentifier !== selectedNetwork.tokensID.egld
      );

      const esdtTokenDollarValue = esdtPayments.reduce((acc, item) => {
        const token = tokens.find(
          (token) => token.identifier === item.tokenIdentifier
        );
        if (token) {
          const price = token.price ? token.price : 0;
          return acc.plus(
            new BigNumber(item.amount)
              .dividedBy(new BigNumber(10).pow(item.decimals))
              .times(price)
          );
        }
        return acc;
      }, new BigNumber(0));

      setEsdtDollarValue(esdtTokenDollarValue.toString());
    } else {
      setEgldAmount("0");
      setEsdtDollarValue("0");
    }
  }, [tokens, payments]);

  const egldDollarValue = formatBalanceDollar(
    {
      balance: egldAmount,
      decimals: 18,
    },
    egldPrice
  );

  const totalValue = new BigNumber(egldDollarValue).plus(esdtDollarValue);

  const totalNoEsdtTokens = tokens.length - 1;
  return (
    <section className="w-full py-6 md:py-12">
      <div className="container flex flex-col items-center justify-center px-4 text-center  gap-3">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Total Amount Received
          </h2>
        </div>

        <div className="grid w-full grid-cols-1 items-center justify-center   gap-4">
          <div className="">
            <h3 className="text-xl font-bold tracking-wide sm:text-2xl">
              {formatBalance({
                balance: egldAmount,
                decimals: 18,
              })}{" "}
              EGLD {totalNoEsdtTokens > 0 && `and ${totalNoEsdtTokens} tokens`}
            </h3>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-semibold tracking-tighter">
              ≈{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(Number(totalValue))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
