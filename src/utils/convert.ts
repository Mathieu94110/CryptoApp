export const convert = (value: string) => {
  if (Number(value) >= 1000000000) {
    value =
      (Number(value) / 1000000000).toString().substring(0, value.length - 10) +
      " G";
  } else if (1000000000 > Number(value) && Number(value) >= 1000000) {
    value =
      (Number(value) / 1000000).toString().substring(0, value.length - 7) +
      " M";
  } else if (1000000 > Number(value) && Number(value) >= 1000) {
    value =
      (Number(value) / 1000).toString().substring(0, value.length - 4) + " K";
  } else {
    return value;
  }
  return value;
};
