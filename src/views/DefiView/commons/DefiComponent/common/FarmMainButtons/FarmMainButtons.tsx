import { Button } from "@/components/ui/button";
import useAuthentication from "@/hooks/useAuthentication";
import useDisclosure from "@/hooks/useDisclosure";
import { ChevronDown, ChevronUp } from "lucide-react";
import { MouseEvent } from "react";

interface IProps {
  isOpen: boolean;
}

const FarmMainButtons = ({ isOpen }: IProps) => {
  const {
    isOpen: isOpenDeposit,
    onClose: onCloseDeposit,
    onOpen: onOpenDeposit,
  } = useDisclosure();
  const { isLoggedIn, handleConnect } = useAuthentication();
  const handleDeposit = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onOpenDeposit();
  };

  return (
    <div className="flex justify-center items-center gap-4 flex-col lg:flex-row">
      {isLoggedIn ? (
        <>
          <Button className="text-sm w-full lg:w-auto" onClick={handleDeposit}>
            Deposit
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
