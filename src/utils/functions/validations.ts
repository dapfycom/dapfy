export const isValidNumber = (value: string) => {
  if (value === "") return false;
  if (value === ".") return false;

  const regex = /^[0-9]*\.?[0-9]*$/;
  return regex.test(value);
};

export function isValidEmail(email: string) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
