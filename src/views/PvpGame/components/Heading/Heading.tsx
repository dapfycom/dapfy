import { PageHeaderHeading } from "@/components/PageHeader/PageHeader";
const Heading = () => {
  return (
    <div className="flex flex-col items-center text-center mt-5">
      <PageHeaderHeading className="mb-6">
        <span className={"gradienteTitle"}>Player Vs Player</span>
      </PageHeaderHeading>
    </div>
  );
};

export default Heading;
