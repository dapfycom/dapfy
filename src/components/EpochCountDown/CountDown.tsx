import { useGetTimeUntilNextEpochCountDown } from "@/hooks/useGetStats";
import { cn } from "@/lib/utils";
import { secondsToHms } from "@/utils/functions/dates";
const CountDown = ({
  extraSpace,
  handleClickCountDown,
}: {
  extraSpace: boolean;
  handleClickCountDown: () => void;
}) => {
  const { timeUntilNextEpoch } = useGetTimeUntilNextEpochCountDown();

  return (
    <div
      // style={{
      //   marginTop: mt,
      // }}
      className={cn(
        `${
          extraSpace ? "mt-[80px] md:mt-[104px] " : "mt-[64px]"
        } flex justify-center text-center text-muted-foreground cursor-pointer`
      )}
      onClick={handleClickCountDown}
    >
      ≈ {secondsToHms(timeUntilNextEpoch)} until next reward
    </div>
  );
};

export default CountDown;
