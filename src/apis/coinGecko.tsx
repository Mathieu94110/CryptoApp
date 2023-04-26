import axios from "axios";

export const baseURL = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/",
});

export const sevenTrendUrl = "search/trending";

export const loadFirstHundred =
  "coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false";

export const searchCrypto = (inputValue: any) =>
  `coins/markets?vs_currency=eur&ids=${inputValue}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const CoinList = (currency: string) =>
  `coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id: string) => `coins/${id}`;

export const HistoricalChart = (id: string, days = 365, currency: string) =>
  `coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export async function TrendingCoins() {
  try {
    const trendingCoins = await baseURL.get(
      "coins/markets?vs_currency=eur&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
    );
    return trendingCoins;
  } catch (error) {
    console.error(error);
  }
}
