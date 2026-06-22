import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user?.token) {
        setMessage(t("loginFirst"));
        return;
      }

      try {
        const { data } = await API.get("/orders/my-orders", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setOrders(data);
      } catch (error) {
        setMessage(error.response?.data?.message || error.message);
      }
    };

    fetchOrders();
  }, [t]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>{t("orders")}</h2>

      {message && <p>{message}</p>}

      {orders.length === 0 && !message && <p>{t("noOrders")}</p>}

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <h3>{t("orderNumber", { id: order._id.slice(-6) })}</h3>

          <p>
            {t("status")}: {t(`statuses.${order.status}`)}
          </p>

          <p>
            {t("total")}: {order.totalPrice} EGP
          </p>

          <p>
            {t("payment")}:{" "}
            {t(`paymentMethods.${order.paymentMethod}`)}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Orders;
