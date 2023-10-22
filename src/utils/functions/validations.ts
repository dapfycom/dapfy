export const isValidNumber = (value: string) => {
  if (value === "") return false;
  if (value === ".") return false;

  const regex = /^[0-9]*\.?[0-9]*$/;
  return regex.test(value);
};
