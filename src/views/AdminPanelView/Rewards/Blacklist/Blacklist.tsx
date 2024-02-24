"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import BlackListContainer from "./BlackListTable";

const Blacklist = () => {
  return (
    <>
      <Separator className="my-4" />
      <div className="flex items-center justify-between text-center sm:text-left sm:flex-row flex-col-reverse">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Blacklist</h2>
          <p className="text-sm text-muted-foreground">
            User that never will receive rewards
          </p>
        </div>
      </div>
      <div className="relative">
        <ScrollArea>
          <BlackListContainer />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};

export default Blacklist;
