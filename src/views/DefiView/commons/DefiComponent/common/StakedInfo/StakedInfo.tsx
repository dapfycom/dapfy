import { Button } from "@/components/ui/button";
import useAuthentication from "@/hooks/useAuthentication";
import { useStake } from "@/views/DefiView/utils/hooks";
import { withdraw } from "@/views/DefiView/utils/services";
import { useContext } from "react";
import { FarmContext } from "../../DefiComponent";
import StakedDetails from "./StakedDetails/StakedDetails";

const StakedInfo = () => {
  const { hatomFarm } = useContext(FarmContext);
  const { isLoggedIn } = useAuthentication();

  const { StakeButton } = useStake(hatomFarm?.moneyMarket.tokenI || "");
  const handleWithdraw = (e: any) => {
    if (hatomFarm) {
      withdraw(hatomFarm.moneyMarket.childScAddress);
    }
  };
  return (
    <div className="flex w-full px-7 py-8 gap-10 flex-col md:flex-row ">
      {isLoggedIn ? (
        <>
          <div className="flex flex-1">
            <StakedDetails />
          </div>
          <div className="flex  items-center h-auto gap-5">
            <Button
              className="w-full md:w-auto text-sm"
              onClick={handleWithdraw}
            >
              {" "}
              withdraw
            </Button>
            {StakeButton}
          </div>
        </>
      ) : (
        <div className="flex w-full text-center justify-center mb-5">
          Please connect your wallet first
        </div>
      )}
    </div>
  );
};

export default StakedInfo;
