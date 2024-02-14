import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { WalletIcon } from "../ui-system/icons/ui-icons";
import { Button } from "../ui/button";
interface IPros {}
const BuyEgldButton = () => {
  return (
    <Dialog>
      <DialogTrigger>
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
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <iframe
              src="https://ramp.tradesilvania.com/?partnerId=65bcb0cbc9cb8dcfdd313284&assetTo=EGLD&networkTo=egld&language=en"
              allowFullScreen
              width="100%"
              height="700"
              allow="camera"
            ></iframe>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default BuyEgldButton;
