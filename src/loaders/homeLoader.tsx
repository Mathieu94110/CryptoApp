import { baseURL, sevenTrendUrl } from "../apis/coinGecko";

async function getBitcoinData() {
  try {
    const bitcoin = await baseURL.get("/coins/markets", {
      params: {
        vs_currency: "eur",
        id: "bitcoin",
      },
    });
    return bitcoin.data[0];
  } catch (error) {
    console.error(error);
  }
}

async function getSevenTrends() {
  try {
    const sevenTrends: any = await baseURL.get(sevenTrendUrl);
    console.log(sevenTrends);
    return sevenTrends.data.coins;
  } catch (error) {
    console.error(error);
  }
}

async function homeLoader() {
  const bitcoinData: any = await getBitcoinData();
  const sevenTrendsData: any = await getSevenTrends();
  return { bitcoinData, sevenTrendsData };
}

export default homeLoader;
