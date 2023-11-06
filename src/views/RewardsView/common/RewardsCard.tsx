import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetXUser } from "@/hooks/useGetXUser";
import { REWARDS_BASE_URL } from "@/services/rest/rewards";
import ChartCard from "./ChartCard";

const RewardsCard = () => {
  const isConnectedWithXAccount = false;
  const user = useGetXUser();

  console.log("user", user);

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
          <div className="flex items-center w-full flex-wrap gap-5">
            <div>
              <div className="mb-2">Follow these steps to get started:</div>
              <ol className="list-decimal list-inside">
                <li>Connect your X account</li>
                <li>Interact or write about @dapfycom</li>
                <li>Earn rewards.</li>
              </ol>
            </div>

            <div className="flex-1 flex justify-center ">
              <Button asChild className="min-w-[150px] flex gap-1">
                <a href={`${REWARDS_BASE_URL}auth/twitter`}>
                  Connect{" "}
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      width={"16"}
                      height="16"
                      className="hover:scale-110"
                    >
                      <g>
                        <path
                          fill="currentColor"
                          d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                        ></path>
                      </g>
                    </svg>
                  </span>{" "}
                  account
                </a>
              </Button>
            </div>
          </div>
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
