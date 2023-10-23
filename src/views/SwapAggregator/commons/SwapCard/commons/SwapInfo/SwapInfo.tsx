import Collapse from "@/components/Collapse/Collapse";
import Divider from "@/components/Divider/Divider";
import { Button } from "@/components/ui/button";
import useDisclosure from "@/hooks/useDisclosure";
import { useAppSelector } from "@/hooks/useRedux";
import { formatNumber } from "@/utils/functions/formatBalance";
import { calculateSlipageAmount, formatTokenI } from "@/utils/functions/tokens";
import { useGetAggregate } from "@/views/SwapAggregator/lib/hooks";
import { selectSlippage } from "@/views/SwapAggregator/lib/swap-slice";
import { ArrowRight } from "lucide-react";

const SwapInfo = () => {
  const slippage = useAppSelector(selectSlippage);
  const { data } = useGetAggregate();
  const { isOpen, onToggle } = useDisclosure(false);
  if (!data) return null;
  return (
    <div className="border px-3 py-5 rounded">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-sm text-gray-400">
            {formatTokenI(data.tokenIn)}
          </span>
          <span className="text-lg">{data.swapAmount}</span>
        </div>
        {/* Icon arrow right */}
        <ArrowRight className="w-6 h-6 text-gray-400" />
        <div className="flex flex-col">
          <span className="text-sm text-gray-400">
            {formatTokenI(data.tokenOut)}
          </span>
          <span className="text-lg">≈ {formatNumber(data.returnAmount)}</span>
        </div>
      </div>
      <Divider className="my-3" />
      <div className="flex flex-col gap-2">
        <Collapse isOpen={isOpen}>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-gray-400">
                Min amount to receive
              </span>
              <span className="text-lg">
                {formatNumber(
                  calculateSlipageAmount(slippage, data.returnAmount).toString()
                )}{" "}
                {formatTokenI(data.tokenOut)}
              </span>
            </div>
          </div>
          {data?.effectivePriceReserved && (
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="text-sm text-gray-400">Price</span>
                <span className="text-lg">
                  {formatNumber(data.effectivePriceReserved)}
                </span>
              </div>
            </div>
          )}
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-gray-400">Market spot price</span>
              <span className="text-lg">{formatNumber(data.marketSp)}</span>
            </div>
          </div>
          {data.priceImpact && (
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="text-sm text-gray-400">Price Impact</span>
                <span className="text-lg">
                  {formatNumber(Number(data.priceImpact) * 100)} %
                </span>
              </div>
            </div>
          )}
        </Collapse>

        <div className="flex justify-center">
          <Button variant={"outline"} size={"xs"} onClick={onToggle}>
            {isOpen ? "Less" : "More"} info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SwapInfo;
