import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import { Link, useNavigate } from "react-router-dom";
import { X, CreditCard, Clock } from "lucide-react";

export default function Checkout() {
  const { items, totals, clear, setQuantity, removeItem } = useCart();
  const { placeOrder } = useOrder();
  const navigate = useNavigate();

  const [orderNotes, setOrderNotes] = useState("");
  const [removeConfirmId, setRemoveConfirmId] = useState(null);

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    const orderId = placeOrder({ items, totals, notes: orderNotes });
    clear();
    navigate(`/order-confirmation/${orderId}`);
  };

  // Confirm remove modal
  const ConfirmRemoveModal = ({ id, name }) => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm mx-4 text-center border border-[#FF7A38]">
        <h3 className="text-xl font-bold text-[#E94E1B] mb-4">Remove Item</h3>
        <p className="mb-6 text-gray-700">
          Are you sure you want to remove{" "}
          <span className="font-semibold">{name}</span> from the cart?
        </p>
        <div className="flex justify-center gap-6">
          <button
            onClick={() => {
              removeItem(id);
              setRemoveConfirmId(null);
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

  return (
    <section className="font-sans bg-[#FFE9E3] min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-14">
        {/* Left Panel - Items + Notes */}
        <div className="flex-1 space-y-10">
          <h1 className="text-5xl font-extrabold text-[#E94E1B] mb-6 text-center lg:text-left">
            Checkout 🛒
          </h1>

          {items.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-lg border border-[#FF7A38] p-16 text-center max-w-md mx-auto">
              <p className="text-gray-700 text-lg mb-6">Your cart is empty.</p>
              <Link
                to="/menu"
                className="inline-block px-8 py-3 bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
              >
                Browse Menu 🍴
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-8">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center bg-white rounded-3xl shadow-md border border-[#FF7A38] p-5 hover:shadow-lg transition transform hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-8">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-32 h-32 object-cover rounded-xl border border-[#FF7A38] shadow-lg transition-transform duration-300 transform hover:scale-105"
                      />
                      <div className="min-w-[220px]">
                        <h3 className="font-semibold text-[#E94E1B] text-2xl">
                          {item.name}
                        </h3>
                        <p className="text-[#FF7A38] text-lg mt-1">
                          Rs {item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>

                    {/* Quantity Adjust */}
                    <div className="flex items-center space-x-3">
                      <button
                        aria-label={`Decrease quantity of ${item.name}`}
                        onClick={() =>
                          setQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="w-9 h-9 rounded-full border border-[#FF7A38] text-[#FF7A38] font-bold hover:bg-[#FF7A38] hover:text-white transition text-xl flex items-center justify-center"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          if (val > 0) setQuantity(item.id, val);
                        }}
                        className="w-20 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg py-1"
                        aria-label={`Quantity of ${item.name}`}
                      />
                      <button
                        aria-label={`Increase quantity of ${item.name}`}
                        onClick={() => setQuantity(item.id, item.quantity + 1)}
                        className="w-9 h-9 rounded-full border border-[#FF7A38] text-[#FF7A38] font-bold hover:bg-[#FF7A38] hover:text-white transition text-xl flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="font-bold text-[#E94E1B] text-xl min-w-[110px] text-right">
                      Rs {(item.price * item.quantity).toFixed(2)}
                    </div>

                    {/* Remove Button */}
                    <button
                      aria-label={`Remove ${item.name} from cart`}
                      onClick={() => setRemoveConfirmId(item.id)}
                      className="ml-6 text-red-600 hover:text-red-800 transition text-4xl font-bold"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Notes */}
              <div>
                <label
                  htmlFor="orderNotes"
                  className="block mb-2 font-semibold text-[#E94E1B] text-lg"
                >
                  Additional Instructions (optional)
                </label>
                <textarea
                  id="orderNotes"
                  rows={4}
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Add any special requests or notes here..."
                  className="w-full p-4 rounded-2xl border border-[#FF7A38] focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none text-gray-800 text-lg"
                />
              </div>
            </>
          )}
        </div>

        {/* Right Panel - Summary */}
        {items.length > 0 && (
          <aside className="lg:w-1/3 bg-white rounded-3xl shadow-lg border border-[#FF7A38] p-8 flex flex-col justify-between sticky top-20 h-max">
            <h2 className="text-3xl font-extrabold text-[#E94E1B] mb-8 text-center lg:text-left">
              Order Summary
            </h2>

            <div className="space-y-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-[#E94E1B] font-semibold text-lg"
                >
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>Rs {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#FF7A38] mt-8 pt-6 flex justify-between text-2xl font-extrabold text-[#E94E1B]">
              <span>Total:</span>
              <span>Rs {totals.amount.toFixed(2)}</span>
            </div>

            {/* Delivery estimate and payment */}
            <div className="mt-8 space-y-4 text-[#FF7A38]">
              <div className="flex items-center gap-3 text-lg font-semibold">
                <Clock className="w-6 h-6" />
                <span>Estimated Delivery: 30 - 45 minutes</span>
              </div>
              <div className="flex items-center gap-3 text-lg font-semibold">
                <CreditCard className="w-6 h-6" />
                <span>Secure Payment Options Available</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={items.length === 0}
              className={`mt-10 w-full py-4 rounded-full font-extrabold shadow-md transition transform duration-300
                ${
                  items.length === 0
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white hover:shadow-lg hover:scale-105"
                }
              `}
              aria-label="Place your order"
            >
              Place Order 🚀
            </button>
          </aside>
        )}

        {removeConfirmId && (
          <ConfirmRemoveModal
            id={removeConfirmId}
            name={items.find((i) => i.id === removeConfirmId)?.name || ""}
          />
        )}
      </div>
    </section>
  );
}
