import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthinticationContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import { CitiesProvider } from "./contexts/CitiesContext.jsx";
import "./App.css";
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import { Suspense, lazy } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

// import HomePage from "./pages/HomePage";
// import PricingPage from "./pages/PricingPage.jsx";
// import ProductPage from "./pages/ProductPage.jsx";
// import LoginPage from "./pages/LoginPage.jsx";
// import AppLayout from "./pages/AppLayout.jsx";

const HomePage = lazy(() => import("./pages/HomePage"));
const PricingPage = lazy(() => import("./pages/PricingPage.jsx"));
const ProductPage = lazy(() => import("./pages/ProductPage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const AppLayout = lazy(() => import("./pages/AppLayout.jsx"));

// dist/assets/index-3fe8ae30.css   49.74 kB │ gzip:  11.99 kB
// dist/assets/index-1122cee5.js   738.16 kB │ gzip: 198.50 kB

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="product" element={<ProductPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<h1>Page not found</h1>} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
