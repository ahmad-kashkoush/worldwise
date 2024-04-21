import PageNav from "../components/PageNavComponent/PageNav";
import style from "./PricingPage.module.css";
export default function ProductPage() {
  return (
    <main className={`${style.pricingPage} main`}>
      <PageNav />

      <section className={style.mainSection}>
        <img src="img-2.jpg" className={style.image}></img>
        <div className="content-wrapper">
          <h2>About WorldWide.</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
            dicta illum vero culpa cum quaerat architecto sapiente eius non
            soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga
            perspiciatis? Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Corporis doloribus libero sunt expedita ratione iusto, magni,
            id sapiente sequi officiis et.
          </p>
        </div>
      </section>
    </main>
  );
}
