// frontend/src/pages/Cart.jsx
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingCart, Trash2 } from "lucide-react";

export default function Cart() {
  const { items, setQuantity, removeItem, totals, clear } = useCart();
  const navigate = useNavigate();
  const [removeConfirmId, setRemoveConfirmId] = useState(null);
  const [message, setMessage] = useState("");

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

  const ConfirmRemoveModal = ({ id, name }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm mx-4 text-center border-2 border-[#FF7A38]">
        <Trash2 className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-[#E94E1B] mb-4">Remove Item?</h3>
        <p className="mb-6 text-gray-700">
          Are you sure you want to remove{" "}
          <span className="font-semibold text-[#FF7A38]">{name}</span> from your cart?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              removeItem(id);
              setRemoveConfirmId(null);
              setMessage(`Removed "${name}" from cart.`);
              setTimeout(() => setMessage(""), 3000);
            }}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition"
          >
            Yes, Remove
          </button>
          <button
            onClick={() => setRemoveConfirmId(null)}
            className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const handleQuantityChange = (id, val) => {
    if (val < 1) return;
    setQuantity(id, val);
    setMessage("Quantity updated.");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF1EB] via-[#FFE9E3] to-[#FFD6C2] py-12 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#E94E1B] mb-2 text-center flex items-center justify-center gap-3">
          <ShoppingCart className="w-12 h-12" />
          Your Cart
        </h2>
        <p className="text-center text-gray-700 mb-8 text-lg">
          Review your items before checkout
        </p>

        {message && (
          <div className="max-w-md mx-auto mb-6 px-6 py-3 rounded-full bg-green-100 text-green-800 font-semibold text-center shadow-md animate-pulse">
            ✓ {message}
          </div>
        )}

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl border-2 border-[#FF7A38] p-12 text-center max-w-md mx-auto">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <p className="text-gray-700 text-xl mb-2 font-semibold">Your cart is empty</p>
            <p className="text-gray-600 mb-8">Start adding delicious items!</p>
            <Link
              to="/menu"
              className="inline-block px-10 py-4 bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition"
            >
              Browse Menu 🍴
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center bg-white rounded-3xl shadow-lg border-2 border-[#FF7A38] p-6 hover:shadow-2xl transition-all hover:-translate-y-1"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-full mr-6 border-4 border-[#FF7A38] shadow-lg"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150x150.png?text=Food";
                    }}
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#E94E1B] mb-2">{item.name}</h3>
                    <p className="text-[#FF7A38] font-bold text-xl mb-4">
                      Rs {item.price.toFixed(2)} each
                    </p>

                    <div className="flex items-center gap-3">
                      <label className="text-base font-semibold text-gray-700">
                        Quantity:
                      </label>

                      <div className="flex items-center border-2 border-[#FF7A38] rounded-full overflow-hidden shadow-md">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="px-4 py-2 text-[#FF7A38] font-bold text-xl hover:bg-[#FF7A38] hover:text-white transition"
                        >
                          −
                        </button>

                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (val > 0) handleQuantityChange(item.id, val);
                          }}
                          className="w-16 text-center py-2 font-bold text-lg focus:outline-none"
                          aria-label={`Quantity of ${item.name}`}
                        />

                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                          className="px-4 py-2 text-[#FF7A38] font-bold text-xl hover:bg-[#FF7A38] hover:text-white transition"
                        >
                          +
                        </button>
                      </div>

                      <p className="ml-auto text-xl font-bold text-[#FF7A38]">
                        Rs {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setRemoveConfirmId(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                    className="ml-6 text-red-600 hover:text-red-800 hover:scale-110 transition text-4xl font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Summary Panel */}
            <div className="bg-white rounded-3xl shadow-xl border-2 border-[#FF7A38] p-8 flex flex-col justify-between sticky top-20 h-max">
              <div>
                <h3 className="text-3xl font-extrabold text-[#E94E1B] mb-8 text-center">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-lg font-semibold text-gray-700 pb-3 border-b border-gray-200">
                    <span>Total Items:</span>
                    <span className="text-[#FF7A38]">{totals.count}</span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal:</span>
                    <span>Rs {totals.amount.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery:</span>
                    <span className="text-green-600 font-semibold">FREE</span>
                  </div>
                </div>

                <div className="flex justify-between text-2xl font-bold text-[#E94E1B] pt-4 border-t-2 border-[#FF7A38] mb-8">
                  <span>Total:</span>
                  <span className="text-[#FF7A38]">Rs {totals.amount.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleCheckout}
                  disabled={items.length === 0}
                  className={`w-full text-white font-bold py-4 rounded-full transition shadow-lg ${
                    items.length === 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] hover:shadow-2xl hover:scale-105"
                  }`}
                  aria-label="Proceed to checkout"
                >
                  Proceed to Checkout →
                </button>

                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to clear your cart?")) {
                      clear();
                      setMessage("Cart cleared");
                      setTimeout(() => setMessage(""), 3000);
                    }
                  }}
                  className="w-full border-2 border-red-500 text-red-500 font-semibold py-4 rounded-full hover:bg-red-500 hover:text-white transition"
                  aria-label="Clear cart"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {removeConfirmId && (
          <ConfirmRemoveModal
            id={removeConfirmId}
            name={items.find((i) => i.id === removeConfirmId)?.name || ""}
          />
        )}
      </div>
    </div>
  );
}