import MyTooltip from "@/components/ui-system/Tooltip/Tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { routeNames } from "@/config/routes";
import { ArrowLeftRight, Languages } from "lucide-react";
import Link from "next/link";

const Cards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">BSK holdings</CardTitle>

          <MyTooltip content="Get some BSK to interact with our dapp in our swap">
            <Button size={"icon"} variant={"outline"}>
              <Link href={routeNames.swap}>
                <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </Button>
          </MyTooltip>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">56.123.140 BSK</div>
          <p className="text-xs text-muted-foreground">≈ $48.00</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">EGLD holdings</CardTitle>
          <MyTooltip content="Wrap or unwrap your egld">
            <Button size={"icon"} variant={"outline"}>
              <svg
                width="300"
                height="300"
                viewBox="0 0 300 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-muted-foreground"
              >
                <rect
                  width="300"
                  height="300"
                  rx="150"
                  fill="none"
                  id="egld-token"
                ></rect>
                <path
                  d="M158.482 149.928L228.714 112.529L216.919 90L152.575 115.854C150.923 116.523 149.077 116.523 147.425 115.854L83.0814 90L71.25 112.602L141.482 150L71.25 187.398L83.0814 210L147.425 183.948C149.077 183.279 150.923 183.279 152.575 183.948L216.919 209.874L228.75 187.272L158.482 149.928Z"
                  fill="currentColor"
                ></path>
              </svg>
            </Button>
          </MyTooltip>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12.3 EGLD</div>
          <p className="text-xs text-muted-foreground">$223.00</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Language</CardTitle>
          <MyTooltip content="Set your favorite language">
            <Button size={"icon"} variant={"outline"}>
              <Languages className="h-4 w-4 text-muted-foreground" />
            </Button>
          </MyTooltip>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">EN</div>
          <p className="text-xs text-muted-foreground">
            Prefered dapp language
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Slippage</CardTitle>
          <MyTooltip content="Set your favorite language">
            <Button size={"icon"} variant={"outline"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </Button>
          </MyTooltip>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2%</div>
          <p className="text-xs text-muted-foreground">
            Default slippage used in the dapp
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cards;
