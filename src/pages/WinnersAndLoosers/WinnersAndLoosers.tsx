import { useState, useEffect } from "react";
import DropdownsMenu from "./Components/DropdownsMenu";
import { getFirst250Coins } from "../../apis/coinGecko";
import SearchCryptoTable from "../../components/SearchCryptoTable/SearchCryptoTable";
import { MarketData } from "../../types/coins.interface";
import Loader from "../../components/Loader/Loader";
import "./WinnersAndLoosers.scss";

function WinnersAndLoosers() {
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("Gagnants");
  const [top, setTop] = useState<string>("50");
  const [period, setPeriod] = useState<string>("24h");
  const [initial250Coins, setInitial250Coins] = useState<MarketData[]>([]);
  const [coinsByPriceChange, setCoinsByPriceChange] = useState<MarketData[]>(
    []
  );
  async function filterWithCurrentParams() {
    setLoading(true);
    let filteredCoins;
    if (period === "7j" && selectedCategory === "Gagnants") {
      console.log('period === "7j" && selectedCategory === "Gagants"');
      filteredCoins = initial250Coins
        .sort(
          (a: MarketData, b: MarketData) =>
            a.price_change_percentage_7d_in_currency -
            b.price_change_percentage_7d_in_currency
        )
        .slice(0, parseInt(top!));
    } else if (period === "7j" && selectedCategory === "Perdants") {
      console.log('period === "7j" && selectedCategory === "Perdants"');
      filteredCoins = initial250Coins
        .sort(
          (a: MarketData, b: MarketData) =>
            b.price_change_percentage_7d_in_currency -
            a.price_change_percentage_7d_in_currency
        )
        .slice(0, parseInt(top!));
    } else if (period === "24h" && selectedCategory === "Gagnants") {
      console.log('period === "24h" && selectedCategory === "Gagnants"');
      filteredCoins = initial250Coins
        .sort(
          (a: MarketData, b: MarketData) =>
            a.price_change_percentage_24h - b.price_change_percentage_24h
        )
        .slice(0, parseInt(top!));
    } else if (period === "24h" && selectedCategory === "Perdants") {
      console.log('period === "24h" && selectedCategory === "Perdants"');
      filteredCoins = initial250Coins
        .sort(
          (a: MarketData, b: MarketData) =>
            b.price_change_percentage_24h - a.price_change_percentage_24h
        )
        .slice(0, parseInt(top!));
    } else {
      filteredCoins = initial250Coins;
    }
    setCoinsByPriceChange(filteredCoins);
    setLoading(false);
  }

  async function searchInitialTopList() {
    const response = await getFirst250Coins();
    setInitial250Coins(response);
  }

  function changeParams(query: { name: string; value: string }) {
    if (query.name === "period" && query.value !== period) {
      setPeriod(query.value);
    } else if (query.name === "top" && query.value !== top) {
      setTop(query.value);
    } else if (query.name === "category" && query.value !== selectedCategory) {
      setSelectedCategory(query.value);
    }
    filterWithCurrentParams();
  }

  useEffect(() => {
    searchInitialTopList();
  }, []);

  useEffect(() => {
    filterWithCurrentParams();
  }, [initial250Coins]);

  return (
    <div className="winners-and-loosers">
      <h1 className="winners-and-loosers__title">
        Gagnants et perdants ( dans le top 250 )
      </h1>
      <hr className="winners-and-loosers__hr" />
      <div className="winners-and-loosers__body">
        {loading && !coinsByPriceChange.length ? (
          <Loader />
        ) : (
          <>
            <DropdownsMenu
              period={period}
              top={top}
              selectedCategory={selectedCategory}
              changeParams={changeParams}
            />
            <SearchCryptoTable coins={coinsByPriceChange} period={period} />
          </>
        )}
      </div>
    </div>
  );
}

export default WinnersAndLoosers;
