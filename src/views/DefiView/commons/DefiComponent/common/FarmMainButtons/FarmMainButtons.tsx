import { Button } from "@/components/ui/button";
import useAuthentication from "@/hooks/useAuthentication";
import { claimUserRewards } from "@/views/DefiView/utils/services";
import { ChevronDown, ChevronUp } from "lucide-react";
import { MouseEvent, useContext } from "react";
import { FarmContext } from "../../DefiComponent";

interface IProps {
  isOpen: boolean;
}

const FarmMainButtons = ({ isOpen }: IProps) => {
  const { hatomFarm } = useContext(FarmContext);
  const { isLoggedIn, handleConnect } = useAuthentication();
  // const {
  //   isOpen: isOpenDeposit,
  //   onClose: onCloseDeposit,
  //   onOpen: onOpenDeposit,
  // } = useDisclosure();
  // const handleDeposit = (e: MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   onOpenDeposit();
  // };

  const handleClaimRewards = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (hatomFarm) {
      claimUserRewards(hatomFarm?.moneyMarket.childScAddress);
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 flex-col lg:flex-row">
      {isLoggedIn ? (
        <>
          <Button
            className="text-sm w-full lg:w-auto"
            onClick={handleClaimRewards}
          >
            Claim rewards
          </Button>

          <span className="text-lg">
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </span>
        </>
      ) : (
        <Button className="w-auto" onClick={handleConnect}>
          Connect Wallet
        </Button>
      )}

      {/* {isOpenDeposit && (
        // <StakeModal isOpen={isOpenStake} onClose={onCloseStake} />
      )} */}
    </div>
  );
};

export default FarmMainButtons;
