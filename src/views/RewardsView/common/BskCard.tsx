import MyTooltip from "@/components/ui-system/Tooltip/Tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { selectedNetwork } from "@/config/network";
import { routeNames } from "@/config/routes";
import useGetAccountToken from "@/hooks/useGetAccountToken";
import {
  formatBalance,
  formatBalanceDollar,
} from "@/utils/functions/formatBalance";
import { ArrowLeftRight } from "lucide-react";
import Link from "next/link";
const BskCard = () => {
  const { accountToken } = useGetAccountToken(selectedNetwork.tokensID.bsk);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">BSK holdings</CardTitle>

        <MyTooltip content="Get some BSK to interact with our dapp in our swap">
          <Button size={"icon"} variant={"outline"}>
            <Link href={routeNames.aggregator}>
              <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </Button>
        </MyTooltip>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {formatBalance(accountToken)} BSK
        </div>
        <p className="text-xs text-muted-foreground">
          ≈ ${formatBalanceDollar(accountToken, accountToken?.price || 0)}
        </p>
      </CardContent>
    </Card>
  );
};

export default BskCard;
