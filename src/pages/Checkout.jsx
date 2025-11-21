// pages/Checkout.jsx
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

    // Validate address
    if (!address.street || !address.city || !address.postalCode) {
      setErr("Please fill in all address fields");
      return;
    }

    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      setErr("Please login to place an order");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    // Build backend-friendly payload
    const payload = {
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity || 1,
        price: item.price,
      })),
      totalAmount: totals.amount,
      deliveryAddress: address,
    };

    console.log("Placing order:", payload); // Debug log

    try {
      setLoading(true);
      setErr("");
      
      const res = await API.post("/orders", payload);
      const order = res.data;
      
      console.log("Order placed:", order); // Debug log
      
      // Clear cart and navigate to confirmation
      clear();
      
      // Use setTimeout to ensure cart is cleared before navigation
      setTimeout(() => {
        navigate(`/order-confirmation/${order._id || order.id}`);
      }, 100);
      
    } catch (error) {
      console.error("Place order error:", error);
      
      // Don't clear token on order placement errors
      const errorMsg = error?.response?.data?.message || "Failed to place order. Please try again.";
      setErr(errorMsg);
      
      // If it's an auth error, redirect to login
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
      <div className="min-h-screen bg-[#FFE9E3] py-12 px-6 font-sans flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl border border-[#FF7A38] p-12 text-center max-w-md">
          <h1 className="text-3xl font-extrabold text-[#E94E1B] mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-700 mb-8">
            Add some delicious items to your cart before checking out!
          </p>
          <Link
            to="/menu"
            className="inline-block bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF1EB] via-[#FFE9E3] to-[#FFD6C2] py-12 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-[#E94E1B] mb-8 text-center">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Delivery Address Form */}
          <div className="bg-white rounded-3xl shadow-xl border border-[#FF7A38] p-8">
            <h2 className="text-2xl font-bold text-[#E94E1B] mb-6">
              Delivery Address
            </h2>

            {err && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
                {err}
              </div>
            )}

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-[#E94E1B] font-semibold mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  value={address.street}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF7A38]"
                  placeholder="123 Main Street"
                  required
                />
              </div>

              <div>
                <label className="block text-[#E94E1B] font-semibold mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF7A38]"
                  placeholder="Kathmandu"
                  required
                />
              </div>

              <div>
                <label className="block text-[#E94E1B] font-semibold mb-2">
                  Postal Code *
                </label>
                <input
                  type="text"
                  value={address.postalCode}
                  onChange={(e) =>
                    setAddress({ ...address, postalCode: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF7A38]"
                  placeholder="44600"
                  required
                />
              </div>

              <div>
                <label className="block text-[#E94E1B] font-semibold mb-2">
                  Country
                </label>
                <input
                  type="text"
                  value={address.country}
                  onChange={(e) =>
                    setAddress({ ...address, country: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF7A38]"
                  placeholder="Nepal"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full text-white font-bold py-4 rounded-full transition shadow-lg mt-6 ${
                  loading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] hover:shadow-2xl hover:scale-105"
                }`}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-3xl shadow-xl border border-[#FF7A38] p-8 h-max sticky top-20">
            <h2 className="text-2xl font-bold text-[#E94E1B] mb-6">
              Order Summary
            </h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center pb-4 border-b border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#FF7A38]"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/100x100.png?text=Food";
                      }}
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity || 1}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-[#FF7A38]">
                    Rs {(item.price * (item.quantity || 1)).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t-2 border-[#FF7A38]">
              <div className="flex justify-between text-lg font-semibold text-gray-700">
                <span>Total Items:</span>
                <span>{totals.count}</span>
              </div>

              <div className="flex justify-between text-2xl font-bold text-[#FF7A38]">
                <span>Total Price:</span>
                <span>Rs {totals.amount.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
              <p className="text-sm text-gray-700">
                🚚 Estimated delivery: <strong>30 minutes</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}