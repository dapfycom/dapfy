import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/PageHeader/PageHeader";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const DustHeading = () => {
  return (
    <div className="flex flex-col">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {" "}
            <PageHeaderHeading className="mb-6">
              The Dust Converter
            </PageHeaderHeading>
          </TooltipTrigger>
          <TooltipContent>
            <p>The smallest fees on MultiversX, guaranteed. 💸🔥</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <PageHeaderDescription className="mb-10">
        Convert tiny balances into EGLD, USDC, or get BSK for zero fees!
      </PageHeaderDescription>
    </div>
  );
};

export default DustHeading;
