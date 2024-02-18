"use client";
import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/PageHeader/PageHeader";
import Container from "@/components/ui-system/Container";
import RewardsCard from "./common/RewardsCard/RewardsCard";

const StakingProviderRewardsView = () => {
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

        <RewardsCard />
      </div>
    </Container>
  );
};

export default StakingProviderRewardsView;
