import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/PageHeader/PageHeader";
import Container from "@/components/ui-system/Container";
import { Button } from "@/components/ui/button";
import useAuthentication from "@/hooks/useAuthentication";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

import { routeNames } from "@/config/routes";
const Home = () => {
  return (
    <Container className="min-h-[40vh]">
      <div className=" flex flex-col text-center mt-10 mb-5 md:mb-20">
        <PageHeaderHeading className={cn("mb-10 md:text-7xl")}>
          <span className={"gradienteTitle"}>CONNECT. INVEST. EARN.</span>
        </PageHeaderHeading>
        <div className="text-center">
          <PageHeaderDescription className="mb-10 text-center">
            Welcome to Dapfy, the platform that pays users for their
            interactions.
          </PageHeaderDescription>
        </div>
        <div className="text-left w-fit  m-auto">
          <h3 className="mb-3 text-xl">
            Here’s how you can start earning today:
          </h3>
          <ul className="flex flex-col gap-1">
            <li>✅ Connect your X account</li>
            <li>✅ Like, comment, retweet our posts</li>

            <li>✅ Use at least one of our DeFi tools</li>

            <li>🎉 Receive daily rewards</li>
          </ul>
        </div>

        <div className="mt-10 flex justify-center">
          <Button className="flex gap-2 rounded-full px-7 w-fit" asChild>
            <Link href={routeNames.rewards}>
              {" "}
              <Image
                src={"/images/logo-black.png"}
                alt=""
                width={20}
                height={20}
                className="hidden dark:block"
              />{" "}
              <Image
                src={"/images/logo-white.png"}
                alt=""
                width={20}
                height={20}
                className="block dark:hidden"
              />{" "}
              Get started
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Home;
