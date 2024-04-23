import { NavLink } from "react-router-dom";
import style from "./AppNav.module.css";

export default function AppNav() {
  return (
    <nav className={style.nav}>
      <ul>
        <li>
          <NavLink to="/app/countries">Countries</NavLink>
        </li>
        <li>
          <NavLink to="/app/cities">Cities</NavLink>
        </li>
      </ul>
    </nav>
  );
}
