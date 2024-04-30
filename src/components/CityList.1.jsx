import CityItem from "./CityItem";
import  Error  from "./Error.1";
import Spinner from "./Spinner";
// styles
import style from "./CityList.module.css";

// hooks
import { useCities } from "../contexts/CitiesContext";

export default function CityList() {
  const { cities, isLoading, isError } = useCities();

  return (
    <ul className={style.cityList}>
      {!isLoading && isError && <Error message={isError} />}
      {isLoading && !isError && <Spinner />}
      {!isLoading &&
        !isError &&
        cities.map((city) => <CityItem key={city.id} city={city} />)}
    </ul>
  );
}
