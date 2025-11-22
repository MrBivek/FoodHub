import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  UtensilsCrossed, 
  ShoppingBag, 
  DollarSign,
  TrendingUp,
  CheckCircle
} from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import API from "../../utils/API";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalFoods: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    preparingOrders: 0,
    deliveredToday: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(amount);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const foodsRes = await API.get("/foods");
      const foods = foodsRes.data;

      const ordersRes = await API.get("/orders");
      const orders = ordersRes.data.data || ordersRes.data;

      const sortedOrders = [...orders].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
      const pendingOrders = orders.filter(o => o.status === "pending").length;
      const preparingOrders = orders.filter(o => o.status === "preparing").length;

      const today = new Date().setHours(0, 0, 0, 0);
      const deliveredToday = orders.filter(o => 
        o.status === "delivered" && 
        new Date(o.deliveredAt || o.updatedAt).setHours(0, 0, 0, 0) === today
      ).length;

      setStats({
        totalFoods: foods.length,
        totalOrders: orders.length,
        totalRevenue,
        pendingOrders,
        preparingOrders,
        deliveredToday
      });

      setRecentOrders(sortedOrders.slice(0, 5));
    } catch (err) {
      console.error("Dashboard load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = useMemo(() => [
    {
      title: "Total Food Items",
      value: stats.totalFoods,
      icon: UtensilsCrossed,
      color: "from-red-500 to-orange-500",
      link: "/admin/foods"
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: "from-red-500 to-orange-500",
      link: "/admin/orders"
    },
    {
      title: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      color: "from-red-500 to-orange-500",
      link: "/admin/orders"
    },
    {
      title: "Delivered Today",
      value: stats.deliveredToday,
      icon: CheckCircle,
      color: "from-red-500 to-orange-500",
      link: "/admin/orders"
    }
  ], [stats, formatCurrency]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <AdminSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-10">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-red-500 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-700 text-sm sm:text-lg">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {loading ? (
          <div
            className="flex justify-center items-center h-64"
            role="status"
            aria-live="polite"
            aria-busy={loading}
          >
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent"></div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {statCards.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Link
                    key={stat.title}
                    to={stat.link}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 overflow-hidden border-2 border-red-500"
                  >
                    <div className={`bg-gradient-to-r ${stat.color} p-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="p-4 sm:p-6">
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-2xl sm:text-3xl font-bold text-red-500">{stat.value}</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 border-2 border-red-500">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-red-500">Recent Orders</h2>
                <Link
                  to="/admin/orders"
                  className="text-red-500 hover:text-orange-500 font-semibold flex items-center gap-2 text-sm sm:text-base"
                >
                  View All
                  <TrendingUp className="w-5 h-5" />
                </Link>
              </div>

              {recentOrders.length === 0 ? (
                <p className="text-gray-600 text-center py-8">No orders yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
                      <tr>
                        <th scope="col" className="p-3 text-left text-sm rounded-tl-lg">Order ID</th>
                        <th scope="col" className="p-3 text-left text-sm">Customer</th>
                        <th scope="col" className="p-3 text-left text-sm">Amount</th>
                        <th scope="col" className="p-3 text-left text-sm">Status</th>
                        <th scope="col" className="p-3 text-left text-sm rounded-tr-lg">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order, idx) => (
                        <tr
                          key={order._id}
                          className={`border-b hover:bg-orange-50 transition ${idx === recentOrders.length - 1 ? "border-b-0" : ""}`}
                        >
                          <td className="p-3 font-mono text-xs sm:text-sm">#{order._id.slice(-8)}</td>
                          <td className="p-3 text-sm">{order.userId?.name || "N/A"}</td>
                          <td className="p-3 font-bold text-red-500 text-sm">{formatCurrency(order.totalAmount || 0)}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                                order.status === "delivered"
                                  ? "bg-green-100 text-green-700"
                                  : order.status === "cancelled"
                                  ? "bg-red-100 text-red-700"
                                  : order.status === "on the way"
                                  ? "bg-blue-100 text-blue-700"
                                  : order.status === "preparing"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="p-3 text-xs sm:text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
