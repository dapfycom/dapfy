import { useAppSelector } from "@/hooks/useRedux";
import { timeStampToSeconds } from "@/lib/date";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import { fetchTransfers } from "@/services/rest/elrond/transactions";
import { useFormikContext } from "formik";
import useSWR from "swr";
import { IFormValues } from "../common/FormikContainer/FormikContainer";
import { formatPaymentTableData } from "./functions";

export const useGetPayments = () => {
  const address = useAppSelector(selectUserAddress);
  const { values } = useFormikContext<IFormValues>();

  const { data, isLoading, error } = useSWR(
    values.receiver
      ? [
          `/api/payments`,
          values.receiver,
          values.sender,
          values.from.toLocaleDateString(),
          values.to.toLocaleDateString(),
          values.type,
        ]
      : null,
    async () => {
      let txfunction;
      switch (values.type) {
        case "all":
          txfunction = undefined;
          break;
        case "egld":
          txfunction = "transfer";
          break;
        case "esdt":
          txfunction = "ESDTTransfer";
          break;
        default:
          break;
      }

      return fetchTransfers({
        receiver: values.receiver || undefined,
        sender: values.sender || undefined,
        after: timeStampToSeconds(values.from.getTime()),
        before: timeStampToSeconds(values.to.getTime()),
        function: txfunction,
        status: "success",
        size: 10000,
      });
    }
  );

  return {
    payments: formatPaymentTableData(data || []),
    isLoading,
    error,
  };
};
