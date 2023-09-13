"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { mainSiteRoutes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface MainNavProps {}

const MainNav: React.FC<MainNavProps> = () => {
  const pathname = usePathname();

  const navRoutes = mainSiteRoutes.filter((route) => Boolean(route.path));
  const routes = navRoutes.map((route) => ({
    href: route.path,
    label: route.title,
    active: pathname === route.path,
  }));

  return (
    <nav className="mx-6 items-center space-x-4 lg:space-x-6 hidden md:flex">
      {routes.map((route) => (
        <Button asChild variant={"ghost"} key={route.href}>
          <Link
            href={route.href || ""}
            className={cn(
              "text-sm font-medium transition-colors ",
              route.active
                ? "font-bold text-primary"
                : "font-medium text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        </Button>
      ))}
    </nav>
  );
};

export default MainNav;
