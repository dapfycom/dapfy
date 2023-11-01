"use client";
import { shortenHash } from "@/utils/functions/formatAddress";
import { formatNumber } from "@/utils/functions/formatBalance";
import { buildExplorerHashUrl } from "@/utils/functions/tokens";
import { Dot } from "lucide-react";
import Link from "next/link";
import { useGetPurchaseData } from "../../lib/hooks";

const PurchaseTable = () => {
  const { purchases, error } = useGetPurchaseData();

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
          {purchases.map((purchase) => {
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
                <td className="px-6 py-4 flex gap-2 items-center">
                  <Dot
                    size={"50px"}
                    className="text-green-600 my-[-20px] mx-[-20px]"
                  />{" "}
                  Success
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
