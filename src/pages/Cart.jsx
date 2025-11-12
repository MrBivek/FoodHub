import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";

export default function Cart() {
  const { items, setQuantity, removeItem, totals, clear } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFE9E3] py-16 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-extrabold text-[#E94E1B] mb-16 text-center drop-shadow-md">
          🛒 Your <span className="text-[#FF7A38]">Cart</span>
        </h2>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl border border-[#FF7A38] p-16 text-center max-w-md mx-auto font-sans">
            <p className="text-gray-700 text-lg mb-8 font-medium">
              Your cart is empty.
            </p>
            <Link
              to="/menu"
              className="inline-block px-10 py-4 bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white rounded-full font-semibold shadow-lg hover:shadow-2xl hover:scale-110 transform transition duration-300"
            >
              Browse Menu 🍴
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-8 font-sans">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center bg-gradient-to-br from-white to-[#FFF3E6] rounded-3xl shadow-lg border border-[#FF7A38] p-6 hover:shadow-2xl transition-transform hover:-translate-y-2 duration-300"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-full mr-6 border-4 border-[#FF7A38] shadow-lg hover:scale-110 transform transition duration-300"
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-[#E94E1B] tracking-wide">
                      {item.name}
                    </h3>
                    <p className="text-[#FF7A38] font-semibold mt-2 text-lg">
                      Rs {item.price}
                    </p>
                    <div className="flex items-center mt-4 space-x-4">
                      <div className="flex items-center border border-[#FF7A38] rounded-lg overflow-hidden shadow-sm">
                        <button
                          onClick={() =>
                            setQuantity(item.id, Math.max(item.quantity - 1, 1))
                          }
                          className="px-4 py-2 bg-[#FFE0D6] hover:bg-[#FFBFA0] transition font-bold text-[#E94E1B] text-xl select-none"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>
                        <span className="px-6 text-[#E94E1B] font-semibold text-lg select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                          className="px-4 py-2 bg-[#FFE0D6] hover:bg-[#FFBFA0] transition font-bold text-[#E94E1B] text-xl select-none"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-6 text-[#E94E1B] hover:text-[#FF7A38] font-semibold transition underline underline-offset-2"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        Remove ✕
                      </button>
                    </div>
                  </div>
                  <div className="text-right text-[#E94E1B] font-extrabold text-2xl w-28 select-none">
                    Rs {(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-3xl shadow-2xl border border-[#FF7A38] p-10 hover:shadow-3xl transition font-sans flex flex-col justify-between">
              <h3 className="text-3xl font-bold text-[#E94E1B] mb-8 tracking-wide">
                Order Summary
              </h3>
              <div className="flex justify-between text-[#E94E1B] mb-5 text-lg">
                <span>Total Items</span>
                <span className="font-semibold text-xl">{totals.count}</span>
              </div>
              <div className="flex justify-between text-[#E94E1B] mb-8 border-b border-[#FF7A38] pb-5 text-xl font-extrabold">
                <span>Total Price</span>
                <span>Rs {totals.amount.toFixed(2)}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                disabled={items.length === 0}
                className={`w-full py-4 rounded-full font-bold mb-6 text-xl transition ${
                  items.length === 0
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white hover:shadow-2xl hover:scale-105 transform duration-300"
                }`}
              >
                Proceed to Checkout 🚀
              </button>

              <button
                onClick={clear}
                className="w-full bg-white border border-[#FF7A38] text-[#FF7A38] py-3 rounded-full hover:bg-[#FFE6DA] transition font-semibold shadow-md hover:shadow-lg"
              >
                Clear Cart
              </button>

              <p className="text-xs text-[#E94E1B] mt-6 text-center font-medium select-none">
                * This is a demo checkout. Backend/payment integration coming soon.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
