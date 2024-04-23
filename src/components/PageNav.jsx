import { NavLink } from "react-router-dom";

export default function PageNav() {
  return (
    <header>
      <div className="logo"></div>
      <ul className="nav">
        <li>
          <NavLink to={"/"}>HomePage</NavLink>
        </li>
        <li>
          <NavLink to={"/product"}>Product</NavLink>
        </li>
        <li>
          <NavLink to={"/pricing"}>Pricing</NavLink>
        </li>
      </ul>
    </header>
  );
}
