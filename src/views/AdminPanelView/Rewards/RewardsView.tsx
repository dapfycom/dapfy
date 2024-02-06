import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AdminRewards } from "./AdminRewards";
import SupplyRewards from "./SupplyRewards/SupplyRewards";

const RewardsView = () => {
  return (
    <div className="h-full px-4 py-6 lg:px-8">
      <Tabs defaultValue="music" className="h-full space-y-6">
        <div className="space-between flex items-center">
          {/* <TabsList>
            <TabsTrigger value="music" className="relative">
              Music
            </TabsTrigger>
            <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
            <TabsTrigger value="live" disabled>
              Live
            </TabsTrigger>
          </TabsList> */}
        </div>
        <SupplyRewards />
        <TabsContent value="music" className="border-none p-0 outline-none">
          <AdminRewards />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RewardsView;
