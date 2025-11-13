import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";

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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm mx-4 text-center border border-[#FF7A38]">
        <h3 className="text-xl font-bold text-[#E94E1B] mb-4">Remove Item</h3>
        <p className="mb-6 text-gray-700">
          Are you sure you want to remove{" "}
          <span className="font-semibold">{name}</span> from your cart?
        </p>
        <div className="flex justify-center gap-6">
          <button
            onClick={() => {
              removeItem(id);
              setRemoveConfirmId(null);
              setMessage(`Removed "${name}" from cart.`);
            }}
            className="bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition"
          >
            Yes, Remove
          </button>
          <button
            onClick={() => setRemoveConfirmId(null)}
            className="border-2 border-[#FF7A38] text-[#FF7A38] px-6 py-2 rounded-full font-semibold hover:bg-[#FF7A38] hover:text-white transition"
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
    <div className="min-h-screen bg-[#FFE9E3] py-12 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#E94E1B] mb-8 text-center">
          🛒 Your <span className="text-[#FF7A38]">Cart</span>
        </h2>

        {message && (
          <div className="max-w-md mx-auto mb-6 px-6 py-3 rounded-full bg-green-100 text-green-800 font-semibold text-center shadow-md">
            {message}
          </div>
        )}

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg border border-[#FF7A38] p-12 text-center max-w-md mx-auto font-sans">
            <p className="text-gray-700 text-lg mb-6">Your cart is empty.</p>
            <Link
              to="/menu"
              className="inline-block px-8 py-3 bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
            >
              Browse Menu 🍴
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-6 font-sans">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center bg-white rounded-3xl shadow-md border border-[#FF7A38] p-5 hover:shadow-lg transition-transform hover:-translate-y-1"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-full mr-6 border border-[#FF7A38] shadow-lg transition-transform duration-300 transform hover:scale-105"
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-[#E94E1B]">{item.name}</h3>
                    <p className="text-[#FF7A38] font-bold mt-1 text-lg">
                      Rs {item.price.toFixed(2)} each
                    </p>

                    <div className="mt-4 flex items-center space-x-4">
                      <label
                        htmlFor={`qty-${item.id}`}
                        className="text-base font-semibold text-gray-700 select-none"
                      >
                        Qty:
                      </label>

                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="px-3 py-1 text-[#FF7A38] font-bold text-xl hover:bg-[#FF7A38] hover:text-white transition"
                        >
                          −
                        </button>

                        <input
                          id={`qty-${item.id}`}
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (val > 0) handleQuantityChange(item.id, val);
                          }}
                          className="w-20 text-center py-1 focus:outline-none"
                          aria-label={`Quantity of ${item.name}`}
                        />

                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                          className="px-3 py-1 text-[#FF7A38] font-bold text-xl hover:bg-[#FF7A38] hover:text-white transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setRemoveConfirmId(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                    className="ml-6 text-red-600 hover:text-red-800 transition text-3xl font-bold"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

            {/* Summary Panel */}
            <div className="bg-white rounded-3xl shadow-md border border-[#FF7A38] p-8 flex flex-col justify-between sticky top-20 h-max">
              <div>
                <h3 className="text-3xl font-extrabold text-[#E94E1B] mb-8 text-center lg:text-left">
                  Order Summary
                </h3>

                <div className="flex justify-between text-lg font-semibold text-gray-700 mb-3">
                  <span>Total Items:</span>
                  <span>{totals.count}</span>
                </div>

                <div className="flex justify-between text-2xl font-bold text-[#FF7A38] mb-6">
                  <span>Total Price:</span>
                  <span>Rs {totals.amount.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleCheckout}
                  disabled={items.length === 0}
                  className={`w-full text-white font-bold py-3 rounded-full transition ${
                    items.length === 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] hover:shadow-lg hover:scale-105"
                  }`}
                  aria-label="Proceed to checkout"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => clear()}
                  className="w-full border-2 border-[#FF7A38] text-[#FF7A38] font-semibold py-3 rounded-full hover:bg-[#FF7A38] hover:text-white transition"
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
