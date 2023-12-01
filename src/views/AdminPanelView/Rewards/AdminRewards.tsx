"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import LeaderboardTable from "./LeaderboardTable";
import RewardsHeader from "./RewardsHeader";

export function AdminRewards() {
  return (
    <>
      <RewardsHeader />
      <Separator className="my-4" />
      <div className="relative">
        <ScrollArea>
          <LeaderboardTable />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
}
