import useGetMultipleElrondTokens from "@/hooks/useGetMultipleElrondTokens";
import { IElrondToken } from "@/types/elrond.interface";
import { pairs } from "@/utils/constants/lpPairs";
import Image from "next/image";

interface IProps {
  lpToken: IElrondToken;
}

const LpTokenImage = ({ lpToken }: IProps) => {
  const lpData = pairs.find((pair) => pair.lpidentifier === lpToken.identifier);

  const { tokens } = useGetMultipleElrondTokens(
    lpData ? [lpData.token1lp, lpData.token2lp] : []
  );

  if (!tokens || tokens.length === 0) return null;

  return (
    <div className="flex">
      <Image src={tokens[0].assets.svgUrl} alt="" width={28} height={28} />
      <Image src={tokens[1].assets.svgUrl} alt="" width={28} height={28} />
    </div>
  );
};

export default LpTokenImage;

interface ILpTokenImageV2Props {
  lpToken: IElrondToken;
  size: number;
}
export const LpTokenImageV2 = ({ lpToken, size }: ILpTokenImageV2Props) => {
  const lpData = pairs.find((pair) => pair.lpidentifier === lpToken.identifier);

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
