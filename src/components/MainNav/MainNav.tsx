"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { mainSiteRoutes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface MainNavProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

const MainNav: React.FC<MainNavProps> = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();

  const navRoutes = mainSiteRoutes.filter((route) => Boolean(route.path));
  const routes = navRoutes.map((route) => ({
    href: route.path,
    label: route.title,
    active: pathname === route.path,
    soon: route.soon,
  }));

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => {
        if (!route.href) {
          return null;
        }

        return (
          <Link
            key={route.href}
            href={route.href}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              route.active ? "" : "text-muted-foreground"
            }`}
          >
            {route.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default MainNav;
