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
import { useEffect, useState } from "react";
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

function Form() {
  const [lat, lng] = useUrlPosition();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const { handleAddCity, isLoading } = useCities();
  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState("");
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsGeoLoading(true);
        setGeoError("Start by clicking on the map");
        if (!(lat && lng)) return;
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        if (!res.ok) throw new Error("not able to fetch");
        const data = await res.json();
        if (!data.countryCode || !data.city)
          throw new Error("Not a City, click somewhere else");
        setCountry(data.countryName);
        setCityName(data.city);
        setDate(new Date());
        setEmoji(convertToEmoji(data.countryCode));
        setGeoError("");
      } catch (err) {
        setGeoError(err.message);
      } finally {
        setIsGeoLoading(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
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
  if (geoError) {
    return <Message message={geoError} />;
  }
  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">cityName</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <ReactDatePicker
          id="date"
          selected={date}
          onSelect={(dte) => setDate(dte)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
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
