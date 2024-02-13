import {
  IBaseTicket,
  ITicket,
  TicketStatusType,
} from "@/types/tickets.interface";
import axiosDapfy from ".";

export const addTicket = async ({
  email,
  msg,
  address,
}: {
  email: string;
  msg: string;
  address: string;
}) => {
  const res = await axiosDapfy.post("/help/new-ticket", {
    email,
    message: msg,
    address,
  });

  return res.data;
};

export const updateTicket = async (
  id: string,
  updateInfo: Partial<IBaseTicket>
) => {
  const res = await axiosDapfy.put(`/help/update-ticket/${id}`, updateInfo);

  return res.data;
};

export const fetchTickets = async (params: {
  status: TicketStatusType;
  viewed?: boolean;
  replied?: boolean;
}): Promise<ITicket[]> => {
  const res = await axiosDapfy.get<{ message: string; tickets: ITicket[] }>(
    "/help/tickets",
    { params: params }
  );
  return res.data.tickets;
};
