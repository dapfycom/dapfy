import { useGetTimeUntilNextEpochCountDown } from "@/hooks/useGetStats";
import { secondsToHms } from "@/utils/functions/dates";

const EpochCountDown = () => {
  const { timeUntilNextEpoch } = useGetTimeUntilNextEpochCountDown();

  return (
    <div className="mt-16 flex justify-center text-center text-muted-foreground">
      ≈ {secondsToHms(timeUntilNextEpoch)} until next reward
    </div>
  );
};

export default EpochCountDown;
