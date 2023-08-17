import SearchCryptoItem from "../../pages/SearchCrypto/Components/SearchCryptoItem/SearchCryptoItem";
import { MarketData } from "../../types/coins.interface";
import "./SearchCryptoTable.scss";

const SearchCryptoTable: React.FunctionComponent<{
  coins: MarketData[];
  period: string;
}> = ({ coins, period }) => {
  return (
    <div className="search-crypto-table">
      <div className="search-crypto-table__results">
        <div className="search-crypto-table__table-container">
          <table
            aria-label="tableau des cryptomonnaies"
            className="search-crypto-table__table"
          >
            <thead
              style={{ backgroundColor: "#EEBC1D", position: "sticky", top: 0 }}
            >
              <tr>
                {[
                  "Position",
                  "Coin",
                  "Prix",
                  `${period}`,
                  "Cap.",
                  "Favoris",
                ].map((head) => (
                  <th className="color-black font-700 py-5" key={head}>
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {coins.map((coin: MarketData, index: number) => (
                <SearchCryptoItem row={coin} period={period} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchCryptoTable;
