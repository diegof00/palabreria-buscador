import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/searchForm">Diccionario</Link>
        </li>
        <li>
          <Link to="/ruleta">Juego de Ruleta</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
