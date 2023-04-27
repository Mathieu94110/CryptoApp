import { baseURL, sevenTrendUrl } from "../apis/coinGecko";
import { CoinMarket, IItems } from "../types/coins.interface";

async function getBitcoinData(): Promise<CoinMarket> {
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

async function getSevenTrends(): Promise<IItems[]> {
  try {
    const sevenTrends = await baseURL.get(sevenTrendUrl);
    return sevenTrends.data.coins;
  } catch (error) {
    throw error;
  }
}

async function homeLoader() {
  try {
    const bitcoinData = await getBitcoinData();
    const sevenTrendsData = await getSevenTrends();
    return { bitcoinData, sevenTrendsData };
  } catch (error) {
    throw error;
  }
}

export default homeLoader;
