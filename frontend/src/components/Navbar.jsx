import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/useCart";

function Navbar() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const isArabic = i18n.language === "ar";
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const syncUser = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("authChange", syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("authChange", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(isArabic ? "en" : "ar");
  };

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        <span className="brand-mark">FB</span>
        <span>
          <strong>{t("brand")}</strong>
          <small>{t("brandTagline")}</small>
        </span>
      </Link>

      <nav className="nav-links" aria-label="Primary navigation">
        <NavLink to="/">{t("menu")}</NavLink>
        {!isAdmin && (
          <NavLink to="/cart">
            {t("cart")}
            <span className="nav-pill">{cartItems.length}</span>
          </NavLink>
        )}
        {!isAdmin && <NavLink to="/orders">{t("orders")}</NavLink>}
        {isAdmin && <NavLink to="/admin">{t("admin")}</NavLink>}
      </nav>

      <div className="nav-actions">
        <button className="btn btn-ghost" onClick={toggleLanguage}>
          {t("language")}
        </button>

        {user ? (
          <button className="btn btn-dark" onClick={logout}>
            {t("logout")}
          </button>
        ) : (
          <Link className="btn btn-dark" to="/login">
            {t("login")}
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
