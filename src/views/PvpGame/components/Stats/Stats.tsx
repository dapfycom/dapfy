import { formatBalance } from "@/utils/functions/formatBalance";
import { useStatsGAmes } from "../../utils/hooks";

const Stats = () => {
  const { stats, error, isLoading } = useStatsGAmes();

  const egldVolume = stats.volume.find((v) => v.token === "EGLD");
  return (
    <div className="p-4 rounded-lg mb-4 text-center">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-2xl font-semibold">Games Played</p>
          <p className="text-lg font-bold">{stats.gamesPlayed}</p>
        </div>
        <div>
          <p className="text-2xl font-semibold">Total Volume</p>
          <p className="text-lg font-bold">
            {formatBalance({
              balance: egldVolume?.amount || 0,
            })}{" "}
            EGLD
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
