import { NFTsPage } from "@/views/NFTs";

export function generateMetadata() {
  const title = "JEETER NFT";
  const description =
    "00 unique NFTs ready to JEET. Buy with $JEET token. NFT holders get revenue share from jeetdex.com.";
  const keywords = "nft, mint, jeet, jeeter, multiversx";

  return {
    title: title,
    description: description,
    keywords: keywords,
  };
}

const page = () => {
  return (
    <div>
      <NFTsPage />
    </div>
  );
};

export default page;
