"use client";
import { ENVIRONMENT, selectedNetwork } from "@/config/network";
import useGetAccountToken from "@/hooks/useGetAccountToken";
import useGetMaiarPairs from "@/hooks/useGetMaiarPairs";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  changeUserAmount,
  selectCoinFlipBetAmount,
  selectCoinFlipTokenStr,
} from "@/views/CoinFlipView/lib/con-flip-slice";
import BigNumber from "bignumber.js";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useGetTokenPrice from "@/hooks/useGetTokenPrice";
import { cn } from "@/lib/utils";
import {
  formatBalanceDollar,
  formatNumber,
} from "@/utils/functions/formatBalance";
import { formatTokenI } from "@/utils/functions/tokens";

//bet options
const betOptionsInEgld = [
  0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.7, 1, 2,
];

const ChooseBetSection = () => {
  const dispatch = useAppDispatch();
  const betAmount = useAppSelector(selectCoinFlipBetAmount);
  const selctedTokenStr = useAppSelector(selectCoinFlipTokenStr);
  const { pairs } = useGetMaiarPairs();
  const { accountToken } = useGetAccountToken(selctedTokenStr);
  const [tokenPrice] = useGetTokenPrice(selctedTokenStr);
  const rate = useMemo(() => {
    const pair = pairs.find(
      (p) =>
        (p.baseId === selctedTokenStr &&
          p.quoteId === selectedNetwork.tokensID.wegld) ||
        (p.quoteId === selctedTokenStr &&
          p.baseId === selectedNetwork.tokensID.wegld)
    );
    let rate = 0;
    if (pair) {
      if (selctedTokenStr === pair.baseId) {
        //wegld route

        rate = new BigNumber(pair.quotePrice).div(pair.basePrice).toNumber();
      } else {
        //usdc route

        rate = new BigNumber(pair.basePrice).div(pair.quotePrice).toNumber();
      }
      return rate;
    }
  }, [pairs, selctedTokenStr]);

  const handleChangeUserAmount = (amount: string) => {
    dispatch(changeUserAmount(amount));
  };

  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex flex-col gap-2">
        <Label>Choose amount</Label>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[250px] justify-between"
          >
            {betAmount
              ? `$
            ${formatBalanceDollar(
              {
                balance: betAmount,
                decimals: 0,
              },
              tokenPrice
            )}`
              : "Choose amount"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandGroup>
            {betOptionsInEgld.map((bet, i) => {
              const value = new BigNumber(bet)
                .multipliedBy(ENVIRONMENT === "mainnet" ? rate || 0 : 200000)
                .toFixed(2);
              return (
                <CommandItem
                  key={value}
                  value={value}
                  onSelect={(currentValue) => {
                    handleChangeUserAmount(
                      currentValue === betAmount ? "null" : currentValue
                    );

                    setOpen(false);
                  }}
                >
                  <div className="flex justify-between w-full pr-3">
                    <p>
                      ${" "}
                      {formatBalanceDollar(
                        {
                          balance: value,
                          decimals: 0,
                        },
                        tokenPrice
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatNumber(value)} {formatTokenI(selctedTokenStr)}
                    </p>
                  </div>
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      betAmount === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              );
            })}

            {/* {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                {framework.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))} */}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
    // <Card className="h-full">
    //   <CardHeader>
    //     <div className="flex flex-col sm:flex-row justify-between pt-3 mb-2">
    //       <p>1. Choose your bet</p>
    //       <div className="flex w-full sm:w-fit ">
    //         <p className="text-sm text-muted-foreground">
    //           Balance : {formatBalance(accountToken)}{" "}
    //           {formatTokenI(selctedTokenStr)}
    //         </p>
    //       </div>
    //     </div>
    //   </CardHeader>
    //   <CardContent>
    //     <div className="grid grid-cols-2 gap-4">
    //       {betOptionsInEgld.map((bet, i) => {
    //         const value = new BigNumber(bet)
    //           .multipliedBy(ENVIRONMENT === "mainnet" ? rate || 0 : 200000)
    //           .toFixed(2);
    //         return (
    //           <div
    //             style={{
    //               gridColumn:
    //                 i === betOptionsInEgld.length - 1
    //                   ? "span 2 / span 2"
    //                   : "span 1 / span 1",
    //             }}
    //             key={bet}
    //             className="flex flex-col justify-center items-center"
    //           >
    //             <div
    //               className={`w-full justify-center text-center items-center
    //               border py-3 rounded-md cursor-pointer hover:bg-secondary ${
    //                 amount === value ? "bg-secondary" : "bg-transparent"
    //               }`}
    //               key={bet}
    //               onClick={() => handleChangeUserAmount(value)}
    //             >
    //               {formatNumber(value)}
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </CardContent>
    // </Card>
  );
};

export default ChooseBetSection;
