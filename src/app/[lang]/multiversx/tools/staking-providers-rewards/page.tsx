import StakingProviderRewardsView from "@/views/StakingProviderRewardsView/StakingProviderRewardsView";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Staking Provider Rewards",
};
export default function StakingProviderRewards() {
  return <StakingProviderRewardsView />;
}
