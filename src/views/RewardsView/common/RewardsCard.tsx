import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAuthentication from "@/hooks/useAuthentication";
import { useXAuthentication } from "@/hooks/useXAuthentication";
import { cn } from "@/lib/utils";
import { useGetUserPoints } from "../lib/hooks";

const RewardsCard = () => {
  const { isLoggedIn } = useAuthentication();
  const { handleLogin, user, isAuthenticated, handleLogout } =
    useXAuthentication();
  const { rewards } = useGetUserPoints();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rewards Center</CardTitle>
        <CardDescription>Claim, Track, and Enjoy Your Benefits</CardDescription>
      </CardHeader>
      <CardContent>
        {isAuthenticated ? (
          <div className="flex w-full flex-col sm:flex-row">
            <div className="flex flex-col gap-4">
              {rewards && (
                <Reward
                  reward="Rewards points"
                  value={rewards.points.toLocaleString()}
                  // gradient text
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4aa7] to-[#0342ff]"
                />
              )}
            </div>
            <div className="flex-1 flex flex-col items-center sm:flex-row gap-10 justify-center mt-6 sm:mt-[-20px]">
              <div className="text-center">
                <div>Welcome</div>
                <p className="font-bold">@{user?.username}</p>
              </div>
              <div>
                <Button
                  className="gap-1"
                  variant={"secondary"}
                  onClick={handleLogout}
                >
                  Disconnect{" "}
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
                </Button>
              </div>
            </div>
          </div>
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
              <Button
                className={cn(
                  "min-w-[150px] flex gap-1",
                  !isLoggedIn ? "pointer-events-none opacity-70" : ""
                )}
                onClick={handleLogin}
              >
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
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RewardsCard;

interface RewardProps extends React.HTMLAttributes<HTMLDivElement> {
  reward: string;
  value: string;
  valueClassName?: string;
}
const Reward = ({ reward, value, valueClassName, ...rest }: RewardProps) => {
  return (
    <div className={cn("flex text-lg", rest.className)}>
      <p className=" mr-2">{reward}: </p>
      <p className={valueClassName}>{value}</p>
    </div>
  );
};

{
  /* <Card>
      <CardHeader>
        <CardTitle>Rewards Center</CardTitle>
        <CardDescription>Claim, Track, and Enjoy Your Benefits</CardDescription>
      </CardHeader>
      <CardContent>
        {isAuthenticated ? (
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
              <Button
                className="min-w-[150px] flex gap-1"
                onClick={handleLogin}
              >
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
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card> */
}
