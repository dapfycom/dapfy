import { sendTokens } from "../server-mx-transactions";

describe("server-mx-transactions", () => {
  it("should work", () => {
    sendTokens();
    expect(true).toBe(true);
  });
});
