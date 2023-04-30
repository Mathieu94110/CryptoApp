import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { CoinMarket } from "../../types/coins.interface";
import "./Favorites.scss";

export default function Favorites() {
  // const favorites = useSelector(
  //   (state: RootState) => state.favoritesList.favoritesItems
  // );
  // const navigate = useNavigate();
  // favorites?.length ? (
  //   favorites.map((favorite: CoinMarket) => {
  //     <div className="favorites">
  //       <div className="favorites__recipe">
  //         <div className="favorites__imageContainer">
  //           <img
  //             data-cy="recipe-img"
  //             src={favorite.image}
  //             alt={favorite.name}
  //             onClick={() => navigate(`/Details/${favorite.id}`)}
  //           />
  //         </div>
  //         <div className="favorites__recipeContent">
  //           <h3 className="text-center" data-cy="favorites__recipe-stDrink">
  //             {favorite.name}
  //           </h3>
  //           <FaTrash />
  //         </div>
  //       </div>
  //     </div>;
  //   })
  // ) : (
  //   <h2>Vous n'avez pas enregistré de favoris</h2>
  // );
  return <div>Favoris</div>;
}
