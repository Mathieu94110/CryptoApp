import { useEffect, useState } from "react";
import { CoinList } from "../../apis/coinGecko";
import { Search } from "./Components/Search/Search";
import { CoinMarket } from "../../types/coins.interface";
import SearchCryptoItem from "./Components/SearchCryptoItem/SearchCryptoItem";
import Loader from "../../components/Loader/Loader";
import "./SearchCrypto.scss";

export default function SearchCrypto() {
  const [coins, setCoins] = useState<CoinMarket[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setTimeout(async () => {
      const response = await CoinList(page);
      setCoins((prev) => {
        return [...prev, ...response];
      });
      setLoading(false);
    }, 1500);
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((prev) => prev + 1);
    }
  };

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
              ;
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
