import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";

function AdminRoute() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Admin />;
}

function App() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  useEffect(() => {
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
    localStorage.setItem("language", i18n.language);
  }, [i18n.language, isArabic]);

  const toggleLanguage = () => {
    i18n.changeLanguage(isArabic ? "en" : "ar");
  };

  return (
    <BrowserRouter>
      <div dir={isArabic ? "rtl" : "ltr"}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "15px 20px 0",
          }}
        >
          <button onClick={toggleLanguage}>{t("language")}</button>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admin" element={<AdminRoute />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
