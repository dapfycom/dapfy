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
import { useGetIsUserInteractedDefiTool, useGetUserTasks } from "../lib/hooks";

const AllTimeEarned = () => {
  const { address } = useAuthentication();
  const { user, isAuthenticated, handleLogout } = useXAuthentication();
  const { tasks } = useGetUserTasks();
  const { isUserInteractedDefiTool } = useGetIsUserInteractedDefiTool();

  if (!isAuthenticated) {
    return null;
  }
  return (
    <div className="mt-8 mb-8 max-w-xl mx-auto">
      <h3 className="text-4xl text-orange-700 mb-2">All time Earned Rewards</h3>
      <p className="text-4xl font-bold mb-8">$0</p>

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
            >
              <UserTask
                text="Like retweet comment one of our posts"
                completed={
                  !!tasks?.comment || !!tasks?.comment || !!tasks?.like
                }
              />
            </a>
          </li>
          <li>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <UserTask
                text="Write a tweet about @dapfycom"
                completed={!!tasks?.mention}
              />
            </a>
          </li>
          <li>
            <UserTask
              text=" Interact with one of our useful DeFi tools"
              completed={isUserInteractedDefiTool}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AllTimeEarned;

const UserTask = ({
  completed,
  text,
}: {
  completed?: boolean;
  text: string;
}) => {
  return (
    <span className="flex gap-3">
      <span className="w-[18px] sm:w-[23px]">
        {completed ? (
          <CheckCircle2 className="text-green-500 w-[18px] sm:w-[23px]" />
        ) : (
          <Circle className="text-green-500 w-[18px] sm:w-[23px]" />
        )}
      </span>

      <div className="flex flex-auto">
        {text} <ArrowRight />
      </div>
    </span>
  );
};
