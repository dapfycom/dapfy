import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/PageHeader/PageHeader";
const DashboadHeading = () => {
  return (
    <>
      <PageHeaderHeading className="mb-6">
        Pay less, earn more
      </PageHeaderHeading>
      <PageHeaderDescription>
        We actively pay users to interact with the protocol. Tag 🏷️ = (We have
        the lowest fees around. PLUS: platform revenue goes back to you for
        every transaction you make using our protocol. Read our documentation to
        learn more).
      </PageHeaderDescription>
    </>
  );
};

export default DashboadHeading;
