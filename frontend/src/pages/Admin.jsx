import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import API from "../services/api";

const ORDER_STATUSES = [
  "Pending",
  "Preparing",
  "Out for Delivery",
  "Delivered",
];

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return {
    Authorization: `Bearer ${user.token}`,
  };
};

function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get("/orders", {
          headers: getAuthHeaders(),
        });

        setOrders(data);
      } catch (error) {
        setMessage(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      const { data } = await API.put(
        `/orders/${orderId}/status`,
        { status },
        {
          headers: getAuthHeaders(),
        }
      );

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId ? { ...order, status: data.status } : order
        )
      );
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    }
  };

  if (loading) {
    return (
      <main className="page">
        <div className="empty-state">{t("loadingOrders")}</div>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="page-heading">
        <span className="eyebrow">{t("admin")}</span>
        <h1>{t("adminOrders")}</h1>
        <p>{t("adminSubtitle")}</p>
      </section>

      {message && <p className="notice">{message}</p>}

      {orders.length === 0 && <div className="empty-state">{t("noOrders")}</div>}

      <section className="admin-list">
        {orders.map((order) => (
          <article className="admin-card" key={order._id}>
            <div>
              <h3>{t("orderNumber", { id: order._id.slice(-6) })}</h3>
              <p>
                {t("customer")}: {order.user?.name || order.user?.email}
              </p>
            </div>

            <div className="admin-meta">
              <span>{order.totalPrice} EGP</span>
              <span>{t(`paymentMethods.${order.paymentMethod}`)}</span>
            </div>

            <label className="field compact">
              <span>{t("changeStatus")}</span>
              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
              >
                {ORDER_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {t(`statuses.${status}`)}
                  </option>
                ))}
              </select>
            </label>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Admin;
