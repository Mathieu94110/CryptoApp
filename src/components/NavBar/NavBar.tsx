import { useState } from "react";
import { FaBitcoin, FaBars, FaTimes } from "react-icons/fa";
import "./NavBar.scss";
import { NavBarData } from "./NavBarData";
import { useLocation } from "react-router-dom";

function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();

  // The current location.
  console.log("Prout =", location);
  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <nav className="nav-bar-items">
      <h1 className="logo">
        <span>CryptoApplication</span> <FaBitcoin />
      </h1>
      <div onClick={handleClick} className="menu-icons">
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
        {NavBarData.map((item, index) => {
          return (
            location.pathname !== item.url && (
              <li key={index}>
                <a href={item.url} className={item.className}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </li>
            )
          );
        })}
      </ul>
    </nav>
  );
}

export default NavBar;
