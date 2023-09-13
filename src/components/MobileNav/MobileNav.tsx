import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainSiteRoutes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks";
import { logout } from "@multiversx/sdk-dapp/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import ConnectComponent from "../Login/ConnectComponent";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const MobileNav = () => {
  const { isLoggedIn } = useGetLoginInfo();

  const navRoutes = mainSiteRoutes.filter((route) => Boolean(route.path));
  const routes = navRoutes.map((route) => ({
    href: route.path,
    label: route.title,
  }));

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} className="md:hidden" variant={"outline"}>
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="mb-12 flex-1">
          {/* <SheetTitle className="mb-8">Menu</SheetTitle> */}

          <div className="flex flex-col gap-3">
            {routes.map((route) => (
              <Fragment key={route.href}>
                <Button asChild variant={"ghost"} className="justify-start">
                  <Link
                    href={route.href || ""}
                    className={cn(
                      "text-sm font-medium transition-colors text-gray-300 "
                    )}
                  >
                    {route.label}
                  </Link>
                </Button>

                <Separator className="my-1" />
              </Fragment>
            ))}
          </div>
        </SheetHeader>
        <SheetFooter>
          {isLoggedIn ? (
            <Button onClick={() => logout()}>Disconnet</Button>
          ) : (
            <ConnectComponent place="drawer" />
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
