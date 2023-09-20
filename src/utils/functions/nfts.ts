import { IElrondNFT } from "@/types/elrond.interface";

export const noShowMedia = (nft: {
  media?: any[];
  collection: string;
}): boolean => {
  if (
    !nft.media ||
    nft.media[0]?.url ===
      "https://media.elrond.com/nfts/thumbnail/default.png" ||
    nft.media[0]?.fileType !== "image/png" ||
    nft.collection === "ELBADGES-2efe5c"
  ) {
    return true;
  }
  return false;
};

export const filterNftsWithMedia = (nfts: IElrondNFT[]) => {
  const newNfts = nfts.filter((nft) => !noShowMedia(nft));

  return newNfts;
};
