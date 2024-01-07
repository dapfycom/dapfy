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
    <div className="flex flex-col text-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {" "}
            <PageHeaderHeading className="mb-6">
              <span className={"gradienteTitle"}>The Dust Converter</span>
            </PageHeaderHeading>
          </TooltipTrigger>
          <TooltipContent>
            <p>The smallest fees on MultiversX, guaranteed. 💸🔥</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <PageHeaderDescription className="mb-10">
        Convert tiny balances into EGLD, PADAWAN, or get BSK for zero fees!
      </PageHeaderDescription>
    </div>
  );
};

export default DustHeading;
