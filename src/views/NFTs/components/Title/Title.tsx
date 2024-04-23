"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetLeftToMint } from "../../utils/hooks";

const Title = () => {
  const { data, isLoading } = useGetLeftToMint();
  const total = 100;

  return (
    <>
      {isLoading ? (
        <div className="flex w-full justify-center space-y-3 mb-3">
          <Skeleton className="h-5 w-[320px]" />
        </div>
      ) : (
        <h1 className="text-3xl font-bold text-center mb-4 dark:text-white">
          JEETER NFT {total - data}/{total}
        </h1>
      )}
    </>
  );
};

export default Title;
