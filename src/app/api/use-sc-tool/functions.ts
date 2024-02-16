import prisma from "@/lib/db";

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

  const purchases = await prisma.tradesilvaniaTransaction.findMany({
    where: {
      user: {
        address: payload.address,
      },
      status: "settled",
      createdAt: {
        gte: payload.from,
        lte: payload.to,
      },
    },
  });

  const hasInteracted = purchases.length > 0;

  return hasInteracted;
};
