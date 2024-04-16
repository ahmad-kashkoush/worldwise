import { NavLink } from "react-router-dom";
import style from "./PageNav.module.css";
export default function PageNav() {
  return (
    <nav className={style.nav}>
      <p className={style.logo}>Twitter Logo</p>
      <ul>
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/profile"}>Profile</NavLink>
        </li>
        <li>
          <NavLink to={"/"}>Search</NavLink>
        </li>
      </ul>
    </nav>
  );
}
