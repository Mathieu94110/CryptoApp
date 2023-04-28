import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import App from "./App";
import ErrorPage from "./pages/Error/Error";
import homeLoader from "./loaders/homeLoader";

const Homepage = lazy(() => import("./pages/Home/Home"));
const CoinDetailsPage = lazy(
  () => import("./pages/CryptoDetails/CryptoDetails")
);
const FavoritesPage = lazy(() => import("./pages/Favorites/Favorites"));
const SearchCryptoPage = lazy(
  () => import("./pages/SearchCrypto/SearchCrypto")
);
const WinnersAndLoosersPage = lazy(
  () => import("./pages/WinnersAndLoosers/WinnersAndLoosers")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        index: true,
        errorElement: <ErrorPage />,
        element: <Homepage />,
        loader: homeLoader,
      },
      {
        path: "Rechercher",
        element: <SearchCryptoPage />,
      },
      {
        path: "Details/:id",
        element: <CoinDetailsPage />,
      },
      {
        path: "Favoris",
        element: <FavoritesPage />,
      },
      {
        path: "Gagnants_et_perdants",
        element: <WinnersAndLoosersPage />,
      },
    ],
  },
]);
