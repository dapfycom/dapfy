"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import LeaderboardTable from "./LeaderboardTable";
import RewardsHeader from "./RewardsHeader";

export function LeaderboardContainer() {
  return (
    <>
      <Separator className="my-4" />
      <RewardsHeader />
      <div className="relative">
        <ScrollArea>
          <LeaderboardTable />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
}
