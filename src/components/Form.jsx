import { Link } from "react-router-dom";
import style from "./Form.module.css";

export function Form() {
  return (
    <form className={style.form}>
      <label htmlFor="email">Email address</label>
      <input type="email" name="" id="email" />
      <label htmlFor="pass">Password</label>
      <input type="password" />
      <Link to="/" className="cta">
        Login
      </Link>
    </form>
  );
}
