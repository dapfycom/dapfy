import { routeNames } from "@/config/routes";
import { HeadphonesIcon } from "lucide-react";
import Link from "next/link";

const FloatingHelpButton = () => {
  return (
    <Link href={routeNames.help}>
      <div className="fixed bottom-[10px] right-[15px] h-[60px] w-[60px] rounded-full bg-[#3772FF] flex justify-center items-center">
        <HeadphonesIcon />
      </div>
    </Link>
  );
};

export default FloatingHelpButton;
