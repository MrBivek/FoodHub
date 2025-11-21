// pages/OrderTracking.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Package, 
  Clock, 
  MapPin, 
  Phone, 
  User, 
  CheckCircle,
  Truck,
  ChefHat,
  Home
} from "lucide-react";
import API from "../utils/API";

const steps = [
  { key: "pending", label: "Order Placed", icon: Package },
  { key: "preparing", label: "Preparing", icon: ChefHat },
  { key: "on the way", label: "On the Way", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle },
];

const statusToIndex = {
  pending: 0,
  preparing: 1,
  "on the way": 2,
  delivered: 3,
};

export default function OrderTracking() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    let mounted = true;
    
    async function load() {
      try {
        setLoading(true);
        const res = await API.get(`/orders/${id}`);
        if (mounted) {
          const orderData = res.data.data || res.data;
          setOrder(orderData);
          setErr("");
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
    
    load();
    
    // Auto-refresh every 30 seconds if order is not delivered
    const interval = setInterval(() => {
      if (order && order.status !== "delivered" && order.status !== "cancelled") {
        load();
        setRefreshCount(prev => prev + 1);
      }
    }, 30000);
    
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [id, refreshCount]);

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
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-red-400 p-12 text-center max-w-md">
          <Package className="w-24 h-24 text-red-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-[#E94E1B] mb-4">Order Not Found</h2>
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

  const stepIndex = statusToIndex[order.status] ?? 0;
  const progressPercent = (stepIndex / (steps.length - 1)) * 100;
  const isDelivered = order.status === "delivered";
  const isCancelled = order.status === "cancelled";

  const estimatedTime = order.tracking?.estimatedDelivery 
    ? new Date(order.tracking.estimatedDelivery).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    : "30 minutes";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF1EB] via-[#FFE9E3] to-[#FFD6C2] py-16 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-[#E94E1B] mb-4 flex items-center justify-center gap-3">
            <MapPin className="w-12 h-12" />
            Track Your Order
          </h1>
          <p className="text-gray-700 text-lg">
            Real-time updates on your delicious food
          </p>
        </div>

        {/* Order Info Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 mb-8 border-2 border-[#FF7A38]">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#FF7A38] to-[#E94E1B] p-3 rounded-full">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="font-bold text-[#E94E1B]">#{order._id.slice(-8)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#FF7A38] to-[#E94E1B] p-3 rounded-full">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Placed At</p>
                <p className="font-bold text-gray-900">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#FF7A38] to-[#E94E1B] p-3 rounded-full">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  {isDelivered ? "Delivered" : "Estimated Delivery"}
                </p>
                <p className="font-bold text-[#FF7A38]">
                  {isDelivered ? "Completed" : estimatedTime}
                </p>
              </div>
            </div>
          </div>

          {/* Current Status Alert */}
          {!isCancelled && (
            <div className={`p-4 rounded-xl border-2 ${
              isDelivered 
                ? "bg-green-50 border-green-300" 
                : "bg-orange-50 border-orange-300"
            }`}>
              <p className="text-center font-semibold text-gray-800">
                {order.tracking?.statusHistory?.slice(-1)[0]?.message || 
                 `Your order is ${order.status}`}
              </p>
              {order.tracking?.currentLocation && (
                <p className="text-center text-sm text-gray-600 mt-1">
                  📍 {order.tracking.currentLocation}
                </p>
              )}
            </div>
          )}

          {isCancelled && (
            <div className="p-4 rounded-xl border-2 bg-red-50 border-red-300">
              <p className="text-center font-semibold text-red-700">
                ❌ This order has been cancelled
              </p>
              {order.cancellationReason && (
                <p className="text-center text-sm text-red-600 mt-1">
                  Reason: {order.cancellationReason}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Progress Tracker */}
        {!isCancelled && (
          <div className="bg-white rounded-3xl shadow-2xl p-10 mb-8 border-2 border-[#FF7A38]">
            <h2 className="text-2xl font-bold text-[#E94E1B] mb-8 text-center">
              Order Progress
            </h2>

            <div className="relative mb-16">
              {/* Progress Bar Background */}
              <div className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 bg-gray-200 rounded-full"></div>
              
              {/* Progress Bar Fill */}
              <div
                className="absolute top-1/2 left-0 h-2 -translate-y-1/2 bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] rounded-full transition-all duration-1000 ease-out shadow-lg"
                style={{ width: `${progressPercent}%` }}
              ></div>

              {/* Steps */}
              <div className="flex justify-between relative z-10">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  const isActive = idx <= stepIndex;
                  const isCurrent = idx === stepIndex;
                  
                  return (
                    <div 
                      key={step.key} 
                      className="flex flex-col items-center w-24 md:w-32"
                    >
                      <div
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-bold transition-all duration-500 shadow-lg ${
                          isActive
                            ? "bg-gradient-to-br from-[#FF7A38] to-[#E94E1B] text-white scale-110"
                            : "bg-gray-200 text-gray-400"
                        } ${isCurrent ? "animate-pulse ring-4 ring-[#FF7A38]/30" : ""}`}
                      >
                        <Icon className="w-8 h-8" />
                      </div>
                      <span
                        className={`mt-3 text-sm md:text-base font-semibold text-center transition-colors duration-300 ${
                          isActive ? "text-[#E94E1B]" : "text-gray-400"
                        }`}
                      >
                        {step.label}
                      </span>
                      {isActive && (
                        <span className="mt-1 text-xs text-[#FF7A38] font-medium">
                          {isCurrent ? "In Progress" : "✓ Complete"}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Status History */}
            {order.tracking?.statusHistory && order.tracking.statusHistory.length > 0 && (
              <div className="mt-8 pt-8 border-t-2 border-gray-200">
                <h3 className="text-lg font-bold text-[#E94E1B] mb-4">Status History</h3>
                <div className="space-y-3">
                  {order.tracking.statusHistory.slice().reverse().map((history, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-[#FF7A38] mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 capitalize">{history.status}</p>
                        <p className="text-sm text-gray-600">{history.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(history.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Driver Info */}
        {order.tracking?.driverInfo && order.status === "on the way" && (
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-2 border-[#FF7A38]">
            <h2 className="text-2xl font-bold text-[#E94E1B] mb-6 flex items-center gap-2">
              <Truck className="w-7 h-7" />
              Driver Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <User className="w-10 h-10 text-[#FF7A38]" />
                <div>
                  <p className="text-sm text-gray-600">Driver Name</p>
                  <p className="font-bold text-gray-900">{order.tracking.driverInfo.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-10 h-10 text-[#FF7A38]" />
                <div>
                  <p className="text-sm text-gray-600">Contact</p>
                  <a 
                    href={`tel:${order.tracking.driverInfo.phone}`}
                    className="font-bold text-[#FF7A38] hover:underline"
                  >
                    {order.tracking.driverInfo.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delivery Address */}
        {order.deliveryAddress && (
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-2 border-[#FF7A38]">
            <h2 className="text-2xl font-bold text-[#E94E1B] mb-6 flex items-center gap-2">
              <Home className="w-7 h-7" />
              Delivery Address
            </h2>
            <div className="text-gray-700 space-y-2 text-lg">
              <p>{order.deliveryAddress.street}</p>
              <p>{order.deliveryAddress.city}, {order.deliveryAddress.postalCode}</p>
              <p>{order.deliveryAddress.country}</p>
            </div>
          </div>
        )}

        {/* Order Items */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-2 border-[#FF7A38]">
          <h2 className="text-2xl font-bold text-[#E94E1B] mb-6">Order Items</h2>
          <div className="space-y-4">
            {order.items && order.items.length > 0 ? (
              order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 hover:shadow-lg transition border border-[#FF7A38]"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image || item.img || "https://via.placeholder.com/100x100.png?text=Food"}
                      alt={item.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-[#FF7A38] shadow-md"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/100x100.png?text=Food";
                      }}
                    />
                    <div>
                      <span className="font-bold text-gray-900 text-lg block">
                        {item.name}
                      </span>
                      <p className="text-gray-600">
                        Quantity: <span className="font-semibold">{item.quantity}</span>
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-[#FF7A38] text-xl">
                    Rs {((item.priceAtOrder || item.price || 0) * (item.quantity || 1)).toFixed(2)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center py-4">No items found</p>
            )}
          </div>

          {/* Total */}
          <div className="border-t-2 border-[#FF7A38] mt-6 pt-6 flex justify-between items-center">
            <span className="text-2xl font-bold text-[#E94E1B]">Total:</span>
            <span className="text-3xl font-extrabold text-[#FF7A38]">
              Rs {(order.totalAmount || 0).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/menu"
            className="bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition text-center"
          >
            🍴 Order More Food
          </Link>
          <Link
            to="/profile"
            className="border-2 border-[#FF7A38] text-[#FF7A38] px-8 py-4 rounded-full font-bold hover:bg-[#FF7A38] hover:text-white transition text-center"
          >
            📋 View Order History
          </Link>
        </div>
      </div>
    </div>
  );
}