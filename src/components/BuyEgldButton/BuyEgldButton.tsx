import { WalletIcon } from "../ui-system/icons/ui-icons";
import { Button } from "../ui/button";

const BuyEgldButton = () => {
  return (
    <a href="https://ramp.tradesilvania.com/?partnerId=65bcb0cbc9cb8dcfdd313284&assetTo=EGLD&networkTo=egld&language=en">
      <Button
        key="1"
        className="bg-gradient-to-r from-[#434190] to-[#9059ff] text-white font-semibold  px-8 rounded-full flex items-center justify-center space-x-2"
      >
        <span className="bg-green-500 text-white font-semibold py-1 px-2 rounded-full text-xs">
          NEW
        </span>
        <WalletIcon className="text-white h-6 w-6" />
        <span>Buy EGLD</span>
      </Button>
    </a>
  );
};

export default BuyEgldButton;
