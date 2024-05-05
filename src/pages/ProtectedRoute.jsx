import { useEffect } from "react";
import { useAuth } from "../contexts/AuthinticationContext";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuthed } = useAuth();
  const navigate = useNavigate();
//   console.log(`isAuthed: ${isAuthed}`);
  useEffect(
    function () {
      let storedIsAuthed = localStorage.getItem("storedState");
      if (storedIsAuthed) storedIsAuthed = JSON.parse(storedIsAuthed).isAuthed;
      if (storedIsAuthed || isAuthed) return;
      navigate("/");
    },
    [isAuthed]
  );
  return isAuthed ? children : null;
}
