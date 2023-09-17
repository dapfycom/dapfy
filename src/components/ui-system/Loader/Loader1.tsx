import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface IProps {
  minHeight?: string;
  iconClassName?: string;
}
const Loader1 = ({ iconClassName, minHeight }: IProps) => {
  return (
    <div
      className="flex items-center justify-center"
      style={minHeight ? { minHeight } : {}}
    >
      <Loader2 className={cn("animate-spin", iconClassName)} />
    </div>
  );
};

export default Loader1;
