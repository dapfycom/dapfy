import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import { logout } from "@multiversx/sdk-dapp/utils";

import { formatAddress } from "@/utils/functions/formatAddress";
import { useGetAccountInfo } from "@multiversx/sdk-dapp/hooks";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const DisconnectComponent = () => {
  const address = useAppSelector(selectUserAddress);
  const { account } = useGetAccountInfo();
  console.log("account", account);

  const handleDisconnect = () => {
    logout();
  };

  const avatarUrl = `https://id.maiar.com/users/photos/profile/${address}`;
  const avatarFallback = account?.username
    ? account.username.substring(0, 1)
    : "MX";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="hidden  md:flex">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[200px]">
        <DropdownMenuLabel>{formatAddress(address, 6, 4)}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleDisconnect}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Disconnet</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DisconnectComponent;
