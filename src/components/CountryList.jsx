import { useCities } from "../contexts/CitiesContext";
import CountryItem from "./CountryItem";
import style from "./CountryList.module.css";
export default function CountryList() {
  // const x = new Set();
  // const derivedCountries = [];
  // countries.forEach((country) => {
  //   if (x.has(country.country)) return;
  //   x.add(country.country);
  //   derivedCountries.push(country);
  // });
  const { cities: countries } = useCities();

  const derivedCountries = countries.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, city];
    return arr;
  }, []);
  return (
    <ul className={style.countryList}>
      {derivedCountries.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
}
