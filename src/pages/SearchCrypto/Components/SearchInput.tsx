import { useState, useEffect } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { FaSearch } from "react-icons/fa";
import "./SearchInput.scss";

export const SearchInput = ({
  setFilter,
}: {
  setFilter: (text: string) => void;
}) => {
  // DebouncedOutput is initialized to null in order to prevent searchInputValue from parent to be empty after first loading
  const [debouncedOutput, setDebouncedOutput] = useState<string | null>(null);

  const onChangeDebouncedEvent = async (text: string): Promise<void> => {
    setDebouncedOutput(text.trim().toLowerCase());
  };
  // Here onChangeDebounced is used to authorize api call after 800ms delay between each new entries
  const onChangeDebounced = useDebounce(onChangeDebouncedEvent);

  useEffect(() => {
    if (debouncedOutput) setFilter(debouncedOutput);
  }, [debouncedOutput]);

  return (
    <div className="search-input">
      <input
        onChange={(e) => onChangeDebounced(e.target.value)}
        className="search-input__input"
        type="search"
        placeholder="Rechercher un coin"
        aria-label="Barre de recherche"
      />
      <FaSearch className="search-input__icon" />
    </div>
  );
};
