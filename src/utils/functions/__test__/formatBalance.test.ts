// Import required libraries
import BigNumber from "bignumber.js";
import { getRealBalance, setElrondBalance } from "../formatBalance";

// Describe the main test suite for the 'setElrondBalance' function
describe("setElrondBalance", () => {
  // Test for the default decimals parameter value
  it("should return balance multiplied by 10^18 for default decimals", () => {
    const amount = 1;
    const expectedResult = "1000000000000000000";
    expect(setElrondBalance(amount)).toBe(expectedResult);
  });

  // Test for custom decimals value
  it("should return balance multiplied by 10^5 for 5 decimals", () => {
    const amount = 1;
    const decimals = 5;
    const expectedResult = "100000";
    expect(setElrondBalance(amount, decimals)).toBe(expectedResult);
  });

  // Test to handle potential errors and return "0"
  it('should return "0" on error', () => {
    expect(setElrondBalance(undefined as any)).toBe("0");
  });
});

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
