import { Button } from "@/components/ui/button";
import { useXAuthentication } from "@/hooks/useXAuthentication";
import Image from "next/image";

const CollectedEgld = () => {
  const { isAuthenticated } = useXAuthentication();

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
            <span className="font-bold">0.8</span>
          </div>
        </div>

        <Button className="h-14 bg-green-500 text-xl">COLLECT</Button>
      </div>
    </div>
  );
};

export default CollectedEgld;
