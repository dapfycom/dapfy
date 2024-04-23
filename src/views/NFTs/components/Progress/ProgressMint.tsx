"use client";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { calculatePercentage } from "@/utils/functions/numbers";
import { useGetLeftToMint } from "../../utils/hooks";

const ProgressMint = () => {
  const { data, isLoading } = useGetLeftToMint();
  const total = 100;

  const available = calculatePercentage(total, data);
  const sold = total - available;
  return (
    <div>
      {" "}
      {isLoading ? (
        <div className="mb-4">
          <Skeleton className="h-4 w-full" />
          <div className="flex justify-between text-sm font-medium mt-2">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-4 w-10" />
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <Progress
            className="h-2 rounded-lg bg-gray-200 dark:bg-gray-700"
            value={sold}
          />
          <div className="flex justify-between text-sm font-medium mt-2">
            <span className="text-gray-600 dark:text-gray-300">
              {sold}% Sold
            </span>
            <span className="text-gray-600 dark:text-gray-300">
              {available}% Available
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressMint;
