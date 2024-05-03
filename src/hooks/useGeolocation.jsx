import { useState } from "react";

/**
 * @return {Object} Object containing position, isLoading state, error message, and getCurrentPosition function
 */
export function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [position, setPosition] = useState(defaultPosition);

  function getCurrentPosition() {
    if (!navigator.geolocation)
      return setError("browser doesn't support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { position, isLoading, error, getCurrentPosition };
}
