import { useEffect, useState } from "react";
import { CoinList } from "../../apis/coinGecko";
import { SearchInput } from "./Components/SearchInput";
import { CoinMarket } from "../../types/coins.interface";
import SearchCryptoItem from "./Components/SearchCryptoItem";
import "./SearchCrypto.scss";

export default function SearchCrypto() {
  const [coins, setCoins] = useState<CoinMarket[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchCoins = async () => {
    setLoading(true);
    const response = await CoinList();
    console.log(response);
    setCoins(response);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  const handleSearch = () => {
    return coins.filter(
      (coin: CoinMarket) =>
        coin?.name?.toLowerCase().includes(search) ||
        coin?.symbol?.toLowerCase().includes(search)
    );
  };

  return (
    <div className="search-crypto">
      <h1 className="search-crypto__title">
        Valeur des cryptommonaies par capitalisation boursière
      </h1>
      =
      <SearchInput setFilter={(value) => setSearch(value)} />
      <div>
        {loading ? (
          <p>Chargement en cours</p>
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
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row: CoinMarket, index: number) => {
                  return <SearchCryptoItem row={row} index={index} />;
                })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
