import { X } from "lucide-react";
import { Button } from "../ui/button";

interface IProps {
  close: () => void;
}
const PishingWarn = ({ close }: IProps) => {
  return (
    <div className="w-full justify-center py-2 bg-gradient px-6 relative flex">
      <div className="rounded-full rgba(0,0,0,0.5)  px-5 py-3 w-full max-w-[900px]">
        <p className="text-center text-xs ">
          <span className="text-[#86d72f]">PHISHING WARNING:</span> please make
          sure you are visiting{" "}
          <span className="">{process.env.NEXT_PUBLIC_BASE_URL} </span>- check
          the URL carefully
        </p>
      </div>
      <Button
        size={"icon"}
        variant={"ghost"}
        className="absolute right-[20px] top-1/2 transform -translate-y-1/2"
        aria-label="close"
        onClick={close}
      >
        <X />
      </Button>
    </div>
  );
};

export default PishingWarn;
