import BigNumber from "bignumber.js";
export const timeStampToSeconds = (timestamp: number): number => {
  return Number(new BigNumber(timestamp).dividedBy(1000).toFixed(0));
};
