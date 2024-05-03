import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchParameters] = useSearchParams();

  const [lat, lng] = [
    searchParameters.get("lat"),
    searchParameters.get("lng")
    ];

  return [lat, lng];
}
