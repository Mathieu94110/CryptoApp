import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import ErrorPage from "./pages/PageNotFound/PageNotFound";
import homeLoader from "./loaders/homeLoader";
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
const PageNotFound = lazy(() => import("./pages/PageNotFound/PageNotFound"));

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
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
];
