import { useState, useEffect } from "react";
import DropdownsMenu from "./Components/DropdownsMenu";
import "./WinnersAndLoosers.scss";
import { getFirst250Coins } from "../../apis/coinGecko";

function WinnersAndLoosers() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Gagnants");
  const [top, setTop] = useState<string>("50");
  const [period, setPeriod] = useState<string>("24h");

  async function changePeriod(newPeriod: string) {
    if (newPeriod !== period) {
      setPeriod(newPeriod);
    }
  }
  async function changeTop(top: string) {
    setTop(top);
  }
  async function changeCategory(category: string) {
    setSelectedCategory(category);
  }

  async function filterWithCurrentParams(response: any) {
    console.log("top = ", top, "category =", selectedCategory);
  }

  async function searchInitialTopList(query: string) {
    const response = await getFirst250Coins(query);
    const filteredResponse = await filterWithCurrentParams(response);
  }

  useEffect(() => {
    searchInitialTopList(period);
  }, [period]);

  return (
    <div className="winners-and-loosers">
      <h1 className="winners-and-loosers__title">
        Gagnants et perdants ( dans le top 250 )
      </h1>
      <hr className="winners-and-loosers__hr" />
      <DropdownsMenu
        period={period}
        top={top}
        selectedCategory={selectedCategory}
        changeTop={changeTop}
        changeCategory={changeCategory}
        changePeriod={changePeriod}
      />
    </div>
  );
}

export default WinnersAndLoosers;
