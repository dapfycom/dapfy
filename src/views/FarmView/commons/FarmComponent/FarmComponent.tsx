"use client";
import Collapse from "@/components/Collapse/Collapse";
import Divider from "@/components/Divider/Divider";
import { LpTokenImageV2 } from "@/components/LpTokenImage/LpTokenImage";
import { Card, CardContent } from "@/components/ui/card";
import { selectedNetwork } from "@/config/network";
import useDisclosure from "@/hooks/useDisclosure";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import useGetTokenPrice from "@/hooks/useGetTokenPrice";
import { formatBalanceDollar } from "@/utils/functions/formatBalance";
import { useGetFarmsInfo } from "@/views/FarmView/utils/hooks";
import Link from "next/link";
import FarmInfo from "./common/FarmInfo/FarmInfo";
import FarmMainButtons from "./common/FarmMainButtons/FarmMainButtons";
import StakedInfo from "./common/StakedInfo/StakedInfo";
const FarmComponent = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { elrondToken } = useGetElrondToken(selectedNetwork.tokensID.bskwegld);
  const { data: farmInfo } = useGetFarmsInfo();
  const [price] = useGetTokenPrice(selectedNetwork.tokensID.bskwegld);

  return (
    <>
      <Card className="w-full mt-10 px-4">
        <CardContent className="space-y-2 pt-6">
          <div
            className="flex justify-between items-center cursor-pointer flex-col sm:flex-row"
            onClick={onToggle}
          >
            <div className="flex items-center gap-4">
              <LpTokenImageV2 lpToken={elrondToken} size={40} />
              {farmInfo && (
                <div className="flex flex-col ">
                  <p className="whitespace-nowrap mb-2">BSK-EGLD</p>
                  <p className="text-[12px] text-muted-foreground">
                    $
                    {formatBalanceDollar(
                      { balance: farmInfo.stakedLp, decimals: 18 },
                      price,
                      true
                    )}
                  </p>
                </div>
              )}
            </div>
            <div className="flex items-center gap-7 flex-col sm:flex-row flex-1 justify-end">
              <FarmInfo />
              <FarmMainButtons isOpen={isOpen} />
            </div>
          </div>
        </CardContent>
        {isOpen && <Divider className="mb-4" />}

        <Collapse isOpen={isOpen}>
          <StakedInfo />
        </Collapse>
      </Card>
      

      {/* <p className="mt-20">
        Don&apos;t have any LP tokens? Buy LP{" "}
        <Link
          href={"https://xexchange.com/swap"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700"
        >
          here
        </Link>
      </p> */}
    </>
  );
};

export default FarmComponent;
