import { getTopVolume } from "../functions";

describe("getTopVolume", () => {
  const usersVolume = [
    { address: "user1", amount: "100" },
    { address: "user2", amount: "200" },
    { address: "user3", amount: "50" },
    {
      address: "user5",
      amount: "3000000000000000000000000000000000000000000000000000000000000",
    },
    { address: "user6", amount: "10000000000000000000000000000000000000" },
    { address: "user4", amount: "300" },
    { address: "user7", amount: "100" },
    { address: "user8", amount: "500" },
    { address: "user9", amount: "5000" },
    { address: "user10", amount: "560" },
  ];

  test("should return top users by amount", () => {
    const topUsers = getTopVolume(usersVolume, 3);
    expect(topUsers).toEqual([
      {
        address: "user5",
        amount: "3000000000000000000000000000000000000000000000000000000000000",
      },
      { address: "user6", amount: "10000000000000000000000000000000000000" },
      { address: "user9", amount: "5000" },
    ]);
  });

  test("should return top users with default count", () => {
    const topUsers = getTopVolume(usersVolume);
    expect(topUsers).toEqual([
      {
        address: "user5",
        amount: "3000000000000000000000000000000000000000000000000000000000000",
      },
      { address: "user6", amount: "10000000000000000000000000000000000000" },
      { address: "user9", amount: "5000" },
      { address: "user10", amount: "560" },
      { address: "user8", amount: "500" },
      { address: "user4", amount: "300" },
      { address: "user2", amount: "200" },
      { address: "user1", amount: "100" },
      { address: "user7", amount: "100" },
      { address: "user3", amount: "50" },
    ]);
  });

  test("should handle empty input", () => {
    const topUsers = getTopVolume([], 5);
    expect(topUsers).toEqual([]);
  });

  test("should handle input with fewer users than countToReturn", () => {
    const topUsers = getTopVolume(usersVolume, 20);
    expect(topUsers).toEqual([
      {
        address: "user5",
        amount: "3000000000000000000000000000000000000000000000000000000000000",
      },
      { address: "user6", amount: "10000000000000000000000000000000000000" },
      { address: "user9", amount: "5000" },
      { address: "user10", amount: "560" },
      { address: "user8", amount: "500" },
      { address: "user4", amount: "300" },
      { address: "user2", amount: "200" },
      { address: "user1", amount: "100" },
      { address: "user7", amount: "100" },
      { address: "user3", amount: "50" },
    ]);
  });
  test("other test", () => {
    const topUsers = getTopVolume(
      [
        {
          address:
            "erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th",
          amount: "600000000000000000000",
        },
        {
          address:
            "erd1ag6nvusjhcw90ntutyzsn7gntmgx9rv8xz2qczgquy48ltaxqghqxs0rkl",
          amount: "7.7e+21",
        },
        {
          address:
            "erd1085h6wdckzfkvfftq837mwt2a780dv0p8wcjjpauku7at0dlqswszewvjn",
          amount: "4.8e+22",
        },
      ],
      20
    );
    expect(topUsers).toEqual([
      {
        address:
          "erd1085h6wdckzfkvfftq837mwt2a780dv0p8wcjjpauku7at0dlqswszewvjn",
        amount: "4.8e+22",
      },
      {
        address:
          "erd1ag6nvusjhcw90ntutyzsn7gntmgx9rv8xz2qczgquy48ltaxqghqxs0rkl",
        amount: "7.7e+21",
      },
      {
        address:
          "erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th",
        amount: "600000000000000000000",
      },
    ]);
  });
});
