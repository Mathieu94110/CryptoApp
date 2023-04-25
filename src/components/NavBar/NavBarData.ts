import { FaHome, FaStar, FaTrophy, FaAward, FaSearch } from "react-icons/fa";

export const NavBarData = [
  { title: "Accueil", url: "/", className: "nav-links", icon: FaHome },
  { title: "Top 100", url: "/Top_100", className: "nav-links", icon: FaAward },
  {
    title: "Gagnants et perdants",
    url: "/Gagnants_et_perdants",
    className: "nav-links",
    icon: FaTrophy,
  },
  {
    title: "Rechercher",
    url: "/Rechercher",
    className: "nav-links",
    icon: FaSearch,
  },
  { title: "Favoris", url: "/Favoris", className: "nav-links", icon: FaStar },
];
