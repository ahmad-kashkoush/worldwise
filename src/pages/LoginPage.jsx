import PageNav from "./../components/PageNavComponent/PageNav";
import "./../index.css";

import LoginForm from "../components/LoginForm";
export default function LoginPage() {
  return (
    <main className="main">
      <PageNav />
      <LoginForm />
    </main>
  );
}
