import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaSearchPlus, FaTrash } from "react-icons/fa";
import { switchFavorite } from "@/store/reducers/favoritesSlice";
import { MarketData } from "src/models/coins";
import "./FavoriteCard.scss";
import CoinPrice from "src/common/CoinPrice/CoinPrice";

export default function FavoriteCard({
  favorite,
  key,
}: {
  favorite: MarketData;
  key: number;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (favorite: MarketData) => {
    dispatch(switchFavorite(favorite));
  };

  return (
    <div className="favorite-card" key={key}>
      <div className="favorite-card__content">
        <div className="favorite-card__img-container">
          <img
            src={favorite.image}
            alt={favorite.name}
            onClick={() => navigate(`/Details/${favorite.id}`)}
          />
        </div>
        <div className="favorite-card__infos">
          <h3 className="favorite-card__infos-item">
            <span>Nom</span> <span>{favorite.name}</span>
          </h3>
          <h3 className="favorite-card__infos-item">
            <span>Symbole</span> <span>{favorite.symbol}</span>
          </h3>
          <h3 className="favorite-card__infos-item">
            <span className="favorite-card__price-and-evolution"><span>Prix</span><span>Évolution sur 24h</span></span>
            <CoinPrice
              price={favorite.current_price ?? 0}
              change={favorite.price_change_percentage_24h}
            />
          </h3>
        </div>
        <div className="favorite-card__buttons">
          <FaSearchPlus
            className="favorite-card__icon"
            onClick={() => navigate(`/Details/${favorite.id}`)}
          />
          <FaTrash
            className="favorite-card__icon"
            onClick={() => handleClick(favorite)}
          />
        </div>
      </div>
    </div>
  );
}
