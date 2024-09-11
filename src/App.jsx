import Header from "./components/Header";
import Banner from "./components/Banner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./components/Product";
import FeaturedProduct from "./components/FeaturedProduct";
import TopSelling from "./components/TopSelling";
import Footer from "./components/Footer";
import Details from "./components/pages/Details";
import Cart from "./components/pages/Cart";
import Checkout from "./components/pages/Checkout";
import { EcomProvider } from "./context/EcomContext";
import Alert from "./components/Alert";
import Loaders from "./components/Loaders";
import { useEffect, useState } from "react";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { AuthProvider } from "./context/AuthContext";
import useLocalStorage from "./hooks/useLocalStorage";
import ThankYou from "./components/pages/ThankYou";

function App() {
  const { getItem } = useLocalStorage("auth-token");
  const token = getItem("auth-token");
  // const authInitalToken = { accessToken: token ?? token };
  const authInitalToken = { accessToken: token ?? null };
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 2000);

    return () => timer;
  }, []);
  return (
    <>
      {loader ? (
        <Loaders />
      ) : (
        <AuthProvider defaultState={authInitalToken}>
          <EcomProvider>
            <Router>
              <Header />
              <Alert />
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Banner />
                      <FeaturedProduct />
                      <TopSelling />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/product"
                  element={
                    <>
                      <Banner />
                      <Product />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/details/:id"
                  element={
                    <>
                      <Banner />
                      <Details />
                      <Footer />
                    </>
                  }
                />
                {/* <Route path="/details/:name" element={<Details />}  /> */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/thankyou" element={<ThankYou />} />
              </Routes>
              {/* <Footer/> */}
            </Router>
          </EcomProvider>
          </AuthProvider>
      )}
    </>
  );
}

export default App;
