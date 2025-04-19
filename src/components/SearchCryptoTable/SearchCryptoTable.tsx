import SearchCryptoItem from "@/pages/SearchCrypto/Components/SearchCryptoItem/SearchCryptoItem";
import { MarketData } from "src/models/coins";
import "./SearchCryptoTable.scss";
import { SearchCryptoColumns, SearchCryptoColumnsKeys, SearchCryptoColumnsKey } from "src/models/search";


const SearchCryptoTable: React.FunctionComponent<{
  coins: MarketData[];
}> = ({ coins }) => {

  function getCryptoColumnLabel(column: SearchCryptoColumnsKey) {
    return SearchCryptoColumns[column]
  }
  return (
    <div className="search-crypto-table">
      <div className="search-crypto-table__results">
        <div className="search-crypto-table__table-container">
          <table
            aria-label="tableau des cryptomonnaies"
            className="search-crypto-table__table"
          >
            <thead
              className="search-crypto-table__header"
            >
              <tr>
                {SearchCryptoColumnsKeys.map((column: SearchCryptoColumnsKey, index) => (
                  <th className="color-primary font-700 py-5" key={index}>
                    {getCryptoColumnLabel(column)}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {coins.map((coin: MarketData, index: number) => (
                <SearchCryptoItem row={coin} period="24h" key={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchCryptoTable;
