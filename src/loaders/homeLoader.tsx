import { getBitcoinData, getSevenTrends } from "../apis/coinGecko";
import { CoinMarket, IItems } from "../types/coins.interface";

async function homeLoader(): Promise<{
  bitcoinData: CoinMarket;
  sevenTrendsData: IItems[];
}> {
  try {
    const bitcoinData = await getBitcoinData();
    const sevenTrendsData = await getSevenTrends();
    return { bitcoinData, sevenTrendsData };
  } catch (error) {
    throw error;
  }
}

export default homeLoader;
