import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/PageHeader/PageHeader";
import Container from "@/components/ui-system/Container";
import BuyCryptoDialog from "./common/BuyCryptoDialog/BuyCryptoDialog";
import "./upgrade.css";
const UpgradeView = () => {
  return (
    <Container className="min-h-[48vh]">
      <div className="flex flex-col items-center text-center mt-5">
        <PageHeaderHeading className="mb-6">
          Upgrade your plan in seconds
        </PageHeaderHeading>
        <PageHeaderDescription className="mb-10 text-3xl">
          How much you want to upgrade?
        </PageHeaderDescription>

        <BuyCryptoDialog />
      </div>
    </Container>
  );
};

export default UpgradeView;
