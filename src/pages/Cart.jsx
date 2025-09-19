import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";

export default function Cart() {
  const { items, setQuantity, removeItem, totals, clear } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-white to-yellow-100 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-800 mb-12 text-center">
          🛒 Your <span className="text-yellow-500">Cart</span>
        </h2>

        {items.length === 0 ? (
          <div className="text-center bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-12 border border-yellow-100">
            <p className="text-gray-700 text-lg mb-6">Your cart is empty.</p>
            <Link
              to="/menu"
              className="inline-block px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
            >
              Browse Menu 🍴
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center bg-white/70 backdrop-blur-md border border-yellow-100 rounded-2xl p-5 shadow-lg hover:shadow-yellow-200 hover:-translate-y-1 transition"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-xl mr-5 border border-yellow-200 shadow-sm"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-yellow-700 font-medium">Rs {item.price}</p>
                    <div className="flex items-center mt-3">
                      <div className="flex items-center border border-yellow-400 rounded-lg overflow-hidden shadow-sm">
                        <button
                          onClick={() => setQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 bg-yellow-200 hover:bg-yellow-300 transition"
                        >
                          -
                        </button>
                        <span className="px-5 text-gray-900 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 bg-yellow-200 hover:bg-yellow-300 transition"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-5 text-red-500 hover:text-red-700 font-medium transition"
                      >
                        ✕ Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-yellow-900">
                      Rs {item.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white/80 backdrop-blur-md border border-yellow-100 rounded-2xl shadow-2xl p-8 hover:shadow-yellow-200 transition">
              <h3 className="text-2xl font-bold text-yellow-900 mb-6">Order Summary</h3>
              <div className="flex justify-between text-gray-700 mb-3">
                <span>Total Items</span>
                <span className="font-medium">{totals.count}</span>
              </div>
              <div className="flex justify-between text-gray-700 mb-6 border-b border-yellow-100 pb-3">
                <span>Total Price</span>
                <span className="text-xl font-extrabold text-yellow-600">Rs {totals.amount}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                disabled={items.length === 0}
                className={`w-full py-3 rounded-full font-bold shadow-md mb-4 transition ${
                  items.length === 0
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:shadow-lg hover:scale-105"
                }`}
              >
                Proceed to Checkout 🚀
              </button>

              <button
                onClick={clear}
                className="w-full bg-white border border-yellow-400 text-yellow-700 py-3 rounded-full hover:bg-yellow-50 transition font-medium shadow-sm"
              >
                Clear Cart
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                * This is a demo checkout. Backend/payment integration coming soon.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
