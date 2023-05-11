import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { CoinMarket } from "../../types/coins.interface";
import "./Favorites.scss";
import FavoriteCard from "./Components/FavoritesCard/FavoriteCard";

export default function Favorites() {
  const favorites = useSelector(
    (state: RootState) => state.favoritesList.favoritesItems
  );

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
              <FavoriteCard favorite={favorite} key={index} profit={profit} />
            );
          })}
        </div>
      ) : (
        <div className="favorites__empty">
          <h2>Vous n'avez pas enregistré de favoris</h2>
        </div>
      )}
    </div>
  );
}
