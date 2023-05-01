import { CoinMarket, IItems } from "../types/coins.interface";
import { getBitcoinData, getSevenTrends } from "../apis/coinGecko";

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
