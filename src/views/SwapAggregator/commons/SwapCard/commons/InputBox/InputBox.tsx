import { TokenImageSRC } from "@/components/TokenImage/TokenImage";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { selectedNetwork } from "@/config/network";
import useGetAccountToken from "@/hooks/useGetAccountToken";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import useGetMultipleElrondTokens from "@/hooks/useGetMultipleElrondTokens";
import { IElrondAccountToken, IElrondToken } from "@/types/elrond.interface";
import {
  formatBalance,
  formatBalanceDollar,
  setElrondBalance,
} from "@/utils/functions/formatBalance";
import { formatTokenI } from "@/utils/functions/tokens";
import { useGetSwapbleAggregatorTokens } from "@/views/SwapAggregator/lib/hooks";
import { ChevronDownIcon, Loader, Loader2Icon } from "lucide-react";
// const SelectTokenModal = lazy(() => import("../SelectTokenModal"));

interface IProps {
  selectedTokenI: string;
  value: string;
  onChange: (val: string, token?: IElrondToken) => void;
  onChangeToken: (t: IElrondToken) => void;
  isLoadingInput?: boolean;
  disabeledTokenSelection?: boolean;
  onMax?: (t: IElrondAccountToken) => void;
  clear?: () => void;
}

const InputBox = ({
  selectedTokenI,
  value,
  onChange,
  onChangeToken,
  isLoadingInput,
  disabeledTokenSelection,
  onMax,
  clear,
}: IProps) => {
  const { elrondToken, isLoading } = useGetElrondToken(selectedTokenI);
  const { accountToken } = useGetAccountToken(selectedTokenI);

  // select token
  const { ashTokens } = useGetSwapbleAggregatorTokens();
  const tokensToSwap = [
    selectedNetwork.tokensID.egld,
    ...ashTokens
      .map((t) => t.id)
      .filter((t) => t !== selectedNetwork.tokensID.bsk),
  ];
  const { tokens, isLoading: loadingTokens } =
    useGetMultipleElrondTokens(tokensToSwap);

  const readOnly = !Boolean(onMax);

  return (
    <>
      <div className="flex flex-col border w-full py-5 pb-4 px-5 rounded-lg">
        <div className="flex justify-between w-full">
          <Input
            type="text"
            className="border-none focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-xl"
            placeholder="0.0"
            onChange={(e) => onChange(e.target.value, elrondToken)}
            value={value}
            readOnly={readOnly}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`ml-auto gap-2 w-fit ${
                  disabeledTokenSelection ? "justify-center" : ""
                }`}
              >
                {isLoading ? (
                  <div className="flex px-2">
                    <Loader2Icon className="animate-spin w-4 h-4" />
                  </div>
                ) : (
                  <div
                    className={`flex items-center gap-2 ${
                      disabeledTokenSelection
                        ? "min-w-[70px] justify-center gap-3"
                        : ""
                    }`}
                  >
                    <div className="w-[23px]">
                      <TokenImageSRC
                        src={elrondToken?.assets?.svgUrl}
                        alt={elrondToken?.ticker}
                        size={23}
                      />
                    </div>
                    <p>{formatTokenI(elrondToken?.ticker)}</p>
                  </div>
                )}
                {!disabeledTokenSelection && (
                  <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </PopoverTrigger>
            {!disabeledTokenSelection && (
              <PopoverContent className="p-0" align="end">
                <Command>
                  <CommandInput placeholder="Select new role token" />
                  <CommandList>
                    <CommandEmpty>
                      {" "}
                      {loadingTokens ? (
                        <div className="flex justify-center w-full">
                          <Loader className="animate-spin" />
                        </div>
                      ) : (
                        "No tokens found."
                      )}{" "}
                    </CommandEmpty>
                    {loadingTokens ? null : (
                      <CommandGroup>
                        {tokens.map((t) => {
                          return (
                            <CommandItem key={t.identifier}>
                              <div
                                className="w-full h-full gap-3 cursor-pointer flex  items-start px-4 py-2"
                                onClick={() => onChangeToken(t)}
                              >
                                <TokenImageSRC
                                  size={20}
                                  src={t?.assets?.svgUrl}
                                  alt={t?.ticker}
                                />

                                <p>{formatTokenI(t?.ticker)}</p>
                              </div>
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            )}
          </Popover>
        </div>

        {accountToken && (
          <div className="flex justify-between mt-3 text-muted-foreground">
            <div className="px-[12px] -translate-y-3 text-sm">
              ≈ $
              {formatBalanceDollar(
                {
                  balance: setElrondBalance(value, elrondToken?.decimals),
                  decimals: elrondToken?.decimals,
                },
                elrondToken?.price
              )}
            </div>

            <div className="flex flex-col gap-1 sm:gap-3 items-center">
              {!readOnly && (
                <div className="flex gap-1 ">
                  {!!value && (
                    <Button
                      size={"xs"}
                      className="text-xs text-red-500"
                      variant={"outline"}
                      onClick={clear}
                    >
                      ABORT
                    </Button>
                  )}
                  <Button
                    size={"xs"}
                    className="text-xs"
                    variant={"outline"}
                    onClick={() =>
                      onMax && onMax(accountToken as IElrondAccountToken)
                    }
                  >
                    MAX
                  </Button>
                </div>
              )}
              <p className="text-sm">Balance: {formatBalance(accountToken)}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InputBox;
