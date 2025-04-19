import { useState, useEffect } from "react";
import DropdownsMenu from "./Components/DropdownsMenu";
import { getFirst250Coins } from "@/apis/coinGecko";
import SearchCryptoTable from "@/components/SearchCryptoTable/SearchCryptoTable";
import { MarketData } from "src/models/coins";
import Loader from "@/components/Loader/Loader";
import "./WinnersAndLoosers.scss";

function WinnersAndLoosers() {
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("Gagnants");
  const [top, setTop] = useState<string>("50");
  const [period, setPeriod] = useState<string>("24h");
  const [initialCoins, setInitialCoins] = useState<MarketData[]>([]);
  const [coinsByPriceChange, setCoinsByPriceChange] = useState<MarketData[]>(
    []
  );

  function filterWithCurrentParams(): void {
    setLoading(true);
    let filteredCoins;
    if (period === "24h") {
      if (selectedCategory === "Gagnants") {
        filteredCoins = initialCoins
          .sort(
            (a: MarketData, b: MarketData) =>
              b.price_change_percentage_24h - a.price_change_percentage_24h
          )
          .slice(0, parseInt(top!));
      } else {
        filteredCoins = initialCoins
          .sort(
            (a: MarketData, b: MarketData) =>
              a.price_change_percentage_24h - b.price_change_percentage_24h
          )
          .slice(0, parseInt(top!));
      }
    } else if (period === "7j") {
      if (selectedCategory === "Gagnants") {
        filteredCoins = initialCoins
          .sort(
            (a: MarketData, b: MarketData) =>
              b.price_change_percentage_7d_in_currency -
              a.price_change_percentage_7d_in_currency
          )
          .slice(0, parseInt(top!));
      } else {
        filteredCoins = initialCoins
          .sort(
            (a: MarketData, b: MarketData) =>
              a.price_change_percentage_7d_in_currency -
              b.price_change_percentage_7d_in_currency
          )
          .slice(0, parseInt(top!));
      }
    } else {
      filteredCoins = initialCoins;
    }
    setCoinsByPriceChange(filteredCoins);
    setLoading(false);
  }

  function changeParams(query: { name: string; value: string }): void {
    if (query.name === "period" && query.value !== period) {
      setPeriod(query.value);
    } else if (query.name === "top" && query.value !== top) {
      setTop(query.value);
    } else if (query.name === "category" && query.value !== selectedCategory) {
      setSelectedCategory(query.value);
    }
  }

  useEffect(() => {
    async function getInitialTopList(): Promise<void> {
      const initialCoins = await getFirst250Coins();
      setInitialCoins(initialCoins);
    }
    getInitialTopList();
  }, []);

  useEffect(() => {
    filterWithCurrentParams();
  }, [initialCoins]);

  useEffect(() => {
    filterWithCurrentParams();
  }, [selectedCategory, top, period]);

  return (
    <div className="winners-and-loosers">
      <h1 className="winners-and-loosers__title">
        Gagnants et perdants ( dans le top 250 )
      </h1>
      <hr />
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
            <SearchCryptoTable coins={coinsByPriceChange} />
          </>
        )}
      </div>
    </div>
  );
}

export default WinnersAndLoosers;
