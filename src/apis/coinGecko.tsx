import axios from "axios";
import { HistoricalChartResponse } from "../types/coins.interface";
import { CoinMarket } from "../types/coins.interface";

export const baseURL = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/",
});

export const sevenTrendUrl = "search/trending";

export const loadFirstHundred =
  "coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false";

export const searchCrypto = (inputValue: string) =>
  `coins/markets?vs_currency=eur&ids=${inputValue}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id: string) => `coins/${id}`;

export async function CoinList(): Promise<any> {
  try {
    const { data } = await baseURL.get(
      `coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function HistoricalChart(
  id: string,
  days: number
): Promise<HistoricalChartResponse> {
  try {
    const { data } = await baseURL.get(
      `coins/${id}/market_chart?vs_currency=eur&days=${days}`
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function TrendingCoins(): Promise<CoinMarket[]> {
  try {
    const { data } = await baseURL.get(
      "coins/markets?vs_currency=eur&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
    );
    return data;
  } catch (error) {
    throw error;
  }
}
