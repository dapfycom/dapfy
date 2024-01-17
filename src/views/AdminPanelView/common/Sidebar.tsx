"use client";
import { Button } from "@/components/ui/button";
import { adminRoutes } from "@/config/routes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  noTitle?: boolean;
}

export function Sidebar({ className, noTitle }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          {noTitle ? null : (
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Menu
            </h2>
          )}
          <MenuLinks />
        </div>
      </div>
    </div>
  );
}

export const MenuLinks = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-1">
      {adminRoutes.map((r) => {
        const active = pathname === r.path;
        return (
          <Button
            key={r.path}
            asChild
            variant={active ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <Link href={r.path}>
              {r.icon}
              <span className="ml-2">{r.title}</span>
            </Link>
          </Button>
        );
      })}
    </div>
  );
};
