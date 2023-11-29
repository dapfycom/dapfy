import { Button } from "@/components/ui/button";
import useAuthentication from "@/hooks/useAuthentication";
import useDisclosure from "@/hooks/useDisclosure";
import { useContext } from "react";
import { AshFarmContext } from "../../FarmOneDex";
import { withdraw } from "../../utils/services";
import WithdrawModal from "../Modals/WithdrawModal";
import StakedDetails from "./StakedDetails/StakedDetails";

const StakedInfo = () => {
  const {
    isOpen: isOpenHarvest,
    onClose: onCloseHarvest,
    onOpen: onOpenHarvest,
  } = useDisclosure();
  const { isLoggedIn } = useAuthentication();
  const { farm } = useContext(AshFarmContext);

  if (!farm) return null;
  const handleHarvest = (e: any) => {
    e.stopPropagation();
    withdraw(farm?.farm_click_id);
  };
  return (
    <div className="flex w-full px-7 py- gap-10 flex-col md:flex-row pb-4 sm:pb-0">
      {isLoggedIn ? (
        <>
          <div className="flex flex-1">
            <StakedDetails />
          </div>
          <div className="flex  items-center h-auto">
            <Button
              className="w-full md:w-auto text-sm"
              onClick={handleHarvest}
            >
              {" "}
              withdraw
            </Button>
          </div>

          {isOpenHarvest && (
            <WithdrawModal isOpen={isOpenHarvest} onClose={onCloseHarvest} />
          )}
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
