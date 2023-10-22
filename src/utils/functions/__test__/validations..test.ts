// Import the function to be tested

import { isValidNumber } from "../validations";

// Describe the main test suite for the 'isValidNumber' function
describe("isValidNumber", () => {
  // Test to check if the function correctly validates a positive integer
  it("should return true for positive integers", () => {
    expect(isValidNumber("123")).toBe(true);
  });

  // Test to check if the function correctly validates a positive floating point number
  it("should return true for positive floats", () => {
    expect(isValidNumber("123.456")).toBe(true);
  });

  // Test to check if the function correctly validates a single period (.)
  it("should return false for single period", () => {
    expect(isValidNumber(".")).toBe(false);
  });

  // Test to check if the function correctly validates an empty string
  it("should return false for empty string", () => {
    expect(isValidNumber("")).toBe(false);
  });

  // Test to check if the function correctly invalidates a string with characters other than numbers and a period
  it("should return false for string with alphabets or special characters", () => {
    expect(isValidNumber("12a3")).toBe(false);
    expect(isValidNumber("123@")).toBe(false);
  });
});
