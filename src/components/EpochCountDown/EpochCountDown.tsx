import { routeNames } from "@/config/routes";
import useAuthentication from "@/hooks/useAuthentication";
import { usePathname, useRouter } from "next/navigation";
import CountDown from "./CountDown";
const EpochCountDown = () => {
  const router = useRouter();
  const pathname = usePathname();
  let mt = "64px";

  const { isLoggedIn } = useAuthentication();
  if (pathname === "/" && !isLoggedIn) {
    mt = "104px";
  }

  const handleClickCountDown = () => {
    router.push(routeNames.rewards);
  };

  const extraSpace = pathname === "/" && !isLoggedIn;
  return (
    <CountDown
      extraSpace={extraSpace}
      handleClickCountDown={handleClickCountDown}
    />
  );
};

export default EpochCountDown;
