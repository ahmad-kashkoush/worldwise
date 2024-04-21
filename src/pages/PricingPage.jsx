import PageNav from "../components/PageNavComponent/PageNav";
import style from "./PricingPage.module.css";
import "./../index.css";
export default function PricingPage() {
  return (
    <main className={`${style.pricingPage} main`}>
      <PageNav />
      <section className={style.mainSection}>
        <div className="content-wrapper">
          <h2>Simple pricing,  Just $9/month.</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
            labore mollitia iusto. Recusandae quos provident, laboriosam fugit
            voluptatem iste.
          </p>
        </div>
        <img src="img-1.jpg" className={style.image}></img>
      </section>
    </main>
  );
}
