import { createContext, useContext, useEffect, useReducer } from "react";
const FAKE_USER = {
  name: "Kashkoush",
  email: "kashkoush@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthed: false,
};

function store(key, newObject) {
  localStorage.setItem(key, JSON.stringify(newObject));
  return newObject;
}

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "init":
      return { ...state, ...payload };
    case "login":
      return store("storedState", {
        ...state,
        user: payload,
        isAuthed: true,
      });

    case "logout":
      return store("storedState", {
        ...state,
        user: null,
        isAuthed: false,
      });
  }
}
function AuthProvider({ children }) {
  const [{ user, isAuthed }, dispatch] = useReducer(reducer, initialState);
  useEffect(function () {
    const storedUser = localStorage.getItem("storedState");
    console.log(JSON.parse(storedUser));
    if (!storedUser) return;
    dispatch({ type: "init", payload: JSON.parse(storedUser) });
  }, []);
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
      return true;
    } else return false;
  }
  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthed,
        user,
        login,
        logout,
        FAKE_USER,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}
export { AuthProvider, useAuth };
