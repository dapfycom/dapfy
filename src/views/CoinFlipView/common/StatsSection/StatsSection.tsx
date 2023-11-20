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
    // <Flex flexDir={"column"} w="full" justifyContent="space-between" gap="20px">
    //   <Card p="30px">
    //     <Text color="primary" fontSize={"lg"} mb="10px">
    //       Total BSK Bets
    //     </Text>
    //     <Text color="white">{formatNumber(allTimeBetsCount)}</Text>
    //   </Card>
    //   <Card p="30px">
    //     <Text color="primary" fontSize={"lg"} mb="10px">
    //       Total Players
    //     </Text>
    //     <Text color="white">{playersCount}</Text>
    //   </Card>
    //   <Card p="30px">
    //     <Text color="primary" fontSize={"lg"} mb="10px">
    //       All Time BSK Volume
    //     </Text>
    //     <Text color="white">
    //       {" "}
    //       {formatBalance({
    //         balance: volume,
    //         decimals: elrondToken?.decimals,
    //       })}{" "}
    //       {formatTokenI(tokenI)}
    //     </Text>
    //     <Text fontSize={"sm"} mt={1}>
    //       {" "}
    //       ${" "}
    //       {formatBalanceDolar(
    //         {
    //           balance: volume,
    //           decimals: elrondToken?.decimals,
    //         },
    //         elrondToken?.price
    //       )}{" "}
    //     </Text>
    //   </Card>
    //   <Card p="30px">
    //     <Text color="primary" fontSize={"lg"} mb="10px">
    //       ALL TIME BSK BURNED 🔥
    //     </Text>
    //     <Text color="white">
    //       {" "}
    //       {formatBalance({
    //         balance: houseVolume,
    //         decimals: elrondToken?.decimals,
    //       })}{" "}
    //       {formatTokenI(tokenI)}
    //     </Text>
    //     <Text fontSize={"sm"} mt={1}>
    //       {" "}
    //       ${" "}
    //       {formatBalanceDolar(
    //         {
    //           balance: houseVolume,
    //           decimals: elrondToken?.decimals,
    //         },
    //         elrondToken?.price
    //       )}{" "}
    //     </Text>
    //   </Card>
    //   <Card p="30px">
    //     <Text color="primary" fontSize={"lg"} mb="10px">
    //       Top 10 players
    //     </Text>
    //     {topPlayers.map((player) => {
    //       return (
    //         <Flex color={"white"} key={player.address}>
    //           <Link
    //             isExternal
    //             href={`${selectedNetwork.network.explorerAddress}/accounts/${player.address}`}
    //           >
    //             <Text>{formatAddress(player.address)}</Text>
    //           </Link>
    //         </Flex>
    //       );
    //     })}
    //   </Card>
    // </Flex>
  );
};

export default StatsSection;
