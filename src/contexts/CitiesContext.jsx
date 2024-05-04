import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:9000";
const CitiesContext = createContext();
const initialState = {
  cities: [],
  isLoading: false,
  error: "",
  currentCity: {},
  citiesUpdated: false,
};
function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "cities/loaded":
      return {
        ...state,
        cities: payload,
        isLoading: false,
        citiesUpdated: true,
      };
    case "cities/added":
      return {
        ...state,
        cities: [...state.cities, payload],
        currentCity: payload,
        isLoading: false,
        citiesUpdated: false,
      };
    case "cities/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== payload),
        currentCity: state.currentCity.id === payload ? {} : state.currentCity,
        isLoading: false,
        citiesUpdated: false,
      };
    case "currentCity/loaded":
      return {
        ...state,
        currentCity: payload,
        isLoading: false,
      };
    case "loading":
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case "rejected":
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, error, currentCity, citiesUpdated }, dispatch] =
    useReducer(reducer, initialState);
  useEffect(() => {
    async function fetchCitiesData() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error("failed to fetch");
        const data = await res.json();

        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "rejected", payload: "error fetching cities" });
      }
    }
    fetchCitiesData();
  }, [citiesUpdated]);

  async function handleDeleteCity(id) {
    dispatch({ type: "cities/deleted", payload: id });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return data;
    } catch (err) {
      dispatch({ type: "rejected", payload: "error deleting city" });
    }
  }
  async function handleAddCity(city) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });
      const data = await res.json();

      dispatch({ type: "cities/added", payload: data });
      return data;
    } catch (err) {
      dispatch({ type: "rejected", payload: "error adding city" });
    }
  }
  async function getCurrentCity(id) {
    if (currentCity && currentCity.id === id) return;
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`);

      if (!res.ok) throw new Error("failed to fetch");
      const data = await res.json();

      if (!data) throw new Error("City Not found");
      dispatch({ type: "currentCity/loaded", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "error loading current active city",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        handleAddCity,
        isLoading,
        error,
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
