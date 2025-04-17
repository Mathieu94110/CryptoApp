import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchInput from "./Components/SearchInput/SearchInput";
import SearchCryptoTable from "@/components/SearchCryptoTable/SearchCryptoTable";
import Loader from "@/components/Loader/Loader";
import Pagination from "@/components/SearchCryptoTable/Pagination/Pagination";
import { getCoinsList } from "@/apis/coinGecko";
import { MarketData } from "@/types/coins.interface";
import { RootState } from "@/store/store";

import "./SearchCrypto.scss";

export default function SearchCrypto(): JSX.Element {
  const [coinsList, setCoinsList] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const page = useSelector((state: RootState) => state.searchPage.page);

  useEffect(() => {
    async function fetchCoinsList(page: number): Promise<void> {
      try {
        setLoading(true);
        const response = await getCoinsList(page);
        setCoinsList(response);
      } catch (e) {
        setError("Impossible de charger les données.");
      } finally {
        setLoading(false);
      }
    }
    fetchCoinsList(page);
  }, [page]);

  return (
    <div className="search-crypto">
      <h1 className="search-crypto__title">
        Valeur des cryptommonaies par capitalisation boursière
      </h1>
      <div className="flex-fill d-flex flex-column">
        <SearchInput />
        <div className="search-crypto__results">
          {loading ? (
            <div className="search-crypto__loader">
              <Loader />
            </div>
          ) : error ?
            <h2 className="search-crypto__title">
              Une erreur est survenue durant le chargement des crypto-monnaies
            </h2> :
            (
              <>
                <SearchCryptoTable coins={coinsList} period="24h" />
                <div className="search-crypto__pagination">
                  <Pagination />
                </div>
              </>
            )}
        </div>
      </div>
    </div>
  );
}
