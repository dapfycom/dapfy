export function numberWithCommas(x: string | number, decimals = false) {
  const number = Number(x);
  if (number < 1) {
    return x;
  }

  if (decimals) {
    return parseFloat(number.toString()).toLocaleString("el-GR");
  } else {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export function preventExponetialNotation(x: any) {
  return ("" + +x).replace(
    /(-?)(\d*)\.?(\d*)e([+-]\d+)/,
    function (a, b, c, d, e) {
      return e < 0
        ? b + "0." + Array(1 - e - c.length).join("0") + c + d
        : b + c + d + Array(e - d.length + 1).join("0");
    }
  );
}

export const validatePercent = (value: string | number): boolean => {
  const number = Number(value);
  if (number < 0 || number > 100) {
    return false;
  }
  return true;
};
