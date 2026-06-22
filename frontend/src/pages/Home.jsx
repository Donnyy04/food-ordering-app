import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import API from "../services/api";
import { useCart } from "../context/useCart";

function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await API.get("/products");
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <main className="page">
      <section className="hero-panel">
        <div>
          <span className="eyebrow">{t("brandTagline")}</span>
          <h1>{t("menu")}</h1>
          <p>{t("menuSubtitle")}</p>
        </div>
      </section>

      <section className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product._id}>
            <div className="product-image-wrap">
              <img
                src={product.image}
                alt={isArabic ? product.name_ar : product.name_en}
              />
            </div>

            <div className="product-content">
              <h3>{isArabic ? product.name_ar : product.name_en}</h3>
              <div className="product-footer">
                <span className="price">{product.price} EGP</span>
                {!isAdmin && (
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCart(product)}
                  >
                    {t("addToCart")}
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Home;
