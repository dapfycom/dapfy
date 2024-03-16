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
import { copyTextToClipboard } from "@/utils/functions/general";
import { useGetEgldPrice } from "@multiversx/sdk-dapp/hooks";
import { Check, Copy, LogOut } from "lucide-react";
import { useState } from "react";
import { useGetAllTimeEarned } from "../lib/hooks";

const AllTimeEarned = () => {
  const { address } = useAuthentication();
  const { user, isAuthenticated, handleLogout } = useXAuthentication();
  const { allTimeEarned } = useGetAllTimeEarned();
  const { price } = useGetEgldPrice();
  const [copyClicked, setCopyClicked] = useState(false);
  if (!isAuthenticated) {
    return null;
  }
  return (
    <div className="mt-8  max-w-xl mx-auto">
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

      <div className="flex items-center w-full flex-col md:flex-row  gap-3">
        <div className="flex  justify-center items-center flex-1">
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
              <p className="text-muted-foreground">@{user?.username}</p>
              <div className="flex items-center gap-3 group cursor-pointer">
                <div
                  className="text-gray-300 "
                  onClick={() => {
                    copyTextToClipboard(address);
                    setCopyClicked(true);
                    setTimeout(() => setCopyClicked(false), 2000);
                  }}
                >
                  {formatAddress(address)}
                </div>
                {copyClicked ? (
                  <Check size={"12px"} className="hidden group-hover:block" />
                ) : (
                  <Copy size={"12px"} className="hidden group-hover:block" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTimeEarned;
