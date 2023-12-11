import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/PageHeader/PageHeader";
import Container from "@/components/ui-system/Container";
import ChooseBetSection from "./common/ChooseBetSection/ChooseBetSection";
import Coin from "./common/GameSection/common/Coin";
import GameActions from "./common/GameSection/common/GameActions";
import StatsSection from "./common/StatsSection/StatsSection";
import TableSection from "./common/TableSection/TableSection";

const CoinFlipView = () => {
  return (
    <>
      <Container>
        <div className="flex flex-col items-center text-center mt-5 mb-10">
          <PageHeaderHeading className="mb-5">
            <span className={"gradienteTitle"}>The Coin Flip Game</span>
          </PageHeaderHeading>

          <PageHeaderDescription>
            50-50 odds, 100% on chain transparency
          </PageHeaderDescription>
        </div>
        <div className="grid grid-cols-1 gap-x-[20px] gap-y-[40px] w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-10">
            <div className="flex flex-col gap-10 w-full">
              <Coin />

              <div className="hidden md:block h-full">
                <GameActions />
              </div>

              <div className="block md:hidden ">
                <ChooseBetSection />
              </div>
            </div>

            <div>
              <div className="block md:hidden">
                <GameActions />
              </div>
              <div className="hidden md:block h-full">
                <ChooseBetSection />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-0 md:gap-x-10">
            <div className="w-full">
              <StatsSection />
            </div>
            <div className="overflow-auto grid col-span-2">
              {<TableSection />}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CoinFlipView;
