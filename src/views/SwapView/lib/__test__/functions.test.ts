import BigNumber from "bignumber.js";
import { getRealBalance } from "utils/functions/formatBalance";

describe("getRealBalance", () => {
  it("should return real balance as number when returnBigNumber is false", () => {
    const result = getRealBalance("1000000000000000000", 18, false);
    expect(result).toBe(1);
  });

  it("should return real balance as BigNumber when returnBigNumber is true", () => {
    const result = getRealBalance("1000000000000000000", 18, true);
    expect(result.toString()).toEqual(new BigNumber(1).toString());
  });

  it("should return real balance with decimal precision", () => {
    const result = getRealBalance("1000000000000000000", 6, false);
    expect(result).toBe(1000000000000);
  });

  it("should return real balance with default values", () => {
    const result = getRealBalance();
    expect(result).toBe(0);
  });
});
