import style from "./Logo.module.css";
import { NavLink } from "react-router-dom";

function Logo() {
  return <NavLink to={"/"} className={style.logo}></NavLink>;
}

export default Logo;
