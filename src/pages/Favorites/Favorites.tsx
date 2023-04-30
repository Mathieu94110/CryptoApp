import { FaSearchPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { CoinMarket } from "../../types/coins.interface";
import { switchFavorite } from "../../store/reducers/favoritesSlice";
import "./Favorites.scss";

export default function Favorites() {
  const favorites = useSelector(
    (state: RootState) => state.favoritesList.favoritesItems
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (favorite: CoinMarket) => {
    dispatch(switchFavorite(favorite));
  };

  return (
    <div className="favorites">
      <h1 className="favorites__title"> Vos favoris </h1>
      <hr />
      {favorites.length > 0 ? (
        <div className="d-flex flex-wrap justify-content-center">
          {favorites.map((favorite: CoinMarket, index: number) => {
            let profit =
              favorite?.price_change_percentage_24h >= 0
                ? favorite?.price_change_percentage_24h
                : "";
            return (
              <div className="favorites__container" key={index}>
                <div className="favorites__content">
                  <div className="favorites__image-container">
                    <img
                      src={favorite.image}
                      alt={favorite.name}
                      onClick={() => navigate(`/Details/${favorite.id}`)}
                    />
                  </div>
                  <div className="favorites__infos">
                    <h3 className="favorites__infos-item">
                      <span>Nom:</span> <span>{favorite.name}</span>
                    </h3>
                    <h3 className="favorites__infos-item">
                      <span>Symbole:</span> <span>{favorite.symbol}</span>
                    </h3>
                    <h3 className="favorites__infos-item">
                      <span>Prix:</span>{" "}
                      <span>{favorite?.current_price?.toFixed(2)} €</span>
                    </h3>
                    <h3 className="favorites__infos-item">
                      <span>Évolution sur 24h:</span>{" "}
                      <span
                        style={{
                          color:
                            profit && Number(profit) > 0
                              ? "rgb(14, 203, 129)"
                              : "red",
                        }}
                      >
                        {favorite.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    </h3>
                  </div>
                  <div className="favorites__buttons">
                    <FaSearchPlus
                      className="favorites__icon"
                      onClick={() => navigate(`/Details/${favorite.id}`)}
                    />
                    <FaTrash
                      className="favorites__icon"
                      onClick={() => handleClick(favorite)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="full-size content-center">
          <h2>Vous n'avez pas enregistré de favoris</h2>
        </div>
      )}
    </div>
  );
}
