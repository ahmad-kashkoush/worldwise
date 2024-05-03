import style from "./Button.module.css";

export default function Button({ children, type, buttonType = "", onClick }) {
  return (
    <button
      type={buttonType}
      onClick={onClick}
      className={`${style[type]} ${style.btn}`}
    >
      {children}
    </button>
  );
}
