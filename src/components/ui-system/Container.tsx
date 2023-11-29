import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "w-full mx-auto px-10 xl:max-w-[1400px] container",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
