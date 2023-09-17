import { PageHeaderHeading } from "@/components/PageHeader/PageHeader";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const DustHeading = () => {
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {" "}
            <PageHeaderHeading className="mb-10">
              The Dust Converter
            </PageHeaderHeading>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Our Dust Converter offers the smallest fees you&apos;ll find
              anywhere, outdoing all competitors. 💸🔥
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default DustHeading;
