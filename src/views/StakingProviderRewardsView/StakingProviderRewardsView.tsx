"use client";
import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/PageHeader/PageHeader";
import Container from "@/components/ui-system/Container";
import useAuthentication from "@/hooks/useAuthentication";
import ConnectButton from "./common/ConnectButton/ConnectButton";
import RewardsCard from "./common/RewardsCard/RewardsCard";

const StakingProviderRewardsView = () => {
  const { isLoggedIn } = useAuthentication();

  return (
    <Container>
      <div className="flex flex-col items-center text-center mt-5">
        <PageHeaderHeading className="mb-6">
          <span className={"gradienteTitle"}>
            MultiversX Staking Rewards Tracker
          </span>
        </PageHeaderHeading>
        <PageHeaderDescription className="mb-10">
          Track total staking rewards received from providers on MultiversX
          blockchain.
        </PageHeaderDescription>
        <div className="min-h-[20vh] w-full">
          {isLoggedIn ? <RewardsCard /> : <ConnectButton />}
        </div>
      </div>
    </Container>
  );
};

export default StakingProviderRewardsView;
