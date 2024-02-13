import { fetchTickets } from "@/services/rest/dapfy-api/tickets";
import {
  ITicket,
  TicketStatus,
  TicketStatusType,
} from "@/types/tickets.interface";
import useSWR from "swr";

export const useGetTickets = (
  {
    status = TicketStatus.ACTIVE,
    replied,
    viewed,
  }: {
    status?: TicketStatusType;
    replied?: boolean;
    viewed?: boolean;
  },
  initialData?: ITicket[]
) => {
  const { data, error, isLoading, mutate } = useSWR(
    ["tickets", status, replied, viewed],
    async () => {
      return await fetchTickets({
        status: status,
        replied: replied,
        viewed: viewed,
      });
    },
    {
      revalidateOnFocus: true,
      fallbackData: initialData || [],
    }
  );

  return {
    tickets: data || [],
    error,
    isLoading,
    mutate,
  };
};
