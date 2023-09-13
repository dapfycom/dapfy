import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainSiteRoutes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { Menu, Zap } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const MobileNav = () => {
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
          <Button className="lex items-center rounded-fullpx-4 w-full">
            <Zap size={20} className="mr-2" />
            <span>Connet</span>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
