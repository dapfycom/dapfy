import { PageHeaderHeading } from "@/components/PageHeader/PageHeader";
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
import { formatBalanceDollar } from "@/utils/functions/formatBalance";
import { useGetEgldPrice } from "@multiversx/sdk-dapp/hooks";
import { LogOut } from "lucide-react";
import { useGetAllTimeEarned } from "../lib/hooks";

const AllTimeEarned = () => {
  const { address } = useAuthentication();
  const { user, isAuthenticated, handleLogout } = useXAuthentication();
  const { allTimeEarned } = useGetAllTimeEarned();
  const { price } = useGetEgldPrice();
  if (!isAuthenticated) {
    return null;
  }
  return (
    <div className="mt-8 mb-8 max-w-xl mx-auto">
      {price && (
        <div>
          <PageHeaderHeading className="mb-6">
            <span className={"gradienteTitle"}>Earned Rewards</span>
          </PageHeaderHeading>
          <p className="text-4xl font-bold mb-8">
            $
            {formatBalanceDollar(
              {
                balance: allTimeEarned,
                decimals: 18,
              },
              price
            )}
          </p>
        </div>
      )}

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
    </div>
  );
};

export default AllTimeEarned;
