import { useEffect, useState } from "react";
import { CoinDetails } from "@/apis/coinGecko";
import { CoinsFetchData } from "@/types/coins.interface";

export function useCoinDetails(coin: string) {
  const [data, setData] = useState<CoinsFetchData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await CoinDetails(coin);
      setData(response);
      setLoading(false);
    };
    fetchData();
  }, [coin]);

  return { data, loading };
}
