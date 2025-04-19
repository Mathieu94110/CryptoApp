import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@/store/store";
import { switchFavorite } from "@/store/reducers/favoritesSlice";
import { MarketData } from "src/models/coins";
import { FaStar } from "react-icons/fa";
import "./SearchCryptoItem.scss";

function SearchCryptoItem({
  row,
  period,
}: {
  row: MarketData;
  period: string;
}) {
  const [favorited, setFavorited] = useState<Boolean>(false);
  const favorites = useSelector(
    (state: RootState) => state.favoritesList.favoritesItems
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (
    e: React.MouseEvent<HTMLSpanElement>,
    row: MarketData
  ) => {
    e.stopPropagation();
    dispatch(switchFavorite(row));
  };

  useEffect(() => {
    const isOnFavorites = favorites.some((favorite) => favorite.id === row.id);
    if (isOnFavorites) {
      setFavorited(true);
    } else {
      setFavorited(false);
    }
  }, [favorites, row]);

  function numberWithCommas(x: string | undefined) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  let profit;
  if (period === "7j") {
    profit =
      row?.price_change_percentage_7d_in_currency >= 0
        ? row?.price_change_percentage_7d_in_currency
        : "";
  } else {
    profit =
      row?.price_change_percentage_24h >= 0
        ? row?.price_change_percentage_24h
        : "";
  }

  return (
    <tr
      onClick={() => navigate(`/Details/${row.id}`)}
      className="search-crypto-item__row"
    >
      <td className="search-crypto-item__td">{row.market_cap_rank}</td>
      <th className="search-crypto-item__td">
        <img
          src={row?.image}
          alt={row.name}
          className="search-crypto-item__img"
        />
        <div className="d-flex flex-column">
          <span className="search-crypto-item__symbol">
            {row?.symbol?.toUpperCase()}
          </span>
          <span className="color-dark-grey">{row.name}</span>
        </div>
      </th>
      <td className="search-crypto-item__td">
        {numberWithCommas(row?.current_price?.toFixed(2))}
        {"€"}
      </td>
      <td
        style={{
          color: profit && Number(profit) > 0 ? "var(--green)" : "var(--red)",
        }}
        className="search-crypto-item__td-24h-changes"
      >
        {profit && "+"}
        {period === "7j"
          ? row?.price_change_percentage_7d_in_currency?.toFixed(2)
          : row?.price_change_percentage_24h?.toFixed(2)}
        %
      </td>
      <td className="search-crypto-item__td">
        {numberWithCommas(row?.market_cap?.toString().slice(0, -6))}
        {"€"} M
      </td>
      <td className="search-crypto-item__td z-index-99">
        <span className="p-10" onClick={(e) => handleClick(e, row)}>
          <FaStar className={`${favorited ? "color-secondary" : ""}`} />
        </span>
      </td>
    </tr >
  );
}

export default SearchCryptoItem;
