import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PropsWithChildren, ReactNode } from "react";

interface IProps {
  content: ReactNode;
}

const MyTooltip = ({ children, content }: PropsWithChildren<IProps>) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger> {children}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MyTooltip;
