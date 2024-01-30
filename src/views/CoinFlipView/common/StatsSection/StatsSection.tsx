"use client";
import { selectedNetwork } from "@/config/network";
import useGetElrondToken from "@/hooks/useGetElrondToken";
import { useAppSelector } from "@/hooks/useRedux";
import { formatAddress } from "@/utils/functions/formatAddress";
import {
  formatBalance,
  formatBalanceDollar,
} from "@/utils/functions/formatBalance";
import { formatTokenI } from "@/utils/functions/tokens";
import { selectCoinFlipTokenStr } from "@/views/CoinFlipView/lib/con-flip-slice";
import { getTopVolume } from "@/views/CoinFlipView/lib/functions";
import {
  useGetAllPlayersVolume,
  useGetHouseWinVolume,
  useGetPlayersCount,
  useGetTotalAllTimeBets,
  useGetVolume,
} from "@/views/CoinFlipView/lib/hooks";

const StatsSection = () => {
  const { allTimeBetsCount } = useGetTotalAllTimeBets();
  const { volume: houseVolume } = useGetHouseWinVolume();
  const { volume } = useGetVolume();
  const tokenI = useAppSelector(selectCoinFlipTokenStr);
  const { elrondToken } = useGetElrondToken(tokenI);

  const { playersCount } = useGetPlayersCount();
  const { playersVolume } = useGetAllPlayersVolume(playersCount);
  console.log({ playersVolume });
  console.log({ playersCount });

  const topPlayers = getTopVolume(playersVolume);

  return (
    <div className="flex flex-col w-full justify-between space-y-5 text-left">
      <div className="p-8   rounded-lg border w-full">
        <p className=" text-lg mb-2 ">Total BSK Bets</p>
        <p className="text-muted-foreground">{allTimeBetsCount}</p>
      </div>
      <div className="p-8   rounded-lg border">
        <p className=" text-lg mb-2">Total Players</p>
        <p className="text-muted-foreground">{playersCount}</p>
      </div>
      <div className="p-8   rounded-lg border">
        <p className=" text-lg mb-2">All Time BSK Volume</p>
        <p className="text-muted-foreground">
          {formatBalance({ balance: volume, decimals: elrondToken?.decimals })}{" "}
          {formatTokenI(tokenI)}
        </p>
        <p className="text-sm mt-1 text-muted-foreground">
          ≈ $
          {formatBalanceDollar(
            { balance: volume, decimals: elrondToken?.decimals },
            elrondToken?.price
          )}
        </p>
      </div>
      <div className="p-8   rounded-lg border">
        <p className=" text-lg mb-2">ALL TIME BSK BURNED 🔥</p>
        <p className="text-muted-foreground">
          {formatBalance({
            balance: houseVolume,
            decimals: elrondToken?.decimals,
          })}{" "}
          {formatTokenI(tokenI)}
        </p>
        <p className="text-sm mt-1 text-muted-foreground">
          $
          {formatBalanceDollar(
            { balance: houseVolume, decimals: elrondToken?.decimals },
            elrondToken?.price
          )}
        </p>
      </div>
      <div className="p-8   rounded-lg border">
        <p className=" text-lg mb-2">Top 10 players</p>
        {topPlayers.map((player) => (
          <div
            className="text-muted-foreground hover:text-foreground"
            key={player.address}
          >
            <a
              href={`${selectedNetwork.network.explorerAddress}/accounts/${player.address}`}
              target="_blank"
              rel="noreferrer"
            >
              <p>{formatAddress(player.address)}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
