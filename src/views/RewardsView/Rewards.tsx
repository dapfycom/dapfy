"use client";
import Container from "@/components/ui-system/Container";
import AllTimeEarned from "./common/AllTimeEarned";
import CollectedEgld from "./common/CollectedEgld";
import DashboardHeading from "./common/DashboadHeading";
import LoginButton from "./common/LogginButton";
import Participants from "./common/Participants";
import { useBindXUserWithDapfyUser } from "./lib/hooks";

const Rewards = () => {
  useBindXUserWithDapfyUser();

  return (
    <Container className="mt-10 flex flex-col gap-10 max-w-[800px] text-center justify-center">
      <DashboardHeading />

      <LoginButton />

      <Participants />

      <AllTimeEarned />

      <CollectedEgld />

      {/* <EmailReports /> */}
    </Container>
  );
};

export default Rewards;
