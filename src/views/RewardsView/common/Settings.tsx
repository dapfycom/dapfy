import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CollectRewardsCard from "./CollectRewardsCard";
import LanguageCard from "./LanguageCard";
import SlippageCard from "./SlippageCard";

const Settings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <LanguageCard />
          <SlippageCard />
          <CollectRewardsCard />
        </div>
      </CardContent>
    </Card>
  );
};

export default Settings;
