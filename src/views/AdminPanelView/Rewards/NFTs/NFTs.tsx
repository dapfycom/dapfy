import AutoStake from "./Actions/AutoStake";
import IssueSft from "./Actions/IssueSft";
import MintSft from "./Actions/MintSft";
import SetScRole from "./Actions/SetScRole";
import SetTokensRewards from "./Actions/SetTokensRewards";
import Supply from "./Actions/Supply";

const NFTs = () => {
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 gap-5 md:grid-cols-2 grid-cols-1">
      <IssueSft />
      <SetScRole />
      <MintSft />
      <SetTokensRewards />
      <AutoStake />
      <Supply />
    </div>
  );
};

export default NFTs;
