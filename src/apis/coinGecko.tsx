import axios from "axios";

export const baseURL = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/",
});

export const sevenTrendUrl = "search/trending";

export const loadFirstHundred =
  "coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false";

export const searchCrypto = (inputValue: any) =>
  `coins/markets?vs_currency=eur&ids=${inputValue}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
