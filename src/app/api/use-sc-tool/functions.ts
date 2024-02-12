import { selectedNetwork } from "@/config/network";
import { timeStampToSeconds } from "@/lib/date";
import { fetchTransactions } from "@/services/rest/elrond/transactions";
import { excludeSmartContracts } from "./excluded-sc";

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
