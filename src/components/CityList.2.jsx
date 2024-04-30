import CityItem from "./CityItem";
import style from "./CityList.module.css";
import { useCities } from "../contexts/CitiesContext";


export default function CityList() {
    const { cities, isLoading, isError } = useCities();

    return (
        <ul className={style.cityList}>
            {!isLoading && isError && <Error message={isError} />}
            {isLoading && !isError && <Loader />}
            {!isLoading &&
                !isError &&
                cities.map((city) => <CityItem key={city.id} city={city} />)}
        </ul>
    );
}


export default function Error({ message }) {
    return (
        <p>{message}</p>
    );
}
