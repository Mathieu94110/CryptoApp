import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaSearchPlus, FaTrash } from "react-icons/fa";
import { switchFavorite } from "../../../../store/reducers/favoritesSlice";
import { CoinMarket } from "../../../../types/coins.interface";
import "./FavoriteCard.scss";

export default function FavoriteCard({
  favorite,
  key,
  profit,
}: {
  favorite: CoinMarket;
  key: number;
  profit: string | number;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (favorite: CoinMarket) => {
    dispatch(switchFavorite(favorite));
  };

  return (
    <div className="favorite-card" key={key}>
      <div className="favorite-card__content">
        <div className="favorite-card__image-container">
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
            <span>Prix</span>{" "}
            <span>{favorite?.current_price?.toFixed(2)} €</span>
          </h3>
          <h3 className="favorite-card__infos-item">
            <span>Évolution sur 24h</span>{" "}
            <span
              style={{
                color:
                  profit && Number(profit) > 0 ? "rgb(14, 203, 129)" : "red",
              }}
            >
              {favorite.price_change_percentage_24h.toFixed(2)}%
            </span>
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
