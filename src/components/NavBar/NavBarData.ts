import { FaHome, FaStar, FaTrophy, FaAward, FaSearch } from "react-icons/fa";

export const NavBarData = [
  { title: "Accueil", url: "/", className: "nav-links", icon: FaHome },
  {
    title: "Rechercher",
    url: "/Rechercher",
    className: "nav-links",
    icon: FaSearch,
  },
  {
    title: "Gagnants et perdants",
    url: "/Gagnants_et_perdants",
    className: "nav-links",
    icon: FaTrophy,
  },
  { title: "Favoris", url: "/Favoris", className: "nav-links", icon: FaStar },
];
