import { useEffect } from "react";
import { useState } from "react";
import cities2 from "./../data/cities.json";
export function useCities() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        // const res = await fetch("http://localhost:9000/cities");
        // if (!res.ok) throw new Error("failed to fetch");
        // const data = await res.json();
        const data = cities2.cities;
        
        setCities(data);
        console.log(data);
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
  return { cities, isLoading, isError, handleDeleteCity };
}
