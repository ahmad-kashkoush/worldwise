import Map from "../components/Map";
import User from "../components/User";
import Sidebar from "./../components/Sidebar";
import style from "./AppLayout.module.css";
export default function AppLayout() {
  
  return (
    <main className={` ${style.app} main`}>
      <Sidebar />
      <Map />
      <User />
    </main>
  );
}
