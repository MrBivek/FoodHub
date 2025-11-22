import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/API";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { items, totals, clear } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
    country: "Nepal",
  });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!items || items.length === 0) {
      setErr("Cart is empty");
      return;
    }

    if (!address.street || !address.city || !address.postalCode) {
      setErr("Please fill in all required address fields");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setErr("Please login to place an order");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    const payload = {
      items: items.map(({ id, name, quantity = 1, price, img, image }) => ({
        id,
        name,
        quantity,
        price,
        image: img || image || "",
      })),
      totalAmount: totals.amount,
      deliveryAddress: address,
    };

    try {
      setLoading(true);
      setErr("");

      const res = await API.post("/orders", payload);
      const order = res.data.data || res.data;
      const orderId = order._id || order.id;

      if (!orderId) {
        throw new Error("No order ID received");
      }

      clear();
      navigate(`/order-confirmation/${orderId}`);
    } catch (error) {
      console.error("Order placement error:", error);

      const errorMsg =
        error?.response?.data?.message ||
        error.message ||
        "Failed to place order. Please try again.";
      setErr(errorMsg);

      if (error?.response?.status === 401) {
        setTimeout(() => {
          navigate("/login", { state: { from: "/checkout" } });
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12 px-6 font-sans flex items-center justify-center">
        <section
          aria-label="Empty cart message"
          className="bg-white rounded-3xl shadow-xl border border-red-500 p-12 text-center max-w-md"
        >
          <h1 className="text-3xl font-extrabold text-red-500 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-700 mb-8">
            Add some delicious items to your cart before checking out!
          </p>
          <Link
            to="/menu"
            className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition"
          >
            Browse Menu
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-red-500 mb-8 text-center">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Delivery Address Form */}
          <section
            aria-labelledby="delivery-address-heading"
            className="bg-white rounded-3xl shadow-xl border border-red-500 p-8"
          >
            <h2
              id="delivery-address-heading"
              className="text-2xl font-bold text-red-500 mb-6"
            >
              Delivery Address
            </h2>

            {err && (
              <div
                role="alert"
                className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center"
              >
                {err}
              </div>
            )}

            <form onSubmit={handlePlaceOrder} className="space-y-4" noValidate>
              <div>
                <label
                  htmlFor="street"
                  className="block text-red-500 font-semibold mb-2"
                >
                  Street Address *
                </label>
                <input
                  id="street"
                  name="street"
                  type="text"
                  value={address.street}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="123 Main Street"
                  required
                  aria-required="true"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-red-500 font-semibold mb-2"
                >
                  City *
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Kathmandu"
                  required
                  aria-required="true"
                />
              </div>

              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-red-500 font-semibold mb-2"
                >
                  Postal Code *
                </label>
                <input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  value={address.postalCode}
                  onChange={(e) =>
                    setAddress({ ...address, postalCode: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="44600"
                  required
                  aria-required="true"
                />
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-red-500 font-semibold mb-2"
                >
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  value={address.country}
                  onChange={(e) =>
                    setAddress({ ...address, country: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Nepal"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full text-white font-bold py-4 rounded-full transition shadow-lg mt-6 ${
                  loading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-500 to-orange-500 hover:shadow-2xl hover:scale-105"
                }`}
                aria-busy={loading}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </section>

          {/* Order Summary */}
          <aside
            aria-labelledby="order-summary-heading"
            className="bg-white rounded-3xl shadow-xl border border-red-500 p-8 h-max sticky top-20"
          >
            <h2
              id="order-summary-heading"
              className="text-2xl font-bold text-red-500 mb-6"
            >
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              {items.map(({ id, img, image, name, quantity = 1, price }) => (
                <div
                  key={id}
                  className="flex justify-between items-center pb-4 border-b border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={img || image || "https://via.placeholder.com/100x100.png?text=Food"}
                      alt={name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-red-500"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/100x100.png?text=Food";
                      }}
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{name}</p>
                      <p className="text-sm text-gray-600">Qty: {quantity}</p>
                    </div>
                  </div>
                  <p className="font-bold text-orange-500">
                    Rs {(price * quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t-2 border-red-500">
              <div className="flex justify-between text-lg font-semibold text-gray-700">
                <span>Total Items:</span>
                <span>{totals.count}</span>
              </div>

              <div className="flex justify-between text-2xl font-bold text-red-500">
                <span>Total Price:</span>
                <span>Rs {totals.amount.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
              <p className="text-sm text-gray-700">
                🚚 Estimated delivery: <strong>30 minutes</strong>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
