import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { IElrondAccountToken } from "@/types/elrond.interface";
import { formatBalanceDollar } from "@/utils/functions/formatBalance";
import { formatTokenI } from "@/utils/functions/tokens";
import { maxAllowedTokensCount } from "@/views/DustView/lib/contants";
import {
  selectConvertInfo,
  selectOutputToken,
} from "@/views/DustView/lib/dust-slice";
import Image from "next/image";

interface IProps {
  token: IElrondAccountToken;
  checked: boolean;
}
const RowToken = ({ token, checked }: IProps) => {
  const dispatch = useAppDispatch();
  const selectedTokens = useAppSelector(selectConvertInfo);

  const handleSelect = (isCheked: boolean) => {
    if (selectedTokens.length <= maxAllowedTokensCount) {
      dispatch(
        selectOutputToken({
          data: token,
          isCheked: isCheked,
        })
      );
    }
  };

  const disbleTokenSelection =
    selectedTokens.length >= maxAllowedTokensCount &&
    !Boolean(selectedTokens.find((t) => t.identifier === token.identifier));
  return (
    <div className="items-top flex space-x-2 items-center gap-2 cursor-pointer">
      <Checkbox
        id={token.identifier}
        onCheckedChange={(e) => handleSelect(e as boolean)}
        disabled={disbleTokenSelection}
        checked={checked}
        className="hidden"
      />
      <div className="grid gap-1.5 leading-none w-full cursor-pointer">
        <label
          htmlFor={token.identifier}
          className="w-full text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          <Button
            asChild
            variant={checked ? "secondary" : "outline"}
            className="h-[auto]"
          >
            <div className="flex flex-col gap-1">
              <div className="flex gap-3 items-center w-full">
                {token?.assets && (
                  <div className="rounded-full w-[28px] md:w-[28px] h-[28px] md:h-[28px]">
                    <Image
                      alt=""
                      src={token.assets.svgUrl}
                      width={28}
                      height={28}
                    />
                  </div>
                )}
                <p>{formatTokenI(token.identifier)}</p>
              </div>

              <div className="whitespace-nowrap flex text-muted-foreground text-sm">
                ≈ ${formatBalanceDollar(token, token?.price || 0)}
              </div>
            </div>
          </Button>
        </label>
      </div>
    </div>
  );
};

export default RowToken;
