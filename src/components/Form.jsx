// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=37.42159&longitude=-122.0837

import ButtonBack from "./ButtonBack";
import Button from "./Button";
import Spinner from "./Spinner";
import Message from "./Message";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// styles
import styles from "./Form.module.css";
// hooks
import { useEffect, useReducer } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const initialState = {
  cityName: "",
  country: "",
  date: new Date(),
  notes: "",
  emoji: "",
  isGeoLoading: false,
  geoError: "",
};
function reducer(prev, action) {
  const { payload, type } = action;
  switch (type) {
    case "city/loading":
      return {
        ...prev,
        isGeoLoading: true,
        geoError: "Start by clicking on the map",
      };
    case "city/loaded":
      return {
        ...prev,
        cityName: payload.city,
        country: payload.countryName,
        date: new Date(),
        emoji: convertToEmoji(payload.countryCode),
        geoError: "",
        isGeoLoading: false,
      };
    case "setCity":
      return { ...prev, cityName: payload };
    case "setDate":
      return { ...prev, date: payload };
    case "setNotes":
      return { ...prev, notes: payload };
    case "rejected":
      return { ...prev, geoError: payload };
  }
}
function Form() {
  const [lat, lng] = useUrlPosition();
  const navigate = useNavigate();
  const [
    { cityName, country, date, notes, emoji, isGeoLoading, geoError },
    dispatch,
  ] = useReducer(reducer, initialState);
  const { handleAddCity, isLoading } = useCities();
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  useEffect(() => {
    async function fetchCityData() {
      try {
        dispatch({ type: "city/loading" });
        if (!(lat && lng)) return;
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        if (!res.ok) throw new Error("not able to fetch");
        const data = await res.json();
        if (!data.countryCode || !data.city)
          throw new Error("Not a City, click somewhere else");
        dispatch({ type: "city/loading", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "error fetching city data by lat&lng",
        });
      }
    }
    fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(cityName, country);
    if (!(cityName && country)) return;
    await handleAddCity({
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat: +lat,
        lng: +lng,
      },
    });

    navigate(`/app`);
  }

  if (isGeoLoading) return <Spinner />;
  if (geoError) return <Message message={geoError} />;

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">cityName</label>
        <input
          id="cityName"
          onChange={(e) =>
            dispatch({ type: "setCity", payload: e.target.value })
          }
          value={cityName}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <ReactDatePicker
          id="date"
          selected={date}
          onSelect={(dte) => dispatch({ type: "setDate", payload: dte })}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) =>
            dispatch({ type: "setNotes", payload: e.target.value })
          }
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button onClick={handleSubmit} buttonType="submit" type="primary">
          Add
        </Button>
        <ButtonBack />
      </div>
    </form>
  );
}
export default Form;
