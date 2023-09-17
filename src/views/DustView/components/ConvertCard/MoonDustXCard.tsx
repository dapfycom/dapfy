"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useGetMultipleElrondTokens from "@/hooks/useGetMultipleElrondTokens";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { formatTokenI } from "@/utils/functions/tokens";
import {
  selectToToken,
  selectToTokenDust,
} from "@/views/DustView/lib/dust-slice";
import { useGetAllowedOutputTokens } from "@/views/DustView/lib/hooks";
import Image from "next/image";
import ConvertButton from "./ConvertButton/ConvertButton";
import ConvertInfo from "./ConvertInfo/ConvertInfo";
import SelectAllTokens from "./SelectAllTokens/SelectAllTokens";
import SelectTokens from "./SelectTokens/SelectTokens";

const MoonDustXCard = () => {
  const dispatch = useAppDispatch();
  const selectedToToken = useAppSelector(selectToTokenDust);
  const { outputTokens: toTokensToConvert } = useGetAllowedOutputTokens();
  const { tokens } = useGetMultipleElrondTokens(toTokensToConvert);
  return (
    <Card className="text-left">
      <CardHeader>
        <div className="flex justify-between  items-center flex-col md:flex-row">
          <CardTitle>Convert into</CardTitle>
          <div className="flex justify-center md:justify-end flex-wrap gap-4">
            {toTokensToConvert.map((tokenI) => {
              const elrondToken = tokens?.find((t) => t.identifier === tokenI);
              return (
                <Button
                  key={tokenI}
                  onClick={() => dispatch(selectToToken(tokenI))}
                  variant={selectedToToken === tokenI ? "secondary" : "outline"}
                >
                  <div className="flex items-center gap-3">
                    {elrondToken?.assets?.svgUrl && (
                      <Image
                        src={elrondToken.assets.svgUrl}
                        alt=""
                        width={26}
                        height={26}
                      />
                    )}
                    {formatTokenI(tokenI)}
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex flex-col px-3">
          <SelectTokens />
          <div className="flex w-full mt-4">
            <SelectAllTokens />
          </div>
          <p className="mt-8 text-sm md:text-md mb-7">
            0% fees when converting into BSK 🥳️
          </p>
          <ConvertInfo />
        </div>
      </CardContent>
      <CardFooter>
        <ConvertButton />
      </CardFooter>
    </Card>
  );
};

export default MoonDustXCard;
