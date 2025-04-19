import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { MarketData } from "src/models/coins";
import "./Favorites.scss";
import FavoriteCard from "./Components/FavoritesCard/FavoriteCard";

export default function Favorites(): JSX.Element {
  const favorites = useSelector(
    (state: RootState) => state.favoritesList.favoritesItems
  );

  return (
    <div className="favorites">
      <h1 className="favorites__title"> Vos favoris </h1>
      <hr />
      {favorites.length > 0 ? (
        <div className="favorites__list">
          {favorites.map((favorite: MarketData, index: number) => {
            return (
              <FavoriteCard favorite={favorite} key={index} />
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
