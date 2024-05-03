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
  const [citiesUpdated, setCitiesUpdated] = useState(false);

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
        setCitiesUpdated(true);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [citiesUpdated]);

  async function handleDeleteCity(id) {
    setCities((cities) => cities.filter((city) => city.id !== id));
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // print the response from the server
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  }
  async function handleAddCity(city) {
    setCities((cities) => [...cities, { ...city }]);
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });
      const data = await res.json();
      setCitiesUpdated(false);
      setCurrentCity(data);
      return data;
    } catch (err) {
      setIsError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  // async function getCityByPosition(position = null) {
  //   if (!position) return;
  //   const { lat, lng } = position;
  //   try {
  //     setIsLoading(true);
  //     const res = await fetch(
  //       `${BASE_URL}/cities?position.lat=${lat}&position.lng=${lng}`
  //     );
  //     if (!res.ok) throw new Error("No Internet Connection, unable to fetch");
  //     const data = await res.json();
  //     if (!data) throw new Error("City Not found");
  //     setCurrentCity(data);
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }
  async function getCurrentCity(id) {
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
  }

  // return { cities, isLoading, isError, handleDeleteCity };
  return (
    <CitiesContext.Provider
      value={{
        cities,
        handleAddCity,
        isLoading,
        setIsLoading,
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
