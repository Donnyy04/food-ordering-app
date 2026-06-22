import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import "./App.css";

function AdminRoute() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Admin />;
}

function CartRoute() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Cart />;
}

function OrdersRoute() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Orders />;
}

function App() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  useEffect(() => {
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
    localStorage.setItem("language", i18n.language);
  }, [i18n.language, isArabic]);

  return (
    <BrowserRouter>
      <div className="app-shell" dir={isArabic ? "rtl" : "ltr"}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartRoute />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<OrdersRoute />} />
          <Route path="/admin" element={<AdminRoute />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
