export const convert = (value: any) => {
  if (value >= 1000000000) {
    value =
      (value / 1000000000).toString().substring(0, value.length - 10) + " G";
  } else if (1000000000 > value && value >= 1000000) {
    value = (value / 1000000).toString().substring(0, value.length - 7) + " M";
  } else if (1000000 > value && value >= 1000) {
    value = (value / 1000).toString().substring(0, value.length - 4) + " K";
  } else {
    return value;
  }
  return value;
};
