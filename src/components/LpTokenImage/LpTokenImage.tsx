import useGetMultipleElrondTokens from "@/hooks/useGetMultipleElrondTokens";
import { IElrondToken } from "@/types/elrond.interface";
import { pairs } from "@/utils/constants/lpPairs";
import Image from "next/image";

interface IProps {
  lpToken?: IElrondToken;

  token1lp?: string;
  token2lp?: string;
}

const LpTokenImage = ({ lpToken, token1lp, token2lp }: IProps) => {
  const lpData = lpToken
    ? pairs.find((pair) => pair.lpidentifier === lpToken.identifier)
    : {
        token1lp: token1lp!,
        token2lp: token2lp!,
      };

  const { tokens } = useGetMultipleElrondTokens(
    lpData ? [lpData.token1lp, lpData.token2lp] : []
  );

  if (!lpToken) {
    console.log({ tokens, lpData });
  }

  if (!tokens || tokens.length === 0) return null;

  return (
    <div className="flex">
      {tokens[0]?.assets?.svgUrl && (
        <Image src={tokens[0].assets.svgUrl} alt="" width={28} height={28} />
      )}

      {tokens[1]?.assets?.svgUrl && (
        <Image src={tokens[1].assets.svgUrl} alt="" width={28} height={28} />
      )}
    </div>
  );
};

export default LpTokenImage;

interface ILpTokenImageV2Props {
  lpToken?: { identifier: string };
  size: number;
}
export const LpTokenImageV2 = ({ lpToken, size }: ILpTokenImageV2Props) => {
  const lpData = pairs.find(
    (pair) => pair.lpidentifier === lpToken?.identifier
  );

  const { tokens } = useGetMultipleElrondTokens(
    lpData ? [lpData.token1lp, lpData.token2lp] : []
  );

  if (!tokens || tokens.length === 0) return null;

  return (
    <div className={`flex flex-col w-[${size * 1.7}px]`}>
      <div className="flex">
        <Image
          src={tokens[1].assets.svgUrl}
          alt=""
          width={size}
          height={size}
          className={`w-[${size}px] h-[${size}px]}]`}
        />
      </div>
      <div className="w-full justify-end translate-y-[-10px]">
        <Image
          src={tokens[0].assets.svgUrl}
          alt=""
          width={size}
          height={size}
          className={`w-[${size}px] h-[${size}px]}]`}
        />
      </div>
    </div>
  );
};
