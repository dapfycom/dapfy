import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/PageHeader/PageHeader";
import useGetWalletWorth from "@/hooks/useGetWalletWorth";
import { formatPrecision } from "@/utils/functions/formatBalance";
const DashboardHeading = () => {
  const {netWorth} = useGetWalletWorth();
  
  return (
    <h1 className="flex justify-center text-center flex-col px-6 mb-6 font-normal">
      <span className=" text-zinc-300 text-lg mb-2">
       Net Worth
      </span>
      <span className="text-3xl font-bold" >
        ${formatPrecision(netWorth, 2)}
      </span>
    </h1>
  );
};

export default DashboardHeading;
