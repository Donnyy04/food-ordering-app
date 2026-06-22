import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/useCart";
import API from "../services/api";

const PAYMENT_METHODS = ["Cash on Delivery", "Online Payment"];

function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [message, setMessage] = useState("");
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.token) {
      setMessage(t("loginFirstOrder"));
      return;
    }

    const orderItems = cartItems.map((item) => ({
      product: item._id,
      name_en: item.name_en,
      name_ar: item.name_ar,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }));

    await API.post(
      "/orders",
      {
        items: orderItems,
        totalPrice: total,
        paymentMethod,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    clearCart();
    setMessage(t("orderPlaced"));
  };

  return (
    <main className="page">
      <section className="page-heading">
        <span className="eyebrow">{t("cart")}</span>
        <h1>{t("cartCheckout")}</h1>
        <p>{t("cartSubtitle")}</p>
      </section>

      <section className="checkout-layout">
        <div className="stack">
          {cartItems.length === 0 && (
            <div className="empty-state">{t("emptyCart")}</div>
          )}

          {cartItems.map((item) => (
            <article className="line-item" key={item._id}>
              <img src={item.image} alt={isArabic ? item.name_ar : item.name_en} />
              <div>
                <h3>{isArabic ? item.name_ar : item.name_en}</h3>
                <p>
                  {item.quantity} x {item.price} EGP
                </p>
              </div>
              <button
                className="btn btn-ghost danger"
                onClick={() => removeFromCart(item._id)}
              >
                {t("remove")}
              </button>
            </article>
          ))}
        </div>

        <aside className="summary-card">
          <h2>{t("total")}</h2>
          <strong>{total} EGP</strong>

          {cartItems.length > 0 && (
            <>
              <label className="field">
                <span>{t("paymentMethod")}</span>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  {PAYMENT_METHODS.map((method) => (
                    <option key={method} value={method}>
                      {t(`paymentMethods.${method}`)}
                    </option>
                  ))}
                </select>
              </label>

              <button className="btn btn-primary wide" onClick={placeOrder}>
                {t("placeOrder")}
              </button>
            </>
          )}

          {message && <p className="notice">{message}</p>}
        </aside>
      </section>
    </main>
  );
}

export default Cart;
