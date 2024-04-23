import CityItem from "./CityItem";
import style from "./CityList.module.css";
import { useState } from "react";
import { useCities } from "./useCities";

export default function CityList() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState("");
    const { cities } = useCities(setIsLoading, setIsError);

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
