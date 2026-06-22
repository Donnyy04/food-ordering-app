import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const { data } = await API.get("/orders/my-orders", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    setOrders(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Orders</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <h3>Order #{order._id.slice(-6)}</h3>

          <p>Status: {order.status}</p>

          <p>Total: {order.totalPrice} EGP</p>

          <p>Payment: {order.paymentMethod}</p>
        </div>
      ))}
    </div>
  );
}

export default Orders;