import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/PageHeader/PageHeader";
import Container from "@/components/ui-system/Container";
import SelectWinners from "./common/SelectWinners/SelectWinners";

const RaffleView = () => {
  return (
    <Container>
      <div className="flex flex-col items-center mt-5">
        <PageHeaderHeading className="mb-6">
          <span className={"gradienteTitle text-center"}>Raffle Draw</span>
        </PageHeaderHeading>
        <PageHeaderDescription className="mb-10 text-center">
          Simply input a list of wallets, set the number of winners, and let our
          system randomly select the lucky ones.
        </PageHeaderDescription>
      </div>

      <SelectWinners />
    </Container>
  );
};

export default RaffleView;
