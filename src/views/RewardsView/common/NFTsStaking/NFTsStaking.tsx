import Available from "./Available";
import Info from "./Info";
import Unstake from "./Unstake";

const NFTsStaking = () => {
  return (
    <div>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Info />
          <div className="grid grid-rows-2 gap-6">
            <Unstake />
            <Available />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTsStaking;
