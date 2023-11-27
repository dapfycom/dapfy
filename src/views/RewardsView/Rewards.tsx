"use client";
import Container from "@/components/ui-system/Container";
import DashboardHeading from "./common/DashboadHeading";
import { ContentTable } from "./common/HoldingsTable";
import RewardsCard from "./common/RewardsCard";
import XPaymentCard from "./common/XPaymentCard";
import { useBindXUserWithDapfyUser } from "./lib/hooks";
import LoginButton from "./common/LogginButton";
import Participants from "./common/Participants";
import AllTimeEarned from "./common/AllTimeEarned";
import CollectedEgld from "./common/CollectedEgld";
import EmailReports from "./common/EmailReports";

const Rewards = () => {
  useBindXUserWithDapfyUser();

  return (
    <Container className="mt-10 flex flex-col gap-10 max-w-[800px] text-center">
      <DashboardHeading />

      <LoginButton />

      <Participants />

      <AllTimeEarned />

      <CollectedEgld />

      <EmailReports />
    </Container>
  );
};

export default Rewards;
