import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/PageHeader/PageHeader";
import Container from "@/components/ui-system/Container";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { routeNames } from "@/config/routes";
import { ToolCard } from "./ToolCard";
export const tools: Tool[] = [
  {
    name: "Make your herotag",
    description: "An easy way to put your username on the blockchain",
    cover: "/images/hrotag-tool.jpg",
    link: routeNames.herotag,
  },
  {
    name: "Fees on Multiversx",
    description: "Discover how much have you pay in multiversx",
    cover: "/images/x-fees.jpg",
    link: routeNames.xfees,
  },
  {
    name: "Staking Rewards Overview",
    description: "View your staking rewards",
    cover: "/images/xstkRewards.jpg",
    link: routeNames.xstkRewards,
  },
];

export interface Tool {
  name: string;
  description: string;
  cover: string;
  link: string;
}
const ToolsView = () => {
  return (
    <Container>
      <div className="flex flex-col items-center text-center mt-5">
        <PageHeaderHeading className="mb-6">
          <span className={"gradienteTitle"}>Essential Free Tools</span>
        </PageHeaderHeading>
        <PageHeaderDescription className="mb-10">
          Elevate your experience with powerful, free Multiversx tools.
        </PageHeaderDescription>

        <div>
          <Separator className="my-4" />
          <div className="relative">
            <ScrollArea>
              <div className="flex flex-col sm:flex-row gap-4 pb-4">
                {tools.map((tool) => (
                  <ToolCard
                    link={tool.link}
                    key={tool.name}
                    tool={tool}
                    className="w-[250px]"
                    aspectRatio="portrait"
                    width={250}
                    height={330}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ToolsView;
