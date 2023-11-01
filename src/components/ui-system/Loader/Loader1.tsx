import { cn } from "@/lib/utils";
import { Loader, Loader2 } from "lucide-react";

interface IProps {
  minHeight?: string;
  iconClassName?: string;
  iconSize?: string;
}
const Loader1 = ({ iconClassName, minHeight, iconSize }: IProps) => {
  return (
    <div
      className="flex items-center justify-center"
      style={minHeight ? { minHeight } : {}}
    >
      <Loader2 size={iconSize} className={cn("animate-spin", iconClassName)} />
    </div>
  );
};

export default Loader1;

export const LoaderV2 = ({ iconClassName, minHeight, iconSize }: IProps) => {
  return (
    <div
      className="flex items-center justify-center"
      style={minHeight ? { minHeight } : {}}
    >
      <Loader size={iconSize} className={cn("animate-spin", iconClassName)} />
    </div>
  );
};
