import { useEffect, useState } from "react";
import { CoinList } from "../../apis/coinGecko";
import { Search } from "./Components/Search/Search";
import { MarketData } from "../../types/coins.interface";
import Loader from "../../components/Loader/Loader";
import Pagination from "../../components/SearchCryptoTable/Pagination/Pagination";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import SearchCryptoTable from "../../components/SearchCryptoTable/SearchCryptoTable";
import "./SearchCrypto.scss";

export default function SearchCrypto() {
  const [coins, setCoins] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const page = useSelector((state: RootState) => state.searchPage.page);

  async function fetchCoinsList(page: number) {
    setLoading(true);
    const response = await CoinList(page);
    setCoins(response);
    setLoading(false);
  }

  useEffect(() => {
    fetchCoinsList(page);
  }, [page]);

  return (
    <div className="search-crypto">
      <h1 className="search-crypto__title">
        Valeur des cryptommonaies par capitalisation boursière
      </h1>
      <div className="search-crypto__body">
        <Search />
        <div>
          <div className="search-crypto__results">
            {loading ? (
              <div className="search-crypto__loader">
                <Loader />
              </div>
            ) : (
              <>
                <SearchCryptoTable coins={coins} period="24h" />
                <div className="search-crypto__pagination">
                  <Pagination />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
