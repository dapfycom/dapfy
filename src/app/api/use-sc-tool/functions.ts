import { selectedNetwork } from "@/config/network";
import { timeStampToSeconds } from "@/lib/date";
import { fetchTransactions } from "@/services/rest/elrond/transactions";
import { excludeSmartContracts } from "./excluded-sc";

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
//     status: "success",
//     receiver: selectedNetwork.scAddress.ashSwapAggregator,
//     size: 50,
//     withScResults: true,
//   });

//   let hasInteracted = false;

//   results.forEach((tx) => {
//     const hexData = decodeBase64ToString(tx.data || "");
//     const dataArr = hexData.split("@");

//     let lobbyAddress = "";
//     const addressAtTheEnd = dataArr[dataArr.length - 1];

//     if (addressIsValid(addressAtTheEnd)) {
//       try {
//         lobbyAddress = Address.fromHex(addressAtTheEnd).bech32();
//       } catch (error) {
//         console.error(error);
//       }

//       if (
//         lobbyAddress ===
//         "erd1085h6wdckzfkvfftq837mwt2a780dv0p8wcjjpauku7at0dlqswszewvjn"
//       ) {
//         const results = tx?.results || [];
//         for (let index = 0; index < results.length; index++) {
//           const result = results[index];
//           if (!result.data) continue;

//           const resultData = decodeBase64ToString(result.data);

//           const resultDataArr = resultData.split("@");
//           // console.log(
//           //   "resultDataArr",
//           //   resultDataArr.map((x) => Buffer.from(x, "hex").toString("utf-8"))
//           // );

//           for (let index = 0; index < resultDataArr.length; index++) {
//             const result = resultDataArr[index];
//             try {
//               if (!result) continue;
//               // console.log("result", result);
//               const decodedResult = Buffer.from(result, "hex").toString(
//                 "utf-8"
//               );

//               // console.log("decodedResult", decodedResult);

//               if (decodedResult === selectedNetwork.tokensID.moge) {
//                 hasInteracted = true;
//               }
//             } catch (error) {
//               console.log("Error on results", {
//                 result,
//                 error,
//               });
//             }
//           }
//         }
//       }
//     }
//   });

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
    before: timeStampToSeconds(payload.to.getTime()),
    after: timeStampToSeconds(payload.from.getTime()),
    sender: payload.address,
    size: 1000,
    status: "success",
  });

  const scAddressArr = Object.entries(selectedNetwork.scAddress);

  let hasInteracted = false;

  for (let index = 0; index < scAddressArr.length && !hasInteracted; index++) {
    const addressElement = scAddressArr[index];

    if (excludeSmartContracts.includes(addressElement[0])) {
      continue;
    }

    for (let j = 0; j < results.length && !hasInteracted; j++) {
      const tx = results[j];

      if (
        tx.receiver === addressElement[1] ||
        tx.action?.arguments?.receiver === addressElement[1]
      ) {
        hasInteracted = true;
      }
    }
  }

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

//   const results = await fetchTransactions({
//     before: timeStampToSeconds(payload.to.getTime()),
//     after: timeStampToSeconds(payload.from.getTime()),
//     sender: payload.address,
//     status: "success",
//     receiver: selectedNetwork.scAddress.ashSwapAggregator,
//     size: 50,
//     withScResults: true,
//   });

//   let hasInteracted = false;

//   await Promise.all(
//     results.map(async (tx) => {
//       const hexData = decodeBase64ToString(tx.data || "");
//       const dataArr = hexData.split("@");

//       let lobbyAddress = "";
//       const addressAtTheEnd = dataArr[dataArr.length - 1];

//       if (addressIsValid(addressAtTheEnd)) {
//         try {
//           lobbyAddress = Address.fromHex(addressAtTheEnd).bech32();
//         } catch (error) {
//           console.error(error);
//         }

//         if (
//           lobbyAddress ===
//           "erd1085h6wdckzfkvfftq837mwt2a780dv0p8wcjjpauku7at0dlqswszewvjn"
//         ) {
//           let tokenInfo = await fetchTokenById(selectedNetwork.tokensID.moge);
//           const results = tx?.results || [];
//           let totalAmountUsdValue = new Bignumber(0);
//           for (let index = 0; index < results.length; index++) {
//             const result = results[index];
//             if (!result.data || result.receiver !== payload.address) continue;

//             const resultData = decodeBase64ToString(result.data);

//             const resultDataArr = resultData.split("@");

//             for (let index = 0; index < resultDataArr.length; index++) {
//               const result = resultDataArr[index];
//               try {
//                 if (!result) continue;
//                 // console.log("result", result);
//                 const decodedResult = Buffer.from(result, "hex").toString(
//                   "utf-8"
//                 );

//                 // console.log("decodedResult", decodedResult);

//                 if (decodedResult === selectedNetwork.tokensID.moge) {
//                   console.log("token", decodedResult);

//                   const amountResult = resultDataArr[index + 1];
//                   console.log("tokenInfo.price", tokenInfo.price);

//                   console.log("amountResult ", amountResult);

//                   const decodedAmount = parseInt(amountResult, 16);
//                   console.log("decodedAmount ", decodedAmount);

//                   const realAmount = new Bignumber(decodedAmount).dividedBy(
//                     new Bignumber(10).pow(tokenInfo.decimals)
//                   );
//                   console.log("realAmount ", realAmount.toNumber());

//                   const amountUsdValue = realAmount.multipliedBy(
//                     tokenInfo.price
//                   );

//                   console.log("amountUsdValue ", amountUsdValue.toNumber());

//                   totalAmountUsdValue =
//                     totalAmountUsdValue.plus(amountUsdValue);
//                 }
//               } catch (error) {
//                 console.log("Error on results", {
//                   result,
//                   error,
//                 });
//               }
//             }
//           }

//           console.log("totalAmountUsdValue", totalAmountUsdValue.toNumber());
//           if (totalAmountUsdValue.isGreaterThanOrEqualTo(1)) {
//             hasInteracted = true;
//           }
//         }
//       }
//     })
//   );

//   console.log("hasInteracted", hasInteracted);

//   return hasInteracted;
// };

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
