import axios from "axios";
import {
  HistoricalChartResponse,
  MarketData,
  CoinMarket,
  IItems,
} from "@/types/coins.interface";

export const baseURL = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/",
});

export async function getBitcoinData(): Promise<CoinMarket> {
  try {
    const bitcoin = await baseURL.get("/coins/markets", {
      params: {
        vs_currency: "eur",
        id: "bitcoin",
      },
    });
    return bitcoin.data[0];
  } catch (error) {
    throw error;
  }
}

export async function getSevenTrends(): Promise<IItems[]> {
  try {
    const sevenTrends = await baseURL.get("search/trending");
    return sevenTrends.data.coins;
  } catch (error) {
    throw error;
  }
}

export async function SearchCoins(query: string): Promise<any> {
  try {
    const { data } = await baseURL.get(`search?query=${query}`);
    return data.coins;
  } catch (error) {
    throw error;
  }
}

export async function CoinDetails(id: string): Promise<any> {
  try {
    const { data } = await baseURL.get(
      `coins/${id}?localization=true&tickers=false&market_data=false&community_data=false&sparkline=false`
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function CoinList(page: number): Promise<any> {
  try {
    const { data } = await baseURL.get(
      `coins/markets?vs_currency=eur&order=market_cap_desc&per_page=10&page=${page}&sparkline=false`
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
      `coins/${id.toLowerCase()}/market_chart?vs_currency=eur&days=${days}`
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTrendingCoins(): Promise<CoinMarket[]> {
  try {
    const { data } = await baseURL.get(
      "coins/markets?vs_currency=eur&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
    );
    return data;
  } catch (error) {
    throw error;
  }
}
export async function getFirst250Coins(): Promise<MarketData[]> {
  try {
    const { data } = await baseURL.get(
      "coins/markets?vs_currency=eur&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=7d&locale=en"
    );
    return data;
  } catch (error) {
    throw error;
  }
}
