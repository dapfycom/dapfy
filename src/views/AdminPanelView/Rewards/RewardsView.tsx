import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AdminRewards } from "./AdminRewards";
import CheckLastRewarded from "./CheckLastRewarded/CheckLastRewarded";
import SupplyRewards from "./SupplyRewards/SupplyRewards";
import XUser from "./XUser/XUser";

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SupplyRewards />
          <CheckLastRewarded />
          <XUser />
        </div>
        <TabsContent value="music" className="border-none p-0 outline-none">
          <AdminRewards />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RewardsView;
