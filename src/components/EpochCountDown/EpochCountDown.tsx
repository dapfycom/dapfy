import useAuthentication from "@/hooks/useAuthentication";
import { useGetTimeUntilNextEpochCountDown } from "@/hooks/useGetStats";
import { cn } from "@/lib/utils";
import { secondsToHms } from "@/utils/functions/dates";
import { usePathname } from "next/navigation";
const EpochCountDown = () => {
  const pathname = usePathname();
  const { timeUntilNextEpoch } = useGetTimeUntilNextEpochCountDown();
  let mt = "64px";
  const { isLoggedIn } = useAuthentication();
  if (pathname === "/" && !isLoggedIn) {
    mt = "104px";
  }
  return (
    <div
      style={{
        marginTop: mt,
      }}
      className={cn(
        "mt-16 flex justify-center text-center text-muted-foreground"
      )}
    >
      ≈ {secondsToHms(timeUntilNextEpoch)} until next reward
    </div>
  );
};

export default EpochCountDown;
