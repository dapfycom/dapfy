import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import axiosDapfy from "@/services/rest/dapfy-api";
import { Address } from "@multiversx/sdk-core/out";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "./useRedux";

const useBuyFromTradesilvania = () => {
  const address = useAppSelector(selectUserAddress);
  const searchParams = useSearchParams();
  const onlyOnce = useRef(false);

  const transactionId = searchParams.get("transactionId");
  const transactionStatus = searchParams.get("transactionStatus");

  useEffect(() => {
    if (
      transactionId &&
      transactionStatus &&
      address &&
      onlyOnce.current === false
    ) {
      onlyOnce.current = true;
      toast.success(
        "Transaction has been completed successfully, the current status is:" +
          transactionStatus
      );
      axiosDapfy.post("/purchases/tradesilvania", {
        address: Address.fromString(address).hex(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);
};

export default useBuyFromTradesilvania;
