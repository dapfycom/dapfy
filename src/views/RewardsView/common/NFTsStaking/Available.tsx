import Divider from "@/components/Divider/Divider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { getSmartContractInteraction } from "@/services/sc";
import { IElrondNFT } from "@/types/elrond.interface";
import Image from "next/image";
import { useState } from "react";
import { useGetUserSfts } from "../../lib/nfts-hooks";

const Available = () => {
  const { nfts } = useGetUserSfts();

  const handleStake = (collection: string, nonce: number, quantity: number) => {
    getSmartContractInteraction("mintingStakingNftWsp").ESDTSFTTransfer({
      functionName: "stake",
      token: {
        collection: collection,
        nonce: nonce,
      },
      quantity: quantity,
      gasL: 100_000_000,
    });
  };

  return (
    <div className="bg-[#3a393954] p-6 rounded-lg ">
      <h3 className="text-2xl font-bold mb-4">Available NFTs</h3>
      {nfts.length === 0 ? (
        <p className="text-sm mb-4">No available NFTs in your wallet</p>
      ) : (
        <p className="text-sm mb-4">
          Available:{" "}
          <span className="font-semibold">
            {nfts.reduce((acc, nft) => {
              return acc + Number(nft.balance);
            }, 0)}
          </span>
        </p>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full  ">STAKE NFT</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your NFTs</DialogTitle>
            <DialogDescription>
              <div className="flex-1">
                <div className="flex flex-wrap justify-center gap-5">
                  {nfts.map((nft) => (
                    <NftItem
                      key={nft.identifier}
                      nft={nft}
                      className="w-[120px]"
                      aspectRatio="square"
                      width={250}
                      height={250}
                      handleStake={handleStake}
                    />
                  ))}
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Available;

interface NftItemProps extends React.HTMLAttributes<HTMLDivElement> {
  nft: IElrondNFT;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
  handleStake: (collection: string, nonce: number, quantity: number) => void;
}
export const NftItem = ({
  nft,
  aspectRatio = "portrait",
  width,
  height,
  className,
  handleStake,
  ...props
}: NftItemProps) => {
  const [count, setcount] = useState<number>(1);
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className="overflow-hidden rounded-md">
        <Image
          src={
            nft.media
              ? nft.media[0].thumbnailUrl || "https://placehold.co/400"
              : "https://placehold.co/400"
          }
          alt={nft.name}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
          placeholder="blur"
          blurDataURL="https://placehold.co/400"
        />
      </div>

      <div className="space-y-1 text-sm">
        <div className="flex w-full justify-between mb-3">
          <h3 className="font-medium leading-none">{nft.name}</h3>
          {Number(nft.balance) > 1 && (
            <h3 className="font-medium leading-none text-blue-500">
              {nft.balance}
            </h3>
          )}
        </div>
        <Divider />
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 items-center">
            <div>{count}</div>
            <div className="flex gap-3">
              <Button
                variant={"outline"}
                size={"sm"}
                onClick={() =>
                  setcount((old) =>
                    old === Number(nft.balance) ? Number(nft.balance) : old + 1
                  )
                }
              >
                +
              </Button>
              <Button
                variant={"outline"}
                size={"sm"}
                onClick={() => setcount((old) => (old === 1 ? 1 : old - 1))}
              >
                -
              </Button>
            </div>
          </div>
          <Button
            variant={"outline"}
            size={"xs"}
            className="w-full"
            onClick={() => handleStake(nft.collection, nft.nonce, count)}
          >
            Stake
          </Button>
        </div>
      </div>
    </div>
  );
};
