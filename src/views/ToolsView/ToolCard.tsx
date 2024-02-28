import Image from "next/image";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Tool } from ".";

interface ToolCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tool: Tool;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
  link: string;
}

export function ToolCard({
  tool,
  aspectRatio = "portrait",
  width,
  height,
  link,
  className,
  ...props
}: ToolCardProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <Link href={link}>
        <div className="overflow-hidden rounded-md">
          <Image
            src={tool.cover}
            alt={tool.name}
            width={width}
            height={height}
            unoptimized={true}
            className={cn(
              "h-auto w-auto object-cover transition-all hover:scale-105",
              aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
            )}
          />
        </div>

        <div className="space-y-1 text-sm mt-2">
          <h3 className="font-medium leading-none">{tool.name}</h3>
          <p className="text-xs text-muted-foreground">{tool.description}</p>
        </div>
      </Link>
    </div>
  );
}
