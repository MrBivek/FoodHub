import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";

export default function Cart() {
  const { items, setQuantity, removeItem, totals, clear } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFE9E3] py-12 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#E94E1B] mb-12 text-center">
          🛒 Your <span className="text-[#FF7A38]">Cart</span>
        </h2>

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
                    className="w-28 h-28 object-cover rounded-xl mr-5 border border-[#FF7A38] shadow-sm"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[#E94E1B]">{item.name}</h3>
                    <p className="text-[#FF7A38] font-semibold mt-1">Rs {item.price}</p>
                    <div className="flex items-center mt-3">
                      <div className="flex items-center border border-[#FF7A38] rounded-lg overflow-hidden shadow-sm">
                        <button
                          onClick={() => setQuantity(item.id, Math.max(item.quantity - 1, 1))}
                          className="px-3 py-1 bg-[#FFE0D6] hover:bg-[#FFBFA0] transition font-bold text-[#E94E1B]"
                        >
                          -
                        </button>
                        <span className="px-5 text-[#E94E1B] font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 bg-[#FFE0D6] hover:bg-[#FFBFA0] transition font-bold text-[#E94E1B]"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-5 text-red-600 hover:text-red-800 font-semibold transition"
                      >
                        ✕ Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right text-[#E94E1B] font-extrabold text-lg">
                    Rs {item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-3xl shadow-lg border border-[#FF7A38] p-8 hover:shadow-xl transition font-sans">
              <h3 className="text-2xl font-bold text-[#E94E1B] mb-6">Order Summary</h3>
              <div className="flex justify-between text-[#E94E1B] mb-3">
                <span>Total Items</span>
                <span className="font-semibold">{totals.count}</span>
              </div>
              <div className="flex justify-between text-[#E94E1B] mb-6 border-b border-[#FF7A38] pb-3">
                <span>Total Price</span>
                <span className="text-xl font-extrabold">Rs {totals.amount}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                disabled={items.length === 0}
                className={`w-full py-3 rounded-full font-bold mb-4 transition ${
                  items.length === 0
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white hover:shadow-lg hover:scale-105"
                }`}
              >
                Proceed to Checkout 🚀
              </button>

              <button
                onClick={clear}
                className="w-full bg-white border border-[#FF7A38] text-[#FF7A38] py-3 rounded-full hover:bg-[#FFE6DA] transition font-semibold shadow-sm"
              >
                Clear Cart
              </button>

              <p className="text-xs text-[#E94E1B] mt-4 text-center">
                * This is a demo checkout. Backend/payment integration coming soon.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
