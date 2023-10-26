"use client";
import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/PageHeader/PageHeader";
import Container from "@/components/ui-system/Container";
import { Button } from "@/components/ui/button";
import useAuthentication from "@/hooks/useAuthentication";
import { cn } from "@/lib/utils";
const Home = () => {
  const { handleConnect } = useAuthentication();
  return (
    <Container className="min-h-[40vh]">
      <div className="text-center mt-10 mb-5 md:mb-20">
        <PageHeaderHeading className={cn("mb-10 md:text-7xl")}>
          <span className={"gradienteTitle"}>CONNECT. INVEST. EARN.</span>
        </PageHeaderHeading>
        <PageHeaderDescription className="mb-10">
          Dapfy is the platform for crypto users, providing the strategies and
          interface to effortlessly navigate the decentralized economy.
        </PageHeaderDescription>

        <Button className="font-bold" onClick={handleConnect}>
          Get up to 100% APY on your crypto in seconds
        </Button>
      </div>
    </Container>
  );
};

export default Home;
