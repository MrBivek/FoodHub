import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";

export default function Cart() {
  const { items, setQuantity, removeItem, totals, clear } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

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

                    <div className="mt-3 flex items-center space-x-4">
                      <label htmlFor={`qty-${item.id}`} className="text-sm font-semibold text-gray-600 select-none">
                        Qty:
                      </label>
                      <input
                        id={`qty-${item.id}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          if (val > 0) setQuantity(item.id, val);
                        }}
                        className="w-16 px-2 py-1 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-orange-400"
                        aria-label={`Quantity of ${item.name}`}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                    className="ml-6 text-red-500 hover:text-red-700 transition text-xl font-bold"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

            {/* Summary Panel */}
            <div className="bg-white rounded-3xl shadow-md border border-[#FF7A38] p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-extrabold text-[#E94E1B] mb-6">Order Summary</h3>

                <div className="flex justify-between text-lg font-semibold text-gray-700 mb-2">
                  <span>Total Items:</span>
                  <span>{totals.count}</span>
                </div>

                <div className="flex justify-between text-xl font-bold text-[#FF7A38] mb-6">
                  <span>Total Price:</span>
                  <span>Rs {totals.amount.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white font-bold py-3 rounded-full hover:shadow-lg hover:scale-105 transition"
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
      </div>
    </div>
  );
}
