import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuthentication from "@/hooks/useAuthentication";
import { useXAuthentication } from "@/hooks/useXAuthentication";
import { formatAddress } from "@/utils/functions/formatAddress";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";

const AllTimeEarned = () => {
  const { address } = useAuthentication();
  const { user, isAuthenticated } = useXAuthentication();

  if (!isAuthenticated) {
    return null;
  }
  return (
    <div className="mt-8 mb-8">
      <h3 className="text-4xl text-orange-700 mb-2">All time Earned Rewards</h3>
      <p className="text-4xl font-bold mb-8">$25.7</p>

      <div className="w-full mb-16">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <Avatar className="w-14 h-14">
              <AvatarImage src={user?.profile_image_url} alt={user?.username} />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>

            <div className="text-left">
              <p>{user?.name}</p>
              <p className="text-muted-foreground">
                @{user?.username} <span className="text-gray-500">You</span>
              </p>
            </div>
          </div>
          <div className="text-gray-300">{formatAddress(address)}</div>
        </div>
      </div>

      <h4 className="text-blue-800 dark:text-blue-200 text-2xl mb-4">
        Complete today’s tasks to earn rewards
      </h4>
      <div className="w-full flex justify-center">
        <ul className="max-w-[600px] text-left flex flex-col gap-2">
          <li className="flex gap-3">
            <CheckCircle2 className="text-green-500 " /> Like retweet comment
            one of our posts
            <ArrowRight />
          </li>
          <li className="flex gap-3">
            <CheckCircle2 className="text-green-500 " /> Write a tweet about
            @dapfycom <ArrowRight />
          </li>
          <li className="flex gap-3">
            <Circle className="text-green-500 " />
            Interact with one of our useful DeFi tools <ArrowRight />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AllTimeEarned;
