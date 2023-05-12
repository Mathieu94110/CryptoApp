import SearchCryptoItem from "../../pages/SearchCrypto/Components/SearchCryptoItem/SearchCryptoItem";
import { MarketData } from "../../types/coins.interface";
import "./SearchCryptoTable.scss";

function SearchCryptoTable({
  coins,
  period,
}: {
  coins: MarketData[];
  period: string;
}) {
  return (
    <div className="search-crypto-table">
      <div className="search-crypto-table__results">
        <div className="search-crypto-table__table-container">
          <table
            aria-label="tableau des cryptomonnaies"
            className="search-crypto-table__table"
          >
            <thead style={{ backgroundColor: "#EEBC1D" }}>
              <tr>
                {[
                  "Position",
                  "Coin",
                  "Prix",
                  `${period}`,
                  "Cap.",
                  "Favoris",
                ].map((head) => (
                  <td className="color-black font-700 py-5" key={head}>
                    {head}
                  </td>
                ))}
              </tr>
            </thead>

            <tbody>
              {coins.map((coin: MarketData, index: number) => (
                <SearchCryptoItem row={coin} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SearchCryptoTable;
