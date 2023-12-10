import prisma from "@/lib/db";
import { DataTable } from "./NewsletterTable/DataTable";
import { Newsletter, columns } from "./NewsletterTable/columns";

async function getData(): Promise<Newsletter[]> {
  const newsletter = await prisma.newsletter.findMany();

  return newsletter;
}

const NewsletterAdmin = async () => {
  const data = await getData();
  return (
    <div className="h-full px-4 py-6 lg:px-8 ">
      <div className="border-none p-0 outline-none  h-full flex justify-center flex-col  w-full">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default NewsletterAdmin;
