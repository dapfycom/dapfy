"use client";
import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/PageHeader/PageHeader";
import Container from "@/components/ui-system/Container";
import { Button } from "@/components/ui/button";
import useAuthentication from "@/hooks/useAuthentication";
import { cn } from "@/lib/utils";
import styles from "./Home.module.css";
const Home = () => {
  const { handleConnect } = useAuthentication();
  return (
    <Container>
      <div className="text-center mt-10 my-20">
        <PageHeaderHeading className={cn("mb-10 md:text-7xl")}>
          xBeskar <br /> Shaping the Future of{" "}
          <span className={styles.gradienteTitle}> Crypto Rewards</span>
        </PageHeaderHeading>
        <PageHeaderDescription className="mb-10">
          Discover a DeFi Revolution: Earn Rewards While You Explore the
          Multiverse of Crypto Opportunities with xBeskar. Join us and dive into
          the world of Multiversx, NFTs, DApps, and much more.
        </PageHeaderDescription>

        <Button className="font-bold" onClick={handleConnect}>
          Connect wallet to start earning
        </Button>
      </div>
    </Container>
  );
};

export default Home;
