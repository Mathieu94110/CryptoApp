import { useEffect, useState } from "react";
import { CoinList } from "../../apis/coinGecko";
import { useNavigate } from "react-router-dom";
import "./SearchCrypto.scss";
import { SearchInput } from "./Components/SearchInput";
import { CoinMarket } from "../../types/coins.interface";

export function numberWithCommas(x: string | undefined) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function SearchCrypto() {
  const [coins, setCoins] = useState<CoinMarket[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchCoins = async () => {
    setLoading(true);
    const response = await CoinList();
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
                {[
                  "Position",
                  "Crypto-monnaie",
                  "Prix",
                  "Évolution sur 24h",
                  "Capitalisation",
                ].map((head) => (
                  <td className="color-black font-700 py-5" key={head}>
                    {head}
                  </td>
                ))}
              </tr>
            </thead>

            <tbody>
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row: CoinMarket, index: number) => {
                  let profit =
                    row?.price_change_percentage_24h >= 0
                      ? row?.price_change_percentage_24h
                      : "";
                  return (
                    <tr
                      onClick={() => navigate(`/coins/${row.id}`)}
                      className="search-crypto__row"
                      key={index}
                    >
                      <td className="search-crypto__td">{(index += 1)}</td>
                      <th className="search-crypto__td">
                        <img
                          src={row?.image}
                          alt={row.name}
                          className="search-crypto__image"
                        />
                        <div className="d-flex flex-column">
                          <span className="search-crypto__symbol">
                            {row?.symbol?.toUpperCase()}
                          </span>
                          <span style={{ color: "darkgrey" }}>{row.name}</span>
                        </div>
                      </th>
                      <td className="search-crypto__td">
                        {numberWithCommas(row?.current_price?.toFixed(2))}
                        {"€"}
                      </td>
                      <td
                        style={{
                          color:
                            profit && Number(profit) > 0
                              ? "rgb(14, 203, 129)"
                              : "red",
                        }}
                        className="search-crypto__td-24h-changes"
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </td>
                      <td className="search-crypto__td">
                        {numberWithCommas(
                          row?.market_cap?.toString().slice(0, -6)
                        )}
                        {"€"} M
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
