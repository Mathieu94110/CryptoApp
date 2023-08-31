import { lazy } from "react";
import ErrorPage from "./pages/Error/Error";
import homeLoader from "./loaders/homeLoader";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

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

export const routesConfig = [
  {
    path: "/",
    element: (
      <>
        <Suspense>
          <NavBar />
          <Outlet />
        </Suspense>
      </>
    ),
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
];
