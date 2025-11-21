// pages/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  UtensilsCrossed, 
  ShoppingBag, 
  Users, 
  DollarSign,
  TrendingUp,
  Package,
  Clock,
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

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch foods count
      const foodsRes = await API.get("/foods");
      const foods = foodsRes.data;
      
      // Fetch orders
      const ordersRes = await API.get("/orders");
      const orders = ordersRes.data.data || ordersRes.data;
      
      // Calculate stats
      const totalRevenue = orders.reduce((sum, order) => 
        sum + (order.totalAmount || 0), 0
      );
      
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
      
      // Get 5 most recent orders
      setRecentOrders(orders.slice(0, 5));
      
    } catch (err) {
      console.error("Dashboard load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Food Items",
      value: stats.totalFoods,
      icon: UtensilsCrossed,
      color: "from-blue-500 to-blue-600",
      link: "/admin/foods"
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: "from-green-500 to-green-600",
      link: "/admin/orders"
    },
    {
      title: "Total Revenue",
      value: `Rs ${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "from-purple-500 to-purple-600",
      link: "/admin/orders"
    },
    {
      title: "Delivered Today",
      value: stats.deliveredToday,
      icon: CheckCircle,
      color: "from-green-500 to-emerald-600",
      link: "/admin/orders"
    }
  ];

  const quickStats = [
    {
      label: "Pending Orders",
      value: stats.pendingOrders,
      icon: Clock,
      color: "text-orange-500"
    },
    {
      label: "Preparing",
      value: stats.preparingOrders,
      icon: Package,
      color: "text-yellow-500"
    }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#FFF7F3] via-[#FFE9E3] to-[#FFD6C2]">
      <AdminSidebar />

      <div className="flex-1 p-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-[#E94E1B] mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-700 text-lg">
            Welcome back! Here's what's happening with your restaurant today.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#FF7A38] border-t-transparent"></div>
          </div>
        ) : (
          <>
            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Link
                    key={stat.title}
                    to={stat.link}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 overflow-hidden border-2 border-[#FF7A38]"
                  >
                    <div className={`bg-gradient-to-r ${stat.color} p-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-[#E94E1B]">{stat.value}</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {quickStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4 border-2 border-[#FF7A38]"
                  >
                    <div className="bg-gradient-to-br from-orange-100 to-red-100 p-4 rounded-full">
                      <Icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-gray-600">{stat.label}</p>
                      <p className="text-3xl font-bold text-[#E94E1B]">{stat.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-[#FF7A38]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#E94E1B]">Recent Orders</h2>
                <Link
                  to="/admin/orders"
                  className="text-[#FF7A38] hover:text-[#E94E1B] font-semibold flex items-center gap-2"
                >
                  View All
                  <TrendingUp className="w-5 h-5" />
                </Link>
              </div>

              {recentOrders.length === 0 ? (
                <p className="text-gray-600 text-center py-8">No orders yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white">
                      <tr>
                        <th className="p-3 text-left rounded-tl-lg">Order ID</th>
                        <th className="p-3 text-left">Customer</th>
                        <th className="p-3 text-left">Amount</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left rounded-tr-lg">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order, idx) => (
                        <tr
                          key={order._id}
                          className={`border-b hover:bg-orange-50 transition ${
                            idx === recentOrders.length - 1 ? "border-b-0" : ""
                          }`}
                        >
                          <td className="p-3 font-mono text-sm">
                            #{order._id.slice(-8)}
                          </td>
                          <td className="p-3">{order.userId?.name || "N/A"}</td>
                          <td className="p-3 font-bold text-[#FF7A38]">
                            Rs {(order.totalAmount || 0).toFixed(2)}
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
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
                          <td className="p-3 text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Link
                to="/admin/add-food"
                className="bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 text-center"
              >
                <UtensilsCrossed className="w-12 h-12 mx-auto mb-3" />
                <p className="font-bold text-lg">Add New Food Item</p>
              </Link>

              <Link
                to="/admin/orders"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 text-center"
              >
                <ShoppingBag className="w-12 h-12 mx-auto mb-3" />
                <p className="font-bold text-lg">Manage Orders</p>
              </Link>

              <Link
                to="/admin/foods"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 text-center"
              >
                <Package className="w-12 h-12 mx-auto mb-3" />
                <p className="font-bold text-lg">View All Foods</p>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}