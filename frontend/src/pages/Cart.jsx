import { useState } from "react";
import { useCart } from "../context/CartContext";
import API from "../services/api";

function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [message, setMessage] = useState("");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.token) {
      setMessage("Please login first to place an order.");
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
    setMessage("Order placed successfully!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cart / Checkout</h2>

      {cartItems.length === 0 && <p>Your cart is empty.</p>}

      {cartItems.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <h3>{item.name_en}</h3>
          <p>
            {item.quantity} × {item.price} EGP
          </p>
          <button onClick={() => removeFromCart(item._id)}>Remove</button>
        </div>
      ))}

      <h3>Total: {total} EGP</h3>

      {cartItems.length > 0 && (
        <>
          <h3>Payment Method</h3>

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option>Cash on Delivery</option>
            <option>Online Payment</option>
          </select>

          <br />
          <br />

          <button onClick={placeOrder}>Place Order</button>
        </>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default Cart;