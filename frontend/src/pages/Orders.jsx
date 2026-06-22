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
    <main className="page">
      <section className="page-heading">
        <span className="eyebrow">{t("brandTagline")}</span>
        <h1>{t("orders")}</h1>
      </section>

      {message && <p className="notice">{message}</p>}

      {orders.length === 0 && !message && (
        <div className="empty-state">{t("noOrders")}</div>
      )}

      <section className="order-grid">
        {orders.map((order) => (
          <article className="order-card" key={order._id}>
            <div className="card-header">
              <h3>{t("orderNumber", { id: order._id.slice(-6) })}</h3>
              <span className={`status status-${order.status.replaceAll(" ", "-").toLowerCase()}`}>
                {t(`statuses.${order.status}`)}
              </span>
            </div>

            <dl className="details-list">
              <div>
                <dt>{t("total")}</dt>
                <dd>{order.totalPrice} EGP</dd>
              </div>
              <div>
                <dt>{t("payment")}</dt>
                <dd>{t(`paymentMethods.${order.paymentMethod}`)}</dd>
              </div>
            </dl>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Orders;
