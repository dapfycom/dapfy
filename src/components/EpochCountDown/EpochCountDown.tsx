import { routeNames } from "@/config/routes";
import useAuthentication from "@/hooks/useAuthentication";
import { useGetTimeUntilNextEpochCountDown } from "@/hooks/useGetStats";
import { cn } from "@/lib/utils";
import { secondsToHms } from "@/utils/functions/dates";
import { usePathname, useRouter } from "next/navigation";
const EpochCountDown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { timeUntilNextEpoch } = useGetTimeUntilNextEpochCountDown();
  let mt = "64px";

  const { isLoggedIn } = useAuthentication();
  if (pathname === "/" && !isLoggedIn) {
    mt = "104px";
  }

  const handleClickCountDown = () => {
    router.push(routeNames.dashboard);
  };

  const extraSpace = pathname === "/" && !isLoggedIn;
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

export default EpochCountDown;
