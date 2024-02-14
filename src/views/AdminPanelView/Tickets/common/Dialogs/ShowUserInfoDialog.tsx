import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { addressIsValid } from "@/lib/utils";
import { ITicket } from "@/types/tickets.interface";
import { formatAddress } from "@/utils/functions/formatAddress";
import { copyTextToClipboard } from "@/utils/functions/general";
import toast from "react-hot-toast";

interface IShowDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  ticket: ITicket;
}

const ShowUserInfoDialog = ({
  isOpen,
  onClose,
  onOpen,
  ticket,
}: IShowDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(openStatus) => (openStatus ? onOpen() : onClose())}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Info about {ticket.responseEmail}</DialogTitle>
          <DialogDescription className="mt-4">
            {ticket.user.xAccount?.profile_image_url && (
              <Avatar className="hidden  md:flex uppercase">
                <AvatarImage src={ticket.user.xAccount?.profile_image_url} />
                <AvatarFallback>{ticket.user.xAccount?.name}</AvatarFallback>
              </Avatar>
            )}
            <InfoItem label="User ID" value={ticket.user.id} />
            <InfoItem label="User address" value={ticket.user.address} />
            <InfoItem
              label="X account name"
              value={ticket.user.xAccount?.name}
            />
            <InfoItem
              label="X account username"
              value={ticket.user.xAccount?.username}
            />
            <InfoItem label="X account xid" value={ticket.user.xAccount?.xid} />
            <InfoItem
              label="X account profile image url"
              value={ticket.user.xAccount?.profile_image_url}
            />
            <InfoItem
              label="Dapfy XAccount Id"
              value={ticket.user.xAccount?.id}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ShowUserInfoDialog;

const InfoItem = ({ value, label }: { value?: string; label: string }) => {
  const handleCopy = () => {
    copyTextToClipboard(value || "");
    toast("Copied to clipboard");
  };
  return (
    <p onClick={handleCopy} className="my-1 cursor-pointer">
      {label} :{" "}
      <span className="text-primary">
        {addressIsValid(value || "") ? formatAddress(value || "") : value || ""}
      </span>
    </p>
  );
};
