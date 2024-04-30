import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
// import cities2 from "../data/cities.json";
const BASE_URL = "http://localhost:9000";
const CitiesContext = createContext();
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error("failed to fetch");
        const data = await res.json();
        // const data = cities2.cities;

        setCities(data);
        // console.log(data);
      } catch (err) {
        setIsError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  function handleDeleteCity(id) {
    setCities((cities) => cities.filter((city) => city.id !== id));
  }

  function getCurrentCity(id) {
    (async function () {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        // console.log(res);
        if (!res.ok) throw new Error("failed to fetch");
        const data = await res.json();
        // const data = cities.find((city) => city.id === id);
        if (!data) throw new Error("City Not found");
        // console.log(data);
        setCurrentCity(data);
      } catch (err) {
        setIsError(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }

  // return { cities, isLoading, isError, handleDeleteCity };
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        isError,
        currentCity,
        onDeleteCity: handleDeleteCity,
        getCurrentCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  return context;
}

export { CitiesProvider, useCities };
