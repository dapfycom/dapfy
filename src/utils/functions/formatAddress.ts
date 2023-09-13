export const formatAddress = (
  address: string,
  subStr1: number = 10,
  subStr2: number = 6
): string => {
  const addr = address || "";
  return (
    addr.substring(0, subStr1) +
    " ... " +
    addr.substring(addr.length - subStr2, addr.length)
  );
};

export const shortenHash = (address: string, charsAmount = 6) => {
  const firstPart = address.substring(0, charsAmount);
  const lastPart = address.substring(
    address.length - charsAmount,
    address.length
  );
  return `${firstPart}...${lastPart}`;
};
