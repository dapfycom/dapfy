import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/PageHeader/PageHeader";
import Container from "@/components/ui-system/Container";
import BuyCryptoDialog from "./common/BuyCryptoDialog/BuyCryptoDialog";
import "./upgrade.css";
const UpgradeView = () => {
  // sendTokens({
  //   receiver: "erd1ag6nvusjhcw90ntutyzsn7gntmgx9rv8xz2qczgquy48ltaxqghqxs0rkl",
  //   amount: 100,
  //   token: "BSK-207198",
  // });

  return (
    <Container className="min-h-[48vh]">
      <div className="flex flex-col items-center text-center mt-5">
        <PageHeaderHeading className="mb-6">
          Upgrade your plan in seconds
        </PageHeaderHeading>
        <PageHeaderDescription className="mb-10">
          How much you want?
        </PageHeaderDescription>

        <BuyCryptoDialog />
      </div>
    </Container>
  );
};

export default UpgradeView;
