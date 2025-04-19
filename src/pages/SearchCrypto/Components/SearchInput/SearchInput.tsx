import { SearchCoins } from "@/apis/coinGecko";
import { useDebounce } from "@/hooks/useDebounce";
import { getSearchResult } from "@/store/reducers/searchSlice";
import { RootState } from "@/store/store";
import { SearchCoin } from "src/models/coins";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './SearchInput.scss';

const SearchInput: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const searchResults = useSelector(
    (state: RootState) => state.searchList.searchResults
  );

  const shouldDisplayResults = searchText && Array.isArray(searchResults) && searchResults.length > 0;
  const noResultsFound = searchText && Array.isArray(searchResults) && searchResults.length === 0 && !isSearching && !isWaiting;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const debouncedSearch = useDebounce((query: string) => {
    if (query.trim() === "") {
      dispatch(getSearchResult([]));
      setIsSearching(false);
      setIsWaiting(false);
      return;
    }

    setIsWaiting(false);
    setIsSearching(true);
    performSearch(query.trim().toLowerCase());
  });

  const performSearch = async (query: string) => {
    try {
      const response = await SearchCoins(query);
      dispatch(getSearchResult(response));
    } finally {
      setIsSearching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    setIsWaiting(true);
    debouncedSearch(value);
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

      {shouldDisplayResults && (
        <ul className="search-input__results">
          {searchResults.map((coin: SearchCoin) => (
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
          ))}
        </ul>
      )}

      {noResultsFound && (
        <div className="search-input__results">Aucun résultat trouvé</div>
      )}
    </div>
  );
};
export default SearchInput;
