export interface IBaseTicket {
  id: string;
  userId: string;
  responseEmail: string;
  message: string;
  viewed: boolean;
  replied: boolean;
  status: string;
  labels: string[];
  createdAt: Date;
  updatedAt: Date;
}
export interface ITicket extends IBaseTicket {
  user: {
    id: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
    xAccount: {
      id: string;
      xid: string;
      username: string;
      name: string;
      profile_image_url: string;
      updatedAt: Date;
    } | null;
  };
}

export const TicketStatus = {
  ACTIVE: "active",
  CLOSED: "closed",
  REPLIED: "replied",
};

export type TicketStatusType = (typeof TicketStatus)[keyof typeof TicketStatus];
