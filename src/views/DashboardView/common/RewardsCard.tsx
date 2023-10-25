import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChartCard from "./ChartCard";

const RewardsCard = () => {
  const isConnectedWithXAccount = false;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rewards Center</CardTitle>
        <CardDescription>Claim, Track, and Enjoy Your Benefits</CardDescription>
      </CardHeader>
      <CardContent>
        {isConnectedWithXAccount ? (
          <>
            <div className="flex flex-col gap-4">
              <Reward reward="Reward Power" value={"3.5 %"} />
              <Reward reward="Overall Rewards" value={"1.2 EGLD"} />
              <Reward reward="Uncollected rewards" value={"4.2 EGLD"} />
            </div>
            <div className="w-full flex mt-4">
              <Button className="min-w-[150px]">Claim</Button>
            </div>
            <div className="mt-8">
              <ChartCard />
            </div>
          </>
        ) : (
          <>
            <div className="mb-2">Follow these steps to get started:</div>
            <ol className="list-decimal list-inside">
              <li>Connect your X account</li>
              <li>Interact or write about @dapfycom</li>
              <li>Earn rewards.</li>
            </ol>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RewardsCard;

interface RewardProps {
  reward: string;
  value: string;
}
const Reward = ({ reward, value }: RewardProps) => {
  return (
    <div className="flex text-lg">
      <p className=" mr-2">{reward}: </p>
      <p>{value}</p>
    </div>
  );
};
