import PageNav from "../components/PageNavComponent/PageNav";
import { Link } from "react-router-dom";
import style from "./HomePage.module.css";
export default function HomePage() {
  return (
    <main className={style.homePage}>
      <PageNav />
      <section>
        <h1>You travel the world. WorldWise keeps track of your adventures.</h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link to="/login" className="cta">
          Start Tracking Now
        </Link>
      </section>
    </main>
  );
}
