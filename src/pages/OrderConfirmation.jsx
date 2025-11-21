// frontend/src/pages/OrderConfirmation.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, Package, Clock, MapPin } from "lucide-react";
import API from "../utils/API";

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;
    
    async function loadOrder() {
      if (!orderId) {
        if (mounted) {
          setErr("No order ID provided");
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        const res = await API.get(`/orders/${orderId}`);
        if (mounted) {
          setOrder(res.data);
        }
      } catch (e) {
        console.error("Load order error:", e);
        if (mounted) {
          setErr(e?.response?.data?.message || "Order not found");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }
    
    loadOrder();
    
    return () => {
      mounted = false;
    };
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF1EB] via-[#FFE9E3] to-[#FFD6C2]">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#FF7A38] border-t-transparent mb-4"></div>
        <p className="text-[#E94E1B] font-semibold text-lg">Loading order details...</p>
      </div>
    );
  }

  if (err || !order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF1EB] via-[#FFE9E3] to-[#FFD6C2] font-sans px-6 py-20">
        <div className="bg-white rounded-3xl shadow-xl border border-red-400 p-12 text-center max-w-md">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Order Not Found</h1>
          <p className="text-gray-700 mb-8">{err || "Unable to load order details"}</p>
          <Link
            to="/menu"
            className="inline-block bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  const orderIdDisplay = order._id || order.id;
  const createdAt = order.createdAt
    ? new Date(order.createdAt).toLocaleString()
    : "";
  const deliveryAddress = order.deliveryAddress || {};

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF1EB] via-[#FFE9E3] to-[#FFD6C2] font-sans px-6 py-20">
      <div className="max-w-5xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <CheckCircle className="w-24 h-24 text-[#FF7A38] mx-auto mb-6 animate-bounce" />
          <h1 className="text-5xl font-extrabold text-[#E94E1B] mb-4">
            Order Confirmed! 🎉
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            Thank you for your order!
          </p>
          <p className="text-lg text-[#FF7A38] font-semibold">
            Order ID: <span className="font-bold">{orderIdDisplay}</span>
          </p>
        </div>

        {/* Order Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Status Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-[#FF7A38] p-6 text-center">
            <Package className="w-12 h-12 text-[#FF7A38] mx-auto mb-3" />
            <h3 className="font-bold text-[#E94E1B] mb-2">Status</h3>
            <p className="text-gray-700 capitalize font-semibold">
              {order.status || "Pending"}
            </p>
          </div>

          {/* Time Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-[#FF7A38] p-6 text-center">
            <Clock className="w-12 h-12 text-[#FF7A38] mx-auto mb-3" />
            <h3 className="font-bold text-[#E94E1B] mb-2">Placed At</h3>
            <p className="text-gray-700 text-sm">{createdAt}</p>
          </div>

          {/* Delivery Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-[#FF7A38] p-6 text-center">
            <MapPin className="w-12 h-12 text-[#FF7A38] mx-auto mb-3" />
            <h3 className="font-bold text-[#E94E1B] mb-2">Estimated Time</h3>
            <p className="text-[#FF7A38] font-bold text-lg">30 minutes</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <Link
            to={`/track-order/${orderIdDisplay}`}
            className="bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition text-center"
          >
            📍 Track Your Order
          </Link>

          <Link
            to="/menu"
            className="border-2 border-[#FF7A38] text-[#FF7A38] px-8 py-4 rounded-full font-bold hover:bg-[#FF7A38] hover:text-white transition text-center"
          >
            🍴 Order More
          </Link>
        </div>

        {/* Delivery Address */}
        {deliveryAddress.street && (
          <div className="bg-white rounded-3xl shadow-lg border border-[#FF7A38] p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#E94E1B] mb-4 flex items-center gap-2">
              <MapPin className="w-6 h-6" />
              Delivery Address
            </h2>
            <div className="text-gray-700 space-y-1">
              <p>{deliveryAddress.street}</p>
              <p>
                {deliveryAddress.city}, {deliveryAddress.postalCode}
              </p>
              <p>{deliveryAddress.country}</p>
            </div>
          </div>
        )}

        {/* Order Items Summary */}
        <div className="bg-white rounded-3xl shadow-lg border border-[#FF7A38] p-8">
          <h2 className="text-3xl font-bold text-[#E94E1B] mb-6">
            Order Summary
          </h2>
          
          <div className="space-y-4">
            {order.items && order.items.length > 0 ? (
              order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-5 shadow-md border border-[#FF7A38]"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        item.image ||
                        item.img ||
                        "https://via.placeholder.com/100x100.png?text=Food"
                      }
                      alt={item.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-[#FF7A38] shadow-md"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/100x100.png?text=Food";
                      }}
                    />
                    <div>
                      <span className="font-bold text-gray-900 text-lg">
                        {item.name}
                      </span>
                      <p className="text-gray-600 text-sm">
                        Quantity: {item.quantity || 1}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-[#FF7A38] text-xl">
                    Rs{" "}
                    {(
                      (item.priceAtOrder || item.price || 0) *
                      (item.quantity || 1)
                    ).toFixed(2)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center py-4">No items found</p>
            )}
          </div>

          <div className="mt-8 pt-6 border-t-2 border-[#FF7A38] flex justify-between items-center">
            <span className="text-2xl font-bold text-[#E94E1B]">Total:</span>
            <span className="text-3xl font-extrabold text-[#FF7A38]">
              Rs {(order.totalAmount || 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}