import { TicketStatus } from "@/types/tickets.interface";
import { mutate } from "swr";

export const refreshTickets = () => {
  mutate(["tickets", TicketStatus.ACTIVE, false, undefined]);
};
