"use client";
import { provider } from "@/services/sc";
import { shortenHash } from "@/utils/functions/formatAddress";
import { formatNumber } from "@/utils/functions/formatBalance";
import { buildExplorerHashUrl } from "@/utils/functions/tokens";
import { Dot } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetPurchaseData } from "../../lib/hooks";
type TransactionStatusTypes = "success" | "cancel" | "stale" | "pending";

const PurchaseTable = () => {
  const { purchases, error } = useGetPurchaseData();
  const searchParams = useSearchParams();
  const [butTxStatus, setButTxStatus] =
    useState<TransactionStatusTypes>("stale");
  const status = searchParams.get("status");

  useEffect(() => {
    let interValID: any;
    const watchTransaction = async (txHash: any) => {
      interValID = setInterval(async () => {
        const tx = await provider.getTransaction(txHash);
        console.log("tx", tx);
        setButTxStatus(tx.status.status as TransactionStatusTypes);
        if (tx.status.status === "success" || tx.status.status === "cancel") {
          clearInterval(interValID);
        }
      }, 5000);
    };

    if (status) {
      if (status === "success") {
        if (purchases.length > 0) {
          const lastPurchase = purchases[0];
          watchTransaction(lastPurchase.txHash);
        }
      }
      if (status === "cancel") {
      }
    }

    return () => {
      if (interValID) {
        clearInterval(interValID);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, purchases.length]);

  if (purchases.length === 0) {
    return null;
  }

  if (error) {
    return (
      <div className="text-center text-muted-foreground">
        <p>Sorry, we are having some problems to laod your data</p>
      </div>
    );
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between pb-4"></div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Hash
            </th>
            <th scope="col" className="px-6 py-3">
              Token
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Amount paid
            </th>
            <th scope="col" className="px-6 py-3">
              Amount received
            </th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase, i) => {
            return (
              <tr
                key={purchase.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link
                    href={buildExplorerHashUrl(purchase.txHash)}
                    target="_blank"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    {shortenHash(purchase.txHash)}
                  </Link>
                </th>
                <td scope="row" className="px-6 py-4 ">
                  {purchase.product.name}
                </td>
                <td className="px-6 py-4">
                  {" "}
                  {new Date(purchase.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  {i === 0 && status === "success" ? (
                    <StatusColumn status={butTxStatus} />
                  ) : (
                    <span className="flex gap-2 items-center">
                      <Dot
                        size={"50px"}
                        className="text-green-600 my-[-20px] mx-[-20px]"
                      />{" "}
                      Success
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  ${formatNumber(purchase.totalCost)}
                </td>
                <td className="px-6 py-4">{formatNumber(purchase.quantity)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseTable;

const StatusColumn = ({ status }: { status: TransactionStatusTypes }) => {
  if (status === "success") {
    return (
      <span className="flex gap-2 items-center">
        <Dot size={"50px"} className="text-green-600 my-[-20px] mx-[-20px]" />{" "}
        Success
      </span>
    );
  }

  if (status === "pending") {
    return (
      <span className="flex gap-2 items-center">
        <Dot size={"50px"} className="text-yellow-600 my-[-20px] mx-[-20px]" />{" "}
        Pending
      </span>
    );
  }

  if (status === "cancel") {
    return (
      <span className="flex gap-2 items-center">
        <Dot size={"50px"} className="text-red-600 my-[-20px] mx-[-20px]" />{" "}
        Cancel
      </span>
    );
  }

  return (
    <span className="flex gap-2 items-center">
      <Dot
        size={"50px"}
        className="text-blue-600 my-[-20px] mx-[-20px] animate-pulse"
      />{" "}
      Validating
    </span>
  );
};
