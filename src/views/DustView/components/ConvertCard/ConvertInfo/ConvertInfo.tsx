import Loader1 from "@/components/ui-system/Loader/Loader1";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  formatBalance,
  formatBalanceDollar,
} from "@/utils/functions/formatBalance";
import { calculateSlipageAmount, formatTokenI } from "@/utils/functions/tokens";
import {
  selectConvertInfo,
  selectDustSlippage,
  selectToTokenDust,
  setSlipage,
} from "@/views/DustView/lib/dust-slice";
import { useGetAmountOut } from "@/views/DustView/lib/hooks";

const ConvertInfo = () => {
  const toTokenToConvert = useAppSelector(selectToTokenDust);
  const { elrondToken: token } = useGetElrondToken(toTokenToConvert);
  const selectedTokens = useAppSelector(selectConvertInfo);
  const { data, isLoading } = useGetAmountOut(selectedTokens);
  const slipage = useAppSelector(selectDustSlippage);

  const receiveAmount = calculateSlipageAmount(
    slipage,
    data?.amountOut || 0
  ).toString();
  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent>
        {isLoading ? (
          <Loader1 />
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between mb-3">
              <p>Minimum {formatTokenI(toTokenToConvert)} to receive</p>
              <div className="flex flex-col">
                <p>
                  {formatBalance({
                    balance: receiveAmount,
                    decimals: token?.decimals,
                  })}{" "}
                  {formatTokenI(toTokenToConvert)}
                </p>
                <p className="text-right text-muted-foreground text-sm">
                  ≈ $
                  {formatBalanceDollar(
                    {
                      balance: receiveAmount,
                      decimals: token?.decimals,
                    },
                    token?.ticker === "USDC" ? 1 : token?.price
                  )}
                </p>
              </div>
            </div>
            {/* <div className="flex justify-between mb-3">
              <p>Basic protocol fee:</p>
              <p>{formatTokenI(toTokenToConvert) === "BSK" ? "0%" : "3.5%"} </p>
            </div> */}

            {/* <div className="flex justify-between">
              <p>Slipage</p>
              <div className="flex gap-3">
                <SlipageBox percent={1} selected={slipage === 1} />
                <SlipageBox percent={2} selected={slipage === 2} />
                <SlipageBox percent={3} selected={slipage === 3} />
                <SlipageBox percent={5} selected={slipage === 5} />
              </div>
            </div> */}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConvertInfo;

interface SlipageBoxProps {
  percent: number;
  selected: boolean;
}
const SlipageBox = ({ percent, selected }: SlipageBoxProps) => {
  const selectedProps = {
    bg: "primary",
    color: "white",
  };
  const dispatch = useAppDispatch();
  const handleChangeSlipage = () => {
    dispatch(setSlipage(percent));
  };
  return (
    <Button
      className="flex justify-center items-center h-p[44px] w-p[44px] rounded-md text-sm md:text-sm  cursor-pointer"
      onClick={handleChangeSlipage}
      variant={selected ? "default" : "secondary"}
      size={"xs"}
    >
      {percent}%
    </Button>
  );
};
