import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import PricingPage from "./pages/PricingPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import CityList from "./components/CityList.jsx";

import { CitiesProvider } from "./contexts/CitiesContext.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
// import PageNav from "./components/PageNav";
function App() {
  return (
    <CitiesProvider>
      {/* <PageNav /> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate  to={"cities"}/>}/>
            <Route index path="cities" element={<CityList />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
