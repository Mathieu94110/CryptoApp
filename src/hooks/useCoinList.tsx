import { useEffect, useState } from "react";
import axios from "axios";
import { getCoinsList } from "@/apis/coinGecko";
import { MarketData } from "@/types/coins.interface";


export function useCoinList(page: number) {
  const [coinsList, setCoinsList] = useState<MarketData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCoinsList(page: number): Promise<void> {
      try {
        setIsLoading(true);
        const response = await getCoinsList(page);
        setCoinsList(response);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const status = err.response?.status;
          const statusText = err.response?.statusText;
          setError(`Erreur ${status} - ${statusText}`);
        } else {
          setError("Une erreur inconnue est survenue durant le chargement des crypto-monnaies");
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchCoinsList(page);
  }, [page]);

  return { coinsList, isLoading, error };
}