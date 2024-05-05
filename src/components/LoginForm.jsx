import { useNavigate } from "react-router-dom";
import style from "./LoginForm.module.css";
import Button from "./Button";
import { useAuth } from "../contexts/AuthinticationContext";
import { useEffect, useState } from "react";

export default function LoginForm() {
  const { login, isAuthed, FAKE_USER } = useAuth();
  const [newEmail, setNewEmail] = useState(FAKE_USER.email);
  const [newPassword, setNewPassword] = useState(FAKE_USER.password);
  const [isValid, setValid] = useState(true);
  const navigate = useNavigate();
  function handleSubmit(e, isDemo = false) {
    e.preventDefault();
    if (isDemo) login(FAKE_USER.email, FAKE_USER.password);
    else setValid(login(newEmail, newPassword));
  }
  useEffect(() => {
    if (isAuthed) {
      setValid(true);
      navigate("/app", { replace: true });
    }
  }, [isAuthed, navigate]);

  return (
    <>
      <form onSubmit={handleSubmit} className={style.form}>
        <h2>Correct Email: {FAKE_USER.email} </h2>
        <h2>Correct Email: {FAKE_USER.password} </h2>
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          value={newEmail}
          required
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <label htmlFor="pass">Password</label>
        <input
          type="password"
          value={newPassword}
          required
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <p className={style.notValid}>
          {!isValid ? "wrong email or password" : ""}
        </p>
        <Button type="primary" buttonType="submit">
          Login
        </Button>
        <Button type="primary" onClick={(e) => handleSubmit(e, true)}>
          Login with demo
        </Button>
      </form>
    </>
  );
}
