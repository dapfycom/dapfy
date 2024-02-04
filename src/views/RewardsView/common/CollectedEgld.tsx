import { ShoppingBagIcon } from "@/components/ui-system/icons/ui-icons";
import { Button } from "@/components/ui/button";
import { useXAuthentication } from "@/hooks/useXAuthentication";
import { formatBalance } from "@/utils/functions/formatBalance";
import Image from "next/image";
import { useGetUnCollectedRewards } from "../lib/hooks";
import { claimRewards } from "../lib/services";

const CollectedEgld = () => {
  const { isAuthenticated } = useXAuthentication();
  const { rewards } = useGetUnCollectedRewards();
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="w-full flex justify-center ">
      <div className="flex flex-col w-full max-w-[500px] gap-4">
        <div className="flex w-full justify-between mb">
          <p className="text-blue-800 dark:text-blue-200  text-xl">
            Your uncollected EGLD:{" "}
          </p>
          <div className="flex gap-3 items-center">
            <Image src="/images/egld.svg" alt="" width={22} height={22} />
            <span className="font-bold">
              {formatBalance({
                balance: rewards,
              })}
            </span>
          </div>
        </div>

        <Button
          key="1"
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 text-white shadow-md"
          onClick={claimRewards}
        >
          <ShoppingBagIcon className="mr-2 h-4 w-4" />
          Collect
        </Button>
      </div>
    </div>
  );
};

export default CollectedEgld;
