import { PageHeaderHeading } from "@/components/PageHeader/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import SwapCard from "../SwapCard";
import SwapLpTab from "../SwapLpTab";

export function SwapTabs() {
  const [tab, setTab] = useState("swap");

  const handleChangeTab = (tab: string) => {
    setTab(tab);
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {" "}
            <PageHeaderHeading className="mb-10">
              {tab === "swap"
                ? "Swap any tokens on MultiversX"
                : "Buy Liquidity for any token on MultiversX"}
            </PageHeaderHeading>
          </TooltipTrigger>
          <TooltipContent>
            <p>Enjoy the smallest fees on MultiversX 🔥</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Tabs
        defaultValue={tab}
        onValueChange={handleChangeTab}
        className="w-[500px]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="swap">Swap Tokens</TabsTrigger>
          <TabsTrigger value="swapLp">Buy Liquidity</TabsTrigger>
        </TabsList>
        <TabsContent value="swap">
          <SwapCard />
        </TabsContent>
        <TabsContent value="swapLp">
          <SwapLpTab />
        </TabsContent>
      </Tabs>
    </>
  );
}
