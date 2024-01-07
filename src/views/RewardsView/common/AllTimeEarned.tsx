import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthentication from "@/hooks/useAuthentication";
import { useXAuthentication } from "@/hooks/useXAuthentication";
import { formatAddress } from "@/utils/functions/formatAddress";
import { ArrowRight, CheckCircle2, Circle, LogOut } from "lucide-react";

const AllTimeEarned = () => {
  const { address } = useAuthentication();
  const { user, isAuthenticated, handleLogout } = useXAuthentication();

  if (!isAuthenticated) {
    return null;
  }
  return (
    <div className="mt-8 mb-8 max-w-xl mx-auto">
      <h3 className="text-4xl text-orange-700 mb-2">All time Earned Rewards</h3>
      <p className="text-4xl font-bold mb-8">$25.7</p>

      <div className="flex items-center w-full mb-16 flex-col md:flex-row  gap-3">
        <div className="flex  justify-between items-center flex-1">
          <div className="flex gap-3 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="w-14 h-14">
                  <AvatarImage
                    src={user?.profile_image_url}
                    alt={user?.username}
                  />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[200px]">
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Disconnect</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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
          <li>
            <a
              href="https://twitter.com/DapfyCom"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3"
            >
              <CheckCircle2 className="text-green-500 " /> Like retweet comment
              one of our posts
              <ArrowRight />
            </a>
          </li>
          <li>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3"
            >
              <CheckCircle2 className="text-green-500 " /> Write a tweet about
              @dapfycom <ArrowRight />
            </a>
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
