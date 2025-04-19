import { useSelector } from "react-redux";
import SearchInput from "./Components/SearchInput/SearchInput";
import SearchCryptoTable from "@/components/SearchCryptoTable/SearchCryptoTable";
import Loader from "@/components/Loader/Loader";
import Pagination from "@/components/SearchCryptoTable/Pagination/Pagination";
import { RootState } from "@/store/store";
import "./SearchCrypto.scss";
import { useCoinList } from "@/hooks/useCoinList";

export default function SearchCrypto(): JSX.Element {
  const page = useSelector((state: RootState) => state.searchPage.page);
  const { coinsList, isLoading, error } = useCoinList(page);

  return (
    <div className="search-crypto">
      <h1 className="search-crypto__title">
        Valeur des cryptommonaies par capitalisation boursière
      </h1>
      <div className="flex-fill d-flex flex-column">
        <SearchInput />
        <div className="search-crypto__results">
          {isLoading ? (
            <div className="search-crypto__loader">
              <Loader />
            </div>
          ) : error ?
            <h2 className="search-crypto__title">
              {error}
            </h2> :
            (
              <>
                <SearchCryptoTable coins={coinsList} />
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
