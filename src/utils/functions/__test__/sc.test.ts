import {
  Base64toString,
  convertToBoolean,
  extractStringsBetweenAts,
} from "../sc";

test("Decodes base64 string to UTF-8", () => {
  // Arrange
  const base64String = "SGVsbG8gd29ybGQ=";

  // Act
  const result = Base64toString(base64String);

  // Assert
  expect(result).toBe("Hello world");
});
test("Decodes base64 string to UTF-8 other string", () => {
  // Arrange
  const base64String = "dGV4dA===";

  // Act
  const result = Base64toString(base64String);

  // Assert
  expect(result).toBe("text");
});

describe("extractStringsBetweenAts", () => {
  it('should return an array with strings between "@" symbols', () => {
    // Test 1: input string contains one "@" symbol
    const input1 = "@hello@world";
    const expected1 = ["hello", "world"];
    expect(extractStringsBetweenAts(input1)).toEqual(expected1);

    // Test 2: input string contains multiple "@" symbols
    const input2 = "coding@is@fun";
    const expected2 = ["coding", "is", "fun"];
    expect(extractStringsBetweenAts(input2)).toEqual(expected2);

    // Test 3: input string starts with "@" symbol
    const input3 = "@the@@quick@brown@fox";
    const expected3 = ["the", "0", "quick", "brown", "fox"];
    expect(extractStringsBetweenAts(input3)).toEqual(expected3);

    // Test 4: input string does not contain "@" symbol
    const input4 = "noAtSymbolHere";
    const expected4 = ["noAtSymbolHere"];
    expect(extractStringsBetweenAts(input4)).toEqual(expected4);
  });

  // Test 5: input string does not contain "@" symbol
  test("If final @ put a 0", () => {
    const input5 = "@00@";
    const expected5 = ["00", "0"];
    expect(extractStringsBetweenAts(input5)).toEqual(expected5);
  });

  //   it("should return an empty array if input is an empty string", () => {
  //     const input = "";
  //     const expected = [];
  //     expect(extractStringsBetweenAts(input)).toEqual(expected);
  //   });
});

describe("convertToBoolean", () => {
  // Test case for false values
  test("should return false for '00'", () => {
    expect(convertToBoolean("00")).toBe(false);
  });

  test("should return false for '0'", () => {
    expect(convertToBoolean("0")).toBe(false);
  });

  test("should return false for 0", () => {
    expect(convertToBoolean(0)).toBe(false);
  });

  // Test case for true values
  test("should return true for '01'", () => {
    expect(convertToBoolean("01")).toBe(true);
  });

  test("should return true for '1'", () => {
    expect(convertToBoolean("1")).toBe(true);
  });

  test("should return true for 1", () => {
    expect(convertToBoolean(1)).toBe(true);
  });

  // Test case for unrecognized value
  test("should throw an error for unrecognized input value", () => {
    expect(() => convertToBoolean("invalid")).toThrow(
      'Input ""invalid"" value not recognized'
    );
  });
});
