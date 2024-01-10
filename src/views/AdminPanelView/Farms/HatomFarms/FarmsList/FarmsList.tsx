import { useGetTvl } from "@/views/DefiView/utils/hooks";
import FarmItem from "./FarmItem";

const FarmsList = () => {
  const hatomData = useGetTvl();
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3   gap-8 ">
      {hatomData.tlvs.map((farm) => {
        return <FarmItem key={farm.moneyMarket.htokenI} hatomFarm={farm} />;
      })}

      {hatomData.isLoading && (
        // skeleton

        <>
          <div className="w-full mt-10">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-36 bg-zinc-800 rounded w-full"></div>
              </div>
            </div>
          </div>
          <div className="w-full mt-10">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-36 bg-zinc-800 rounded w-full"></div>
              </div>
            </div>
          </div>

          <div className="w-full mt-10">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-36 bg-zinc-800 rounded w-full"></div>
              </div>
            </div>
          </div>
          <div className="w-full mt-10">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-36 bg-zinc-800 rounded w-full"></div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FarmsList;
