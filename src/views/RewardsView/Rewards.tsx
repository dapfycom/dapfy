"use client";
import Container from "@/components/ui-system/Container";
import AllTimeEarned from "./common/AllTimeEarned";
import CollectedEgld from "./common/CollectedEgld";
import DashboardHeading from "./common/DashboadHeading";
import LoginButton from "./common/LogginButton";
import NFTsStaking from "./common/NFTsStaking/NFTsStaking";
import Participants from "./common/Participants";
import StreakDays from "./common/StreakeDays";
import { useGetUserInfo } from "./lib/nfts-hooks";
import { useBindXUserWithDapfyUser, useStreakDialog } from "./lib/tasks-hooks";

const Rewards = () => {
  useBindXUserWithDapfyUser();
  useStreakDialog();

  const { rewardsTokens } = useGetUserInfo();

  return (
    <Container className="mt-10 flex flex-col gap-10 max-w-[800px] text-center justify-center">
      <DashboardHeading />

      <LoginButton />

      <Participants />

      <AllTimeEarned />

      <StreakDays />

      <CollectedEgld />
      {rewardsTokens.length > 0 && <NFTsStaking />}

      {/* <EmailReports /> */}
    </Container>
  );
};

export default Rewards;
