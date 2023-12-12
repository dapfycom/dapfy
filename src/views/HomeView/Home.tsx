import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/PageHeader/PageHeader";
import Container from "@/components/ui-system/Container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import { routeNames } from "@/config/routes";
const Home = () => {
  return (
    <Container className="min-h-[40vh]">
      <div className=" flex flex-col text-center mt-10 mb-5 md:mb-20">
        <PageHeaderHeading className={cn("mb-10 md:text-6xl")}>
          <span className={""}>CONNECT. INVEST. EARN.</span>
        </PageHeaderHeading>
        <div className="text-center">
          <PageHeaderDescription className="mb-20 text-center">
            The easy-to-use interface for swapping, farming, playing and earning
            rewards.
          </PageHeaderDescription>
        </div>
        <div className="w-fit  m-auto text-center">
          <ul className="flex flex-col gap-16">
            <li className="flex flex-col gap-2">
              <span className="text-2xl text-muted-foreground">
                Connect your wallet
              </span>
              <Image
                alt=""
                src={"/gifs/connect-wallet.gif"}
                width={800}
                height={100}
                className="overflow-hidden rounded"
              />
            </li>
            <li className="flex flex-col gap-2">
              <span className="text-2xl text-muted-foreground">
                Connect your X account
              </span>
              <Image
                alt=""
                src={"/gifs/connect-X-account.gif"}
                width={800}
                height={100}
                className="overflow-hidden rounded"
              />
            </li>
            <li className="flex flex-col gap-2">
              <span className="text-2xl text-muted-foreground">
                Like, comment, retweet our posts
              </span>
              <Image
                alt=""
                src={"/gifs/like-comment-retweet.gif"}
                width={800}
                height={100}
                className="overflow-hidden rounded"
              />
            </li>

            <li className="flex flex-col gap-2">
              <span className="text-2xl text-muted-foreground">
                Use at least one of our DeFi tools
              </span>
              <Image
                alt=""
                src={"/gifs/use-tools.gif"}
                width={800}
                height={100}
                className="overflow-hidden rounded"
              />
            </li>
          </ul>
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            className="flex gap-3 rounded-full px-7 w-fit text-xl h-fit"
            asChild
          >
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
              Start Earning Now
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Home;
