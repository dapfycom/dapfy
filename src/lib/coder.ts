import { Address } from "@multiversx/sdk-core/out";

export const decodeBase64ToString = (encodedString: string) => {
  return Buffer.from(encodedString, "base64").toString("utf-8");
};

export const decodeHexToListOfAddress = (hexString: string): string[] => {
  // Assuming each address is 64 hex characters, split the payload into address chunks.
  // The starting point for the address list needs to be determined accurately.
  let addressesHex = []; // This array will hold the hexadecimal strings of the addresses.
  for (let i = 0; i < hexString.length; i += 64) {
    let hexAddress = hexString.substring(i, i + 64);
    if (hexAddress.length < 64) break; // If the remaining string is less than 64 characters, stop the loop.
    addressesHex.push(hexAddress);
  }

  const list: string[] = [];

  // Convert each hexadecimal address to Bech32 format
  addressesHex.forEach((hexAddress, i) => {
    const address = new Address(hexAddress);
    const bech32Address = address.bech32();
    list.push(bech32Address);
  });

  return list;
};
