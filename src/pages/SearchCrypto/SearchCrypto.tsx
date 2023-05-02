import { useEffect, useState } from "react";
import { CoinList } from "../../apis/coinGecko";
import { Search } from "./Components/Search/Search";
import { CoinMarket } from "../../types/coins.interface";
import SearchCryptoItem from "./Components/SearchCryptoItem/SearchCryptoItem";
import Loader from "../../components/Loader/Loader";
import "./SearchCrypto.scss";
import Pagination from "./Components/Pagination/Pagination";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function SearchCrypto() {
  const [coins, setCoins] = useState<CoinMarket[]>([]);
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

      <Search />
      <div>
        {loading ? (
          <Loader />
        ) : (
          <div className="search-crypto__results">
            <div className="search-crypto__table-container">
              <table
                aria-label="tableau des cryptomonnaies"
                className="search-crypto__table"
              >
                <thead style={{ backgroundColor: "#EEBC1D" }}>
                  <tr>
                    {["Position", "Coin", "Prix", "24h", "Cap.", "Favoris"].map(
                      (head) => (
                        <td className="color-black font-700 py-5" key={head}>
                          {head}
                        </td>
                      )
                    )}
                  </tr>
                </thead>

                <tbody>
                  {coins.map((coin: CoinMarket, index: number) => (
                    <SearchCryptoItem row={coin} index={index} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="search-crypto__pagination">
              <Pagination />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
