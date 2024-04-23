/* eslint-disable react/prop-types */
import CityItem from "./CityItem";
import style from "./CityList.module.css";
import Error from "./Error";
import Spinner from "./Spinner";
import Message from "./Message";
// Hooks
export default function CityList({ cities, isLoading, isError, onDeleteCity }) {
  
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message={"add your first city by clicking on the map"} />;
  if (isError) return <Error message={isError} />;
  return (
    <ul className={style.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city}  onDeleteCity={onDeleteCity}/>
      ))}
    </ul>
  );
}
