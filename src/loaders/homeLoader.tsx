import { getBitcoinData, getSevenTrends } from "@/apis/coinGecko";
import { CoinMarket, IItems } from "src/models/coins";

async function homeLoader(): Promise<{
  bitcoinData: CoinMarket;
  sevenTrendsData: IItems[];
}> {
  try {
    const [bitcoinData, trendsData] = await Promise.all([
      getBitcoinData(),
      getSevenTrends(),
    ]);
    const sevenTrendsData = trendsData.slice(0, 7);
    return { bitcoinData, sevenTrendsData };
  } catch (error) {
    throw error;
  }
}

export default homeLoader;
