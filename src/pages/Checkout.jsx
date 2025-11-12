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
    const orderId = placeOrder({ items, totals });
    clear();
    navigate(`/track-order/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-[#FFE9E3] py-12 px-6 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Items / Order List */}
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl font-extrabold text-[#E94E1B] text-center lg:text-left">
            Checkout 🛒
          </h1>

          {items.length === 0 ? (
            <div className="text-center bg-white rounded-3xl shadow-lg border border-[#FF7A38] p-16 max-w-md mx-auto">
              <p className="text-gray-700 text-lg mb-6">Your cart is empty.</p>
              <Link
                to="/menu"
                className="inline-block px-10 py-3 bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
              >
                Browse Menu 🍴
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-white rounded-3xl shadow-md border border-[#FF7A38] p-4 hover:shadow-lg transition-transform hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl border border-[#FF7A38]"
                    />
                    <div>
                      <h3 className="font-semibold text-[#E94E1B] text-lg">{item.name}</h3>
                      <p className="text-[#FF7A38] text-sm">
                        Rs {item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-[#E94E1B] text-lg">
                    Rs {item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        {items.length > 0 && (
          <div className="lg:w-1/3 bg-white rounded-3xl shadow-lg border border-[#FF7A38] p-8 flex flex-col justify-between sticky top-20 h-max">
            <h2 className="text-2xl font-bold text-[#E94E1B] mb-6">Order Summary</h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-[#E94E1B] font-medium">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>Rs {item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#FF7A38] mt-6 pt-4 flex justify-between text-xl font-semibold text-[#E94E1B]">
              <span>Total:</span>
              <span>Rs {totals.amount}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="mt-6 w-full bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white py-3 rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 transition"
            >
              Place Order 🚀
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
