import { useState, useEffect } from "react";
import { useDebounce } from "../../../../hooks/useDebounce";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { SearchCoin } from "../../../../types/coins.interface";
import { getSearchResult } from "../../../../store/reducers/searchSlice";
import { SearchCoins } from "../../../../apis/coinGecko";
import { useNavigate } from "react-router-dom";
import "./Search.scss";

const SearchInput: React.FunctionComponent<{
  handleSearch: (v: string) => void;
}> = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState<string>("");
  const searchResults = useSelector(
    (state: RootState) => state.searchList.searchResults
  );
  const navigate = useNavigate();

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    let query = e.currentTarget.value;
    setSearchText(query);
    handleSearch(query);
  };

  return (
    <div className="position-relative">
      <form className="search-input">
        <input
          onChange={handleChange}
          value={searchText}
          className="search-input__input"
          type="search"
          placeholder="Rechercher un coin"
          aria-label="Barre de recherche"
        />
        <FaSearch className="search-input__icon" />
      </form>
      {searchText.length > 0 && searchResults.length > 0 ? (
        <ul className="search-input__results">
          {searchResults.map((coin: SearchCoin) => {
            return (
              <li
                key={coin.id}
                className="search-input__results-items"
                onClick={() => navigate(`/Details/${coin.id}`)}
              >
                <img
                  className="mx-20 w-20 h-20"
                  src={coin.thumb}
                  alt={coin.name}
                />
                <span>{coin.name}</span>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export const Search: React.FC = () => {
  // DebouncedOutput is initialized to null in order to prevent searchInputValue from parent to be empty after first loading
  const [debouncedOutput, setDebouncedOutput] = useState<string | null>(null);

  const onChangeDebouncedEvent = (text: string): void => {
    setDebouncedOutput(text.trim().toLowerCase());
  };
  // Here onChangeDebounced is used to authorize api call after 800ms delay between each new entries
  const onChangeDebounced = useDebounce(onChangeDebouncedEvent);
  const dispatch = useDispatch();

  async function searchCoin(query: string): Promise<void> {
    const response = await SearchCoins(query);
    dispatch(getSearchResult(response));
  }

  useEffect(() => {
    if (debouncedOutput) searchCoin(debouncedOutput);
  }, [debouncedOutput]);

  return (
    <>
      <SearchInput handleSearch={onChangeDebounced} />
    </>
  );
};
