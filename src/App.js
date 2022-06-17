import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import DDAlerts from "./components/DDAlerts/DDAlerts";
import Test from "./components/Test";
import Test0 from "./components/Test0";
import { AlertContext } from "./Contexts/AlertContext";
import AllRestaurants from "./pages/AllRestuarants/AllRestaurants";
import Cart from "./pages/Cart/Cart";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Restaurant from "./pages/Restaurant/Restaurant";
import SignUp from "./pages/SignUp/SignUp";

const App = () => {
  const [alerts, setAlerts] = useState([]);
  const [user, setUser] = useState({
    id: -1,
    username: "",
    email: "",
    roles: [],
    tokenType: "Bearer",
  });
  return (
    <AlertContext.Provider value={{ alerts, setAlerts, user, setUser }}>
      {/* <DDAlerts /> */}

      <Routes>
        <Route exact path="/" element={<LandingPage />}></Route>
        <Route exact path="/restaurants" element={<AllRestaurants />}></Route>
        <Route exact path="/restaurant/:id" element={<Restaurant />}></Route>

        <Route
          exact
          path="/product/:restId/:id"
          element={<ProductDetail />}
        ></Route>
        <Route exact path="/cart" element={<Cart />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/signup" element={<SignUp />}></Route>
      </Routes>
    </AlertContext.Provider>
  );
};

export default App;
