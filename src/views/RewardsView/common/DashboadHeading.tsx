import useGetWalletWorth from "@/hooks/useGetWalletWorth";
import { formatPrecision } from "@/utils/functions/formatBalance";
const DashboardHeading = () => {
  const { netWorth } = useGetWalletWorth();

  return (
    <h1 className="flex justify-center text-center flex-col px-6 mb-6 font-normal">
      <span className=" text-zinc-300 text-2xl font-bold mb-2 gradienteTitle">
        Net Worth
      </span>
      <span className="text-3xl font-bold">
        ${formatPrecision(netWorth, 2)}
      </span>
    </h1>
  );
};

export default DashboardHeading;
