import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import { Link, useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items, totals, clear } = useCart();
  const { placeOrder } = useOrder();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    // Place order and get ID
    const orderId = placeOrder({ items, totals });
    clear();
    // Navigate to order confirmation with orderId in URL
    navigate(`/order-confirmation/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 py-12 px-6 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Items / Order List */}
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl font-extrabold text-yellow-800 text-center lg:text-left">
            Checkout 🛒
          </h1>

          {items.length === 0 ? (
            <div className="text-center bg-white/50 backdrop-blur-md rounded-3xl shadow-2xl p-16 border border-yellow-200">
              <p className="text-gray-700 text-lg mb-6">Your cart is empty.</p>
              <Link
                to="/menu"
                className="inline-block px-10 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-full font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition transform duration-300"
              >
                Browse Menu 🍴
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-white/60 backdrop-blur-md rounded-2xl shadow-xl p-4 hover:shadow-2xl transition transform hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl border border-yellow-200"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                      <p className="text-yellow-700 text-sm">
                        Rs {item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-yellow-900 text-lg">
                    Rs {item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        {items.length > 0 && (
          <div className="lg:w-1/3 bg-white/60 backdrop-blur-md border border-yellow-200 rounded-3xl shadow-2xl p-8 flex flex-col justify-between sticky top-20 h-max">
            <h2 className="text-2xl font-bold text-yellow-900 mb-6">Order Summary</h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-gray-800 font-medium">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>Rs {item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-yellow-200 mt-6 pt-4 flex justify-between text-xl font-semibold text-gray-900">
              <span>Total:</span>
              <span>Rs {totals.amount}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="mt-6 w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-3 rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition transform duration-300"
            >
              Place Order 🚀
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
