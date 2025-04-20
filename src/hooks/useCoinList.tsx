import { useEffect, useState } from "react";
import axios from "axios";
import { getCoinsList } from "@/apis/coinGecko";
import { MarketData } from "src/models/coins";


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
          if (err.name && err.message) {
            setError(`Erreur ${err.name} - ${err.message}, vous avez effectué trop de requètes à l'api coinGecko, vous pourrez réessayer dans quelques instants`);
          }
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