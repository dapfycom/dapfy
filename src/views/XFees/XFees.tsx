"use client";
import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/PageHeader/PageHeader";
import Container from "@/components/ui-system/Container";
import useAuthentication from "@/hooks/useAuthentication";
import ConnectButton from "./common/ConnectButton/ConnectButton";
import FeesCard from "./common/FeesCard/FeesCard";

const XFeesView = () => {
  const { isLoggedIn } = useAuthentication();

  return (
    <Container>
      <div className="flex flex-col items-center mt-5">
        <PageHeaderHeading className="mb-6">
          <span className={"gradienteTitle text-center"}>xFees</span>
        </PageHeaderHeading>
        <PageHeaderDescription className="mb-10 text-center">
          Find out the fees you paid in EGLD while on the MultiversX. This total
          includes all transactions that have been sent.
        </PageHeaderDescription>
        <div className="min-h-[20vh] w-full">
          {isLoggedIn ? <FeesCard /> : <ConnectButton />}
        </div>
      </div>
    </Container>
  );
};

export default XFeesView;
