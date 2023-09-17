import { LpTokenImageV2 } from "@/components/LpTokenImage/LpTokenImage";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import { Loader2 } from "lucide-react";
import Image from "next/image";

interface IProps {
  tokenI?: string;
  src?: string;
  size: number;
}
const TokenImage = ({ tokenI, src, size }: IProps) => {
  const { elrondToken, isLoading } = useGetElrondToken(
    src ? null : (tokenI as string)
  );

  if (src) {
    return (
      <div className="flex">
        <Image src={src} width={size} height={size} alt="" />
      </div>
    );
  }

  return (
    <div className="flex">
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <div className="flex items-center">
          {elrondToken.name.slice(-2).toLocaleLowerCase() === "lp" ? (
            <LpTokenImageV2 lpToken={elrondToken} size={size} />
          ) : (
            <div className={`w-[${size}] h-[${size}] rounded-full`}>
              <Image
                width={size}
                height={size}
                src={elrondToken.assets.svgUrl}
                alt=""
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TokenImage;
