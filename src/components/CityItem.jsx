import { Link } from "react-router-dom";
import style from "./CityItem.module.css";
export const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function CityItem({ city, onDeleteCity }) {
  const {
    cityName: name,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = city;
  return (
    <li>
      <Link className={style.cityItem} to={`cities/${id}?lat=${lat}&lng=${lng}`}>
        <span className={style.emoji}>{emoji}</span>
        <span className={style.name}>{name}</span>
        <span className={style.date}>{formatDate(date)}</span>
        <button
          onClick={(e) => {
            e.preventDefault();
            onDeleteCity(city.id);
          }}
          className={style.deleteBtn}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}
