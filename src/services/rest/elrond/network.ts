import { IElrondEconomics } from "@/types/elrond.interface";
import { fetchElrondData } from ".";

export const fetchElrondEconomics = async (): Promise<IElrondEconomics> => {
  const economics = await fetchElrondData<IElrondEconomics>("/economics");
  return economics;
};
