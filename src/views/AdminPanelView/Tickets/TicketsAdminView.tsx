import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { Mail } from "./common/mail";
import { accounts } from "./data";

async function TicketsAdminView() {
  const initialTickets = await prisma.ticket.findMany({
    where: {
      status: "active",
    },
    include: {
      user: {
        include: {
          xAccount: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;
  return (
    <div className="h-full px-4 py-6 lg:px-8 ">
      <Mail
        accounts={accounts}
        mails={initialTickets}
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
        navCollapsedSize={4}
      />
    </div>
  );
}
export default TicketsAdminView;
