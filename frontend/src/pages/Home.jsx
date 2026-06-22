import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import API from "../services/api";
import { useCart } from "../context/CartContext";

function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart, cartItems } = useCart();
  const { t, i18n } = useTranslation();
  const user = JSON.parse(localStorage.getItem("user"));
  const isArabic = i18n.language === "ar";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await API.get("/products");
    setProducts(data);
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div
      style={{
        padding: "20px",
        direction: isArabic ? "rtl" : "ltr",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <h2>{t("menu")}</h2>

        <div
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Link to="/cart">
            {t("cart")} ({cartItems.length})
          </Link>

          <Link to="/orders">{t("orders")}</Link>

          {user?.role === "admin" && (
            <Link to="/admin">{t("admin")}</Link>
          )}

          <Link to="/login">{t("login")}</Link>

          {user && <button onClick={logout}>{t("logout")}</button>}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <img
              src={product.image}
              alt={isArabic ? product.name_ar : product.name_en}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
              }}
            />

            <h3>{isArabic ? product.name_ar : product.name_en}</h3>

            <p>{product.price} EGP</p>

            <button onClick={() => addToCart(product)}>
              {t("addToCart")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
