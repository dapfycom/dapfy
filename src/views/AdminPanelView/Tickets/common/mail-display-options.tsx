import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useDisclosure from "@/hooks/useDisclosure";
import { ITicket } from "@/types/tickets.interface";
import { MoreVertical } from "lucide-react";
import dynamic from "next/dynamic";
const ShowUserInfoDialog = dynamic(
  () => import("./Dialogs/ShowUserInfoDialog")
);
const MailDisplayOptions = ({ ticket }: { ticket: ITicket | null }) => {
  const {
    isOpen: isOpenUserInfo,
    onClose: onCloseUserInfo,
    onOpen: onOpenUserInfo,
  } = useDisclosure();
  const onShowUserInfo = () => {
    onOpenUserInfo();
  };
  const onMarkAsUnread = () => {};
  const onAddLabel = () => {};
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" disabled={!ticket}>
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onShowUserInfo} className="cursor-pointer">
            Show User Info
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Mark as unread
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Add label
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isOpenUserInfo && ticket && (
        <ShowUserInfoDialog
          isOpen={isOpenUserInfo}
          onClose={onCloseUserInfo}
          ticket={ticket}
          onOpen={onOpenUserInfo}
        />
      )}
    </>
  );
};

export default MailDisplayOptions;
