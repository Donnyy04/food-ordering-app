import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";
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
    <div style={{ padding: "20px" }}>
      <h2>{t("cartCheckout")}</h2>

      {cartItems.length === 0 && <p>{t("emptyCart")}</p>}

      {cartItems.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <h3>{isArabic ? item.name_ar : item.name_en}</h3>
          <p>
            {item.quantity} x {item.price} EGP
          </p>
          <button onClick={() => removeFromCart(item._id)}>
            {t("remove")}
          </button>
        </div>
      ))}

      <h3>
        {t("total")}: {total} EGP
      </h3>

      {cartItems.length > 0 && (
        <>
          <h3>{t("paymentMethod")}</h3>

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

          <br />
          <br />

          <button onClick={placeOrder}>{t("placeOrder")}</button>
        </>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default Cart;
