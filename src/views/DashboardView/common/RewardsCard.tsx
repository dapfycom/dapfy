import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RewardsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rewards Center</CardTitle>
        <CardDescription>Claim, Track, and Enjoy Your Benefits</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Reward reward="Reward Power" value={"3.5 %"} />
          <Reward reward="Overall Rewards" value={"1.2 EGLD"} />
          <Reward reward="Uncollected rewards" value={"4.2 EGLD"} />
        </div>
      </CardContent>
      <CardFooter className="w-full flex">
        <Button className="min-w-[150px]">Claim</Button>
      </CardFooter>
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