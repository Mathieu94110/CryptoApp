import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../../store/store";
import { switchFavorite } from "../../../store/reducers/favoritesSlice";
import { CoinMarket } from "../../../types/coins.interface";
import { FaStar } from "react-icons/fa";
import "./SearchCryptoItem.scss";

function SearchCryptoItem({ row, index }: { row: CoinMarket; index: number }) {
  const [favorited, setFavorited] = useState<Boolean>(false);
  const favorites = useSelector(
    (state: RootState) => state.favoritesList.favoritesItems
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (
    e: React.MouseEvent<HTMLSpanElement>,
    row: CoinMarket
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
  let profit =
    row?.price_change_percentage_24h >= 0
      ? row?.price_change_percentage_24h
      : "";
  return (
    <>
      <tr
        key={index}
        onClick={() => navigate(`/Details/${row.id}`)}
        className="search-crypto-item__row"
      >
        <td className="search-crypto-item__td">{(index += 1)}</td>
        <th className="search-crypto-item__td">
          <img
            src={row?.image}
            alt={row.name}
            className="search-crypto-item__image"
          />
          <div className="d-flex flex-column">
            <span className="search-crypto-item__symbol">
              {row?.symbol?.toUpperCase()}
            </span>
            <span style={{ color: "darkgrey" }}>{row.name}</span>
          </div>
        </th>
        <td className="search-crypto-item__td">
          {numberWithCommas(row?.current_price?.toFixed(2))}
          {"€"}
        </td>
        <td
          style={{
            color: profit && Number(profit) > 0 ? "rgb(14, 203, 129)" : "red",
          }}
          className="search-crypto-item__td-24h-changes"
        >
          {profit && "+"}
          {row.price_change_percentage_24h.toFixed(2)}%
        </td>
        <td className="search-crypto-item__td">
          {numberWithCommas(row?.market_cap?.toString().slice(0, -6))}
          {"€"} M
        </td>
        <td className="search-crypto-item__td z-index-99">
          <span className="p-10" onClick={(e) => handleClick(e, row)}>
            <FaStar className={`${favorited ? "color-gold" : ""}`} />
          </span>
        </td>
      </tr>
    </>
  );
}

export default SearchCryptoItem;
