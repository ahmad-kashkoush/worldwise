import { NavLink } from "react-router-dom";
import style from "./PageNav.module.css";
import style2 from "./hamburgerMenu.module.css";
import Logo from "../Logo";
export default function PageNav() {
  return (
    <nav className={style.nav}>
       <Logo />
      <label htmlFor="ham-checkbox" className={style2.hamburgerMenu}>
        <input type="checkbox" id="ham-checkbox" />
      </label>
      <ul>
        <li>
          <NavLink to={"/pricing"}>Pricing</NavLink>
        </li>
        <li>
          <NavLink to={"/product"}>Product</NavLink>
        </li>
        <li>
          <NavLink to={"/login"} className="cta">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}
