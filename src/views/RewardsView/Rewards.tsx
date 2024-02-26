"use client";
import Container from "@/components/ui-system/Container";
import AllTimeEarned from "./common/AllTimeEarned";
import CollectedEgld from "./common/CollectedEgld";
import DashboardHeading from "./common/DashboadHeading";
import LoginButton from "./common/LogginButton";
import Participants from "./common/Participants";
import StreakDays from "./common/StreakeDays";
import { useBindXUserWithDapfyUser, useStreakDialog } from "./lib/hooks";

const Rewards = () => {
  useBindXUserWithDapfyUser();
  useStreakDialog();
  return (
    <Container className="mt-10 flex flex-col gap-10 max-w-[800px] text-center justify-center">
      <DashboardHeading />

      <LoginButton />

      <Participants />

      <AllTimeEarned />

      <StreakDays />

      <CollectedEgld />

      {/* <EmailReports /> */}
    </Container>
  );
};

export default Rewards;
