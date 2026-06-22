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
    return <p style={{ padding: "20px" }}>{t("loadingOrders")}</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{t("adminOrders")}</h2>

      {message && <p>{message}</p>}

      {orders.length === 0 && <p>{t("noOrders")}</p>}

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
            {t("customer")}: {order.user?.name || order.user?.email}
          </p>

          <p>
            {t("total")}: {order.totalPrice} EGP
          </p>

          <p>
            {t("payment")}:{" "}
            {t(`paymentMethods.${order.paymentMethod}`)}
          </p>

          <label>
            {t("changeStatus")}{" "}
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
        </div>
      ))}
    </div>
  );
}

export default Admin;
