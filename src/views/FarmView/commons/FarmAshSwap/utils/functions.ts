import BigNumber from "bignumber.js";
import toHex from "to-hex";

export function getFarmNftIdentifier(nonce: BigNumber): string {
  const nftId = "SANLOR-48b8de";
  const newNonce = toHex(nonce.toNumber(), { evenLength: true });
  return `${nftId}-${newNonce}`;
}

export const calculateFarmReward = (
  reward: string | number,
  activeLP: number | string,
  rewardPerShareLP: number | string,
  debtLP: number | string,
  activeNFT: number | string,
  rewardPerShareNFT: number | string,
  debtNFT: number | string
) => {
  const lpRewards = new BigNumber(activeLP)
    .multipliedBy(rewardPerShareLP)
    .dividedBy(10 ** 9)
    .minus(debtLP)
    .isGreaterThan(0)
    ? new BigNumber(activeLP)
        .multipliedBy(rewardPerShareLP)
        .dividedBy(10 ** 9)
        .minus(debtLP)
    : new BigNumber(0);
  const nftRewards = new BigNumber(activeNFT)
    .multipliedBy(rewardPerShareNFT)
    .dividedBy(10 ** 9)
    .minus(debtNFT)
    .isGreaterThan(0)
    ? new BigNumber(activeNFT)
        .multipliedBy(rewardPerShareNFT)
        .dividedBy(10 ** 9)
        .minus(debtNFT)
    : new BigNumber(0);

  const totalRewards = new BigNumber(reward)
    .plus(lpRewards)
    .plus(nftRewards)
    .toString();

  return totalRewards;
};
