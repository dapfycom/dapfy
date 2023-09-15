import LpTokenImage from "@/components/LpTokenImage/LpTokenImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetAccountToken from "@/hooks/useGetAccountToken";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import useGetTokenPrice from "@/hooks/useGetTokenPrice";
import { IElrondToken } from "@/types/elrond.interface";
import { formatBalance } from "@/utils/functions/formatBalance";
import { formatTokenI } from "@/utils/functions/tokens";
import { Loader2 } from "lucide-react";
import Image from "next/image";
// const SelectTokenModal = lazy(() => import("../SelectTokenModal"));

interface IProps {
  type: "from" | "to";
  tokenI: string;
  handleChange: (value: string, token: IElrondToken) => void;
  inputValue: string;
}

const InputBox = ({ type, tokenI, inputValue, handleChange }: IProps) => {
  const { elrondToken } = useGetElrondToken(tokenI);
  const { accountToken } = useGetAccountToken(tokenI);
  const [tokenPrice] = useGetTokenPrice(tokenI);

  const handleMax = () => {
    if (type === "to") return;
    handleChange(formatBalance(accountToken, true, 18) as any, elrondToken);
  };

  return (
    <>
      <div className="flex flex-col border w-full py-5 pb-4 px-5 rounded-lg">
        <div className="flex justify-between mb-3">
          <div className="flex items-center gap-2">
            {elrondToken ? (
              <>
                {formatTokenI(elrondToken.name).slice(-2) === "LP" ? (
                  <LpTokenImage lpToken={elrondToken} />
                ) : (
                  <Image
                    src={elrondToken.assets.svgUrl}
                    alt="token logo"
                    width={32}
                    height={32}
                  />
                )}
                <p className="text-md">{elrondToken.ticker}</p>
              </>
            ) : (
              <Loader2 className="animate-spin" />
            )}
          </div>
          <div className="flex justify-end mt-3">
            <p className="text-sm text-muted-foreground">
              Balance: {formatBalance(accountToken)}
            </p>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <div className="flex justify-between w-full">
            <Input
              type="text"
              className="border-none focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
              placeholder="0.0"
              value={inputValue}
              onChange={(e) => handleChange(e.target.value, elrondToken)}
              readOnly={type === "to"}
            />
          </div>
          {type === "from" && (
            <Button variant={"outline"} onClick={handleMax} size={"sm"}>
              Max
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputBox;
