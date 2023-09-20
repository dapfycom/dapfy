"use client";
import Pagination from "@/components/ui-system/Pagination/Pagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useGetUserNfts from "@/hooks/useGetUserNfts";
import { cn } from "@/lib/utils";
import { IElrondNFT } from "@/types/elrond.interface";
import { filterNftsWithMedia } from "@/utils/functions/nfts";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
const listenNowAlbums: any[] = [
  {
    name: "React Rendezvous",
    artist: "Ethan Byte",
    cover:
      "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80",
  },
  {
    name: "Async Awakenings",
    artist: "Nina Netcode",
    cover:
      "https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80",
  },
  {
    name: "The Art of Reusability",
    artist: "Lena Logic",
    cover:
      "https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=300&dpr=2&q=80",
  },
  {
    name: "Stateful Symphony",
    artist: "Beth Binary",
    cover:
      "https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80",
  },
];
const ShowcaseNFTs = () => {
  const { nfts } = useGetUserNfts();

  const nftsList = filterNftsWithMedia(nfts);
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Your NFTs</CardTitle>
        <CardDescription>Managing Your NFT Portfolio</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {nftsList.length === 0 && (
          <div className="flex flex-col items-center justify-center space-y-3">
            <p className="text-lg text-muted-foreground my-8">
              You don&apos;t have any NFTs yet.
            </p>
          </div>
        )}

        <Pagination
          //core
          nextLabel={<ChevronRightIcon />}
          pageRangeDisplayed={2}
          previousLabel={<ChevronLeftIcon />}
          containerClassName="flex justify-center items-center space-x-2  mt-6"
          activeLinkClassName="bg-primary-foreground text-primary-background"
          pageLinkClassName="w-8 h-8 flex justify-center items-center rounded-md  hover:bg-primary-foreground hover:text-primary-background"
          //items
          items={nftsList}
          itemsPerPage={9}
          Items={({ currentItems }) => (
            <div className="flex-1">
              <div className="grid grid-cols-3 gap-x-4 gap-y-8 h-fit">
                {currentItems.map((nft) => (
                  <AlbumArtwork
                    key={nft.identifier}
                    nft={nft}
                    className="w-full"
                    aspectRatio="square"
                    width={250}
                    height={250}
                  />
                ))}
              </div>
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default ShowcaseNFTs;

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  nft: IElrondNFT;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}
const AlbumArtwork = ({
  nft,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: AlbumArtworkProps) => {
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
        />
      </div>

      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{nft.name}</h3>
        <p className="text-xs text-muted-foreground">{nft.collection}</p>
      </div>
    </div>
  );
};
