import { selectedNetwork } from "@/config/network";
import { decodeBase64ToString } from "@/lib/coder";
import { fetchTransactions } from "@/services/rest/elrond/transactions";
import { Address } from "@multiversx/sdk-core/out";

// export const UserAddressHasInteracted = async (payload: {
//   to: Date;
//   from: Date;
//   address?: string;
// }) => {
//   if (!payload.address) {
//     return false;
//   }

//   const results = await fetchTransactions({
//     before: timeStampToSeconds(payload.to.getTime()),
//     after: timeStampToSeconds(payload.from.getTime()),
//     sender: payload.address,
//     size: 1000,
//     status: "success",
//   });

//   const scAddressArr = Object.entries(selectedNetwork.scAddress);

//   let hasInteracted = false;

//   for (let index = 0; index < scAddressArr.length && !hasInteracted; index++) {
//     const addressElement = scAddressArr[index];

//     if (excludeSmartContracts.includes(addressElement[0])) {
//       continue;
//     }

//     for (let j = 0; j < results.length && !hasInteracted; j++) {
//       const tx = results[j];

//       if (
//         tx.receiver === addressElement[1] ||
//         tx.action?.arguments?.receiver === addressElement[1]
//       ) {
//         hasInteracted = true;
//       }
//     }
//   }

//   return hasInteracted;
// };
export const UserAddressHasInteracted = async (payload: {
  to: Date;
  from: Date;
  address?: string;
}) => {
  if (!payload.address) {
    return false;
  }

  const results = await fetchTransactions({
    // before: timeStampToSeconds(payload.to.getTime()),
    // after: timeStampToSeconds(payload.from.getTime()),
    sender: payload.address,
    status: "success",
    receiver: selectedNetwork.scAddress.ashSwapAggregator,
    size: 1000,
  });
  console.log("results", results);

  let hasInteracted = false;

  results.forEach((tx) => {
    const hexData = decodeBase64ToString(tx.data || "");
    const dataArr = hexData.split("@");

    let lobbyAddress = "";
    try {
      lobbyAddress = Address.fromHex(dataArr[dataArr.length - 1]).bech32();
    } catch (error) {
      console.error(error);
    }

    if (
      lobbyAddress ===
      "erd1085h6wdckzfkvfftq837mwt2a780dv0p8wcjjpauku7at0dlqswszewvjn"
    ) {
      if (
        Buffer.from(dataArr[1], "hex")
          .toString("utf-8")
          .includes(selectedNetwork.tokensID.bsk)
      ) {
        hasInteracted = true;
      }
    }
  });

  return hasInteracted;
};

// export const UserAddressHasInteracted = async (payload: {
//   to: Date;
//   from: Date;
//   address?: string;
// }) => {
//   if (!payload.address) {
//     return false;
//   }

//   const purchases = await prisma.tradesilvaniaTransaction.findMany({
//     where: {
//       user: {
//         address: payload.address,
//       },
//       status: "settled",
//       createdAt: {
//         gte: payload.from,
//         lte: payload.to,
//       },
//     },
//   });

//   const hasInteracted = purchases.length > 0;

//   return hasInteracted;
// };
