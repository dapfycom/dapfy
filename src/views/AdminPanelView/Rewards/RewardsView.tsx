"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NFTs from "./NFTs/NFTs";
import Tasks from "./Tasks/Tasks";

const RewardsView = () => {
  return (
    <div className="h-full px-4 py-6 lg:px-8">
      <Tabs defaultValue="tasks" className="h-full space-y-6">
        <div className="space-between flex items-center">
          <TabsList>
            <TabsTrigger value="tasks" className="relative">
              Tasks
            </TabsTrigger>
            <TabsTrigger value="nfts">Nfts</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="tasks" className="border-none p-0 outline-none">
          <Tasks />
        </TabsContent>
        <TabsContent value="nfts" className="border-none p-0 outline-none">
          <NFTs />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RewardsView;
