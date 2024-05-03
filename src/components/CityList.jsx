/* eslint-disable react/prop-types */
import CityItem from "./CityItem";
import style from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
// Hooks
export default function CityList() {
  const { cities, isLoading, isError } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message={"add your first city by clicking on the map"} />;
  if (isError) {
    // console.log(isError);
    return <Message message={isError} />;
  }
  return (
    <ul className={style.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}
