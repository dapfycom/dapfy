import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { ComponentProps } from "react";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/hooks/useRedux";
import { cn } from "@/lib/utils";
import { ITicket } from "@/types/tickets.interface";
import { formatAddress } from "@/utils/functions/formatAddress";
import { useDispatch } from "react-redux";
import {
  selectSelectedTicketId,
  setSelectedTicketId,
} from "../adminTicketsSlice";

interface MailListProps {
  items: ITicket[];
}

export const mail = {
  selected: "110e8400-e29b-11d4-a716-446655440000",
};

export function MailList({ items }: MailListProps) {
  const dispatch = useDispatch();
  const ticketSelected = useAppSelector(selectSelectedTicketId);

  return (
    <ScrollArea className="min-h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              mail.selected === item.id && "bg-muted",
              ticketSelected === item.id && "bg-accent"
            )}
            onClick={() => dispatch(setSelectedTicketId(item.id))}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.responseEmail}</div>
                  {!item.viewed && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    mail.selected === item.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {formatDistanceToNow(new Date(item.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-xs font-medium">
                {formatAddress(item.user.address)}
              </div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {item.message.substring(0, 300)}
            </div>
            {item.labels.length ? (
              <div className="flex items-center gap-2">
                {item.labels.map((label) => (
                  <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "secondary";
}
