import { IElrondEconomics } from "@/types/elrond.interface";
import { fetchElrondData } from ".";

export const fetchElrondEconomics = async (): Promise<IElrondEconomics> => {
  const economics = await fetchElrondData<IElrondEconomics>("/economics");
  return economics;
};

export const fetchStats = async () => {
  const stats = await fetchElrondData<{
    shards: number;
    blocks: number;
    accounts: number;
    transactions: number;
    scResults: number;
    refreshRate: number;
    epoch: number;
    roundsPassed: number;
    roundsPerEpoch: number;
  }>("/stats");
  return stats;
};
