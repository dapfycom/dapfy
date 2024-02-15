import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainSiteRoutes } from "@/config/routes";
import useAuthentication from "@/hooks/useAuthentication";
import useDisclosure from "@/hooks/useDisclosure";
import { cn } from "@/lib/utils";
import { Menu, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Fragment } from "react";
import BuyEgldButton from "../BuyEgldButton/BuyEgldButton";
import ConnectComponent from "../Login/ConnectComponent";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const MobileNav = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const { setTheme, theme } = useTheme();
  const { handleDisconnect, isLoggedIn, isAdmin } = useAuthentication();

  const navRoutes = mainSiteRoutes.filter((route) => Boolean(route.path));
  const routes = navRoutes.map((route) => ({
    ...route,
    href: route.path,
    label: route.title,
  }));

  return (
    <Sheet open={isOpen} onOpenChange={onToggle}>
      <SheetTrigger asChild>
        <Button size={"icon"} className="xl:hidden" variant={"outline"}>
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col ">
        <SheetHeader className="mb-12 flex-1 pt-4">
          {/* <SheetTitle className="mb-8">Menu</SheetTitle> */}

          <div className="flex flex-col gap-3">
            {routes.map((route) => {
              if (route.onlyAdmin && !isAdmin) return null;

              return (
                <Fragment key={route.href}>
                  <Button asChild variant={"ghost"} className="justify-start">
                    <Link
                      href={route.href || ""}
                      className={cn("text-sm font-medium transition-colors  ")}
                      onClick={onClose}
                    >
                      {route.label}
                    </Link>
                  </Button>

                  <Separator className="my-1" />
                </Fragment>
              );
            })}
          </div>
        </SheetHeader>

        <div c className="mx-auto">
          <BuyEgldButton />
        </div>
        <SheetFooter className="!flex-col">
          <div className="flex justify-center mb-4 gap-3">
            <Button
              size={"icon"}
              variant={theme === "light" ? "secondary" : "outline"}
              onClick={() => setTheme("light")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem]   " />
            </Button>
            <Button
              size={"icon"}
              variant={theme === "dark" ? "secondary" : "outline"}
              onClick={() => setTheme("dark")}
            >
              <Moon className=" h-[1.2rem] w-[1.2rem]" />
            </Button>
            <Button
              size={"icon"}
              variant={theme === "system" ? "secondary" : "outline"}
            >
              <Monitor
                className=" h-[1.2rem] w-[1.2rem]"
                onClick={() => setTheme("system")}
              />
            </Button>
          </div>
          {isLoggedIn ? (
            <Button onClick={handleDisconnect}>Disconnect</Button>
          ) : (
            <ConnectComponent place="drawer" />
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
