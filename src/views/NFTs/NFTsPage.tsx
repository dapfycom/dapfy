import collectionImage from "@/assets/images/jeeter-collection.jpg";
import collectionImage2 from "@/assets/images/jeeter-collection2.jpg";
import collectionImage3 from "@/assets/images/jeeter-collection3.jpg";
import collectionImage4 from "@/assets/images/jeeter-collection4.jpg";
import collectionImage5 from "@/assets/images/jeeter-collection5.jpg";
import collectionImage6 from "@/assets/images/jeeter-collection6.jpg";
import collectionImage7 from "@/assets/images/jeeter-collection7.jpg";
import collectionImage8 from "@/assets/images/jeeter-collection8.jpg";
import collectionImage9 from "@/assets/images/jeeter-collection9.jpg";

import ImageSlider from "./components/ImageSlider/ImageSlider";
import MintButton from "./components/MintButton/MintButton";
import ProgressMint from "./components/Progress/ProgressMint";
import Title from "./components/Title/Title";

export const NFTsPage = () => {
  return (
    <div className="mt-8">
      <div key="1" className="flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full p-4 rounded-lg shadow-md">
          <Title />
          <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
            100 unique NFTs ready to JEET. Buy with $JEET token. NFT holders get
            revenue share from jeetdex.com.
          </p>
          <div className="flex justify-center mb-4">
            <ImageSlider
              images={[
                collectionImage,
                collectionImage2,
                collectionImage3,
                collectionImage4,
                collectionImage5,
                collectionImage6,
                collectionImage7,
                collectionImage8,
                collectionImage9,
              ]}
            />
          </div>

          <ProgressMint />
          <MintButton />
        </div>
      </div>
    </div>
  );
};
