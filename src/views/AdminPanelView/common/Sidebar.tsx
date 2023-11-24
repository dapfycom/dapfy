import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Table2 } from "lucide-react";

export type Playlist = (typeof playlists)[number];

export const playlists = [
  "Recently Added",
  "Recently Played",
  "Top Songs",
  "Top Albums",
  "Top Artists",
  "Logic Discography",
  "Bedtime Beats",
  "Feeling Happy",
  "I miss Y2K Pop",
  "Runtober",
  "Mellow Days",
  "Eminem Essentials",
];

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Menu
          </h2>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start">
              <Table2 className="mr-1" />
              Rewards
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
