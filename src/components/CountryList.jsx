import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import CountryItem from "./CountryItem";
import style from "./CountryList.module.css";
export default function CountryList() {

  const { cities } = useCities();

  const [countries, setCountries] = useState([]);
  useEffect(() => {
    setCountries(
      cities.reduce((arr, city) => {
        if (!arr.map((el) => el.country).includes(city.country))
          return [...arr, city];
        return arr;
      }, [])
    );
  }, [cities]);
  return (
    <ul className={style.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
}
