import style from "./Button.module.css";

export default function Button({ children, type, onClick }) {
  return <button onClick={onClick} className={`${style[type]} ${style.btn}`}>{children}</button>;
}
